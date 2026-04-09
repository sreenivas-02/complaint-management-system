import Complaint from "../models/Complaint.js";
import User from "../models/User.js";
import { validationResult } from "express-validator";

export const getAllComplaints = async (req, res) => {
  try {
    const {
      status,
      search,
      category,
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = req.query;

    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;

    if (search) {
      const students = await User.find({
        name: { $regex: search, $options: "i" },
      }).select("_id");
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { studentId: { $in: students.map((s) => s._id) } },
      ];
    }

    const complaints = await Complaint.find(query)
      .populate("studentId", "name email")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    const total = await Complaint.countDocuments(query);

    res.json({
      data: complaints,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getComplaintAdminById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "studentId",
      "name email"
    );
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateComplaintStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { status, assignedTo } = req.body;
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status || complaint.status;
    if (assignedTo) complaint.assignedTo = assignedTo;

    const updated = await complaint.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const comment = {
      complaintId: complaint._id,
      userId: req.user._id,
      message: req.body.message,
    };

    complaint.comments.push(comment);
    const updated = await complaint.save();
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComplaintAdmin = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    await complaint.deleteOne();
    res.json({ message: "Complaint deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select(
      "-password"
    );
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inProgress = await Complaint.countDocuments({
      status: "In Progress",
    });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });
    const rejected = await Complaint.countDocuments({ status: "Rejected" });

    const byCategory = await Complaint.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json({
      totals: {
        totalComplaints,
        pending,
        inProgress,
        resolved,
        rejected,
      },
      byCategory,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

