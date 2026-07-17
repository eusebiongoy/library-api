const express = require("express");
const router = express.Router();

const membersController = require("../controllers/membersController");

// GET all members
router.get("/", membersController.getAllMembers);

// GET one member
router.get("/:id", membersController.getMemberById);

// CREATE member
router.post("/", membersController.createMember);

// UPDATE member
router.put("/:id", membersController.updateMember);

// DELETE member
router.delete("/:id", membersController.deleteMember);

module.exports = router;