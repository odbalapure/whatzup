const Announcement = require("../models/Announcement");

/**
 * @desc Get all announcements
 * @param {*} req
 * @param {*} res
 */
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json({ announcements });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while creating announcement..." });
  }
};

/**
 * @desc Get urgent annoucements
 * @param {*} req
 * @param {*} res
 */
const getUrgentAnnouncements = async (req, res) => {
  try {
    const urgentAnnoucements = await Announcement.find({ importance: "HIGH" });
    res.status(200).json({ announcements: urgentAnnoucements });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while creating announcement..." });
  }
};

/**
 * @desc Create an announcement
 * @param {*} req
 * @param {*} res
 */
const createAnnouncement = async (req, res) => {
  try {
    await Announcement.create({ ...req.body });

    res.status(203).json({ msg: "Annocument created successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while creating announcement..." });
  }
};

/**
 * @desc Delete an announcement
 * @param {*} req
 * @param {*} res
 */
const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json({ msg: "Annocument deleted!" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while creating announcement..." });
  }
};

/**
 * @desc Edit an annoucement
 * @param {*} req
 * @param {*} res
 */
const editAnnoucement = async (req, res) => {
  try {
    await Announcement.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(203).json({ msg: "Announcement edited!" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while creating announcement..." });
  }
};

module.exports = {
  getAllAnnouncements,
  getUrgentAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
  editAnnoucement,
};
