const Member = require("../models/Member");

// GET all members
const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find();

        res.status(200).json(members);

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving members",
            error: error.message
        });
    }
};


// GET one member by ID
const getMemberById = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.status(200).json(member);

    } catch (error) {
        res.status(400).json({
            message: "Invalid member ID",
            error: error.message
        });
    }
};


// CREATE member
const createMember = async (req, res) => {
    try {

        const newMember = new Member({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            membershipDate: req.body.membershipDate
        });

        const savedMember = await newMember.save();

        res.status(201).json(savedMember);

    } catch (error) {
        res.status(400).json({
            message: "Error creating member",
            error: error.message
        });
    }
};


// UPDATE member
const updateMember = async (req, res) => {
    try {

        const updatedMember = await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedMember) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.status(200).json(updatedMember);

    } catch (error) {
        res.status(400).json({
            message: "Error updating member",
            error: error.message
        });
    }
};


// DELETE member
const deleteMember = async (req, res) => {
    try {

        const deletedMember = await Member.findByIdAndDelete(req.params.id);

        if (!deletedMember) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.status(200).json({
            message: "Member deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Error deleting member",
            error: error.message
        });
    }
};

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
};