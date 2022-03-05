const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authentication");

const {
  createAnnouncement,
  getUrgentAnnouncements,
  getAllAnnouncements,
  deleteAnnouncement,
  editAnnoucement
} = require("../controllers/announcements");

router.get("/", getAllAnnouncements);
router.get("/urgent", getUrgentAnnouncements);
router.post("/", authMiddleware, createAnnouncement);
router.delete("/:id", deleteAnnouncement);
router.patch("/edit/:id", editAnnoucement);

module.exports = router;
