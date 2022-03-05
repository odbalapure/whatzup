const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authentication");

const {
  createEvent,
  getAllEvents,
  createComment,
  getEventComments,
  deleteEvent,
  editEvent,
} = require("../controllers/events");

router.get("/", getAllEvents);
router.patch("/:id", createComment);
router.get("/:id", getEventComments);
router.post("/", authMiddleware, createEvent);
router.delete("/:id", deleteEvent);
router.patch("/edit/:id", editEvent);

module.exports = router;
