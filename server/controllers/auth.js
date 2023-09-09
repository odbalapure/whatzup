const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const jwtDecode = require("jwt-decode");
const bcrypt = require("bcryptjs");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SEND_GRID_TOKEN,
    },
  })
);

/**
 * @desc Register a user
 * @param {*} req
 * @param {*} res
 */
const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    console.log('asdasdasdasdasd', existingUser);
    if (existingUser) {
      return res.status(403).json({ error: "Account already exists, please login!" });
    }

    const user = await User.create({ ...req.body });
    const token = user.createJwt();

    // transporter.sendMail({
    //   to: user.email,
    //   from: "ombalapure@outlook.com",
    //   subject: "Whatzup - Email Confirmation",
    //   html: `<h4>Hi ${user.name}! Please click the below link for email confirmation.</h4>
    //   <p>Confirm email for <a href="https://whatzzzup.herokuapp.com/api/v1/auth/confirm/${token}">${user.email}</a></p>
    // `,
    // });

    console.log('user', user);
    res
      .status(StatusCodes.CREATED)
      .json({ name: user.name, email: user.email, activated: false, token });
  } catch (err) {
    console.log('err', err);
    return res
      .status(500)
      .json({ error: "Something went wrong while registration..." });
  }
};

/**
 * @desc Confirm email id
 * @param {*} req
 * @param {*} res
 */
const confirm = async (req, res) => {
  const decodedObj = jwtDecode(req.params.token);
  await User.findOneAndUpdate(
    { email: decodedObj.email },
    { $set: { activated: true } },
    { upsert: true }
  );

  res.send(`<h3><u>Whatzup</u></h3>
      <p style="color: green;"><b>Hi there, your account has been activated!</b></p>
    `);
};

/**
 * @desc Login a user
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User must provide email and password
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: "Account does not exists, please create one!" });
    }

    // Check if user is activated
    // if (!user.activated) {
    //   return res.status(403).json({ error: "Account has not been activated!" });
    // }

    // Compare passwords
    const isPassCorrect = await user.comparePassword(password);
    if (!isPassCorrect) {
      return res.status(400).json({ error: "Opps, you entered an incorrect password!", status: 400 });
    }

    const token = user.createJwt();
    res.status(StatusCodes.OK).json({
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    return res.status(StatusCodes.OK).json({
      error: "Something went wrong with the server whie logging you in...",
    });
  }
};

/**
 * @desc Update password
 * @param {*} req
 * @param {*} res
 */
const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ error: "User does not exist!" });
  }

  // transporter.sendMail({
  //   to: user.email,
  //   from: "ombalapure@outlook.com",
  //   subject: "Whatzup - Password Reset",
  //   html: `<h4>Hi ${user.name}! Please click the below link to reset your password.</h4>
  //     <p>Confirm email for <a href="https://whatzzzup.herokuapp.com/reset-password/${user.email}">${user.email}</a></p>
  //   `,
  // });

  res.status(200).json({ msg: `Password reset link sent to ${user.email}!` });
};

/**
 * @desc Reset password
 * @param {*} req
 * @param {*} res
 */
const resetPassword = async (req, res) => {
  // User credentials:  { email: 'ombalapure7@gmail.com', password: 'secret2' }

  const user = await User.findOne({ email: req.body.email });
  if (!user || !user.activated) {
    return res.status(404).json({ error: "User does not exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  await User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { password: password } },
    { upsert: true }
  );

  res.status(200).json({ error: "Password reset successful" });
};

module.exports = {
  register,
  login,
  confirm,
  forgotPassword,
  resetPassword,
};
