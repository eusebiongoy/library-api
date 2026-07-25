const express = require("express");
const router = express.Router();

const membersController = require("../controllers/membersController");
const isAuthenticated = require("../middleware/authMiddleware");


// GET all members (public)
router.get("/", membersController.getAllMembers);


// GET one member (public)
router.get("/:id", membersController.getMemberById);


// CREATE member (protected)
router.post("/", isAuthenticated, membersController.createMember);


// UPDATE member (protected)
router.put("/:id", isAuthenticated, membersController.updateMember);


// DELETE member (protected)
router.delete("/:id", isAuthenticated, membersController.deleteMember);


module.exports = router;