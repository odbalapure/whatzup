const Event = require("../models/Event");

/**
 * @desc Get all events
 * @param {*} req
 * @param {*} res
 */
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(201).json({ events });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while creating announcement..." });
  }
};

/**
 * @desc Get comments of an event
 * @param {*} req
 * @param {*} res
 */
const getEventComments = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });
    res.status(201).json({ comments: event.comments });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while creating announcement..." });
  }
};

/**
 * @desc Create an event
 * @param {*} req
 * @param {*} res
 */
const createEvent = async (req, res) => {
  try {
    await Event.create(req.body);
    res.status(201).json({ msg: "Event created successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while creating announcement..." });
  }
};

/**
 * @desc Create a comment
 * @param {*} req
 * @param {*} res
 */
const createComment = async (req, res) => {
  try {
    await Event.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { comments: req.body } },
      { safe: true, upsert: true, new: true },
      function (err) {
        if (err) {
          console.log("Error while adding item to the cart: ", err);
        } else {
          console.log("Comment section updated!");
        }
      }
    );

    res.status(201).json({ msg: "Comment added successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while creating announcement..." });
  }
};

/**
 * @desc Delete an event
 * @param {*} req
 * @param {*} res
 */
const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json({ msg: "Event deleted!" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while creating announcement..." });
  }
};

/**
 * @desc Edit an event
 * @param {*} req
 * @param {*} res
 */
const editEvent = async (req, res) => {
  try {
    await Event.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(203).json({ msg: "Event edited!" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while creating announcement..." });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  createComment,
  getEventComments,
  deleteEvent,
  editEvent,
};
