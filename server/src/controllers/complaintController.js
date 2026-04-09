import { validationResult } from "express-validator";
import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const attachments = (req.files || []).map((f) => `/api/uploads/${f.filename}`);

    const complaint = await Complaint.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority || "Medium",
      studentId: req.user._id,
      attachments,
    });

    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "-createdAt" } = req.query;
    const query = { studentId: req.user._id };

    const complaints = await Complaint.find(query)
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

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "studentId",
      "name email"
    );
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (
      req.user.role === "student" &&
      complaint.studentId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.status === "Resolved" || complaint.status === "Rejected") {
      return res
        .status(400)
        .json({ message: "Resolved/Rejected complaints cannot be edited" });
    }

    if (complaint.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const attachments = complaint.attachments || [];
    if (req.files && req.files.length > 0) {
      attachments.push(...req.files.map((f) => `/api/uploads/${f.filename}`));
    }

    complaint.title = req.body.title || complaint.title;
    complaint.description = req.body.description || complaint.description;
    complaint.category = req.body.category || complaint.category;
    complaint.priority = req.body.priority || complaint.priority;
    complaint.attachments = attachments;

    const updated = await complaint.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (complaint.status === "Resolved") {
      return res
        .status(400)
        .json({ message: "Resolved complaints cannot be deleted" });
    }

    await complaint.deleteOne();
    res.json({ message: "Complaint deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

