import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Hostel", "Academics", "Infrastructure", "Library", "Others"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: { type: String },
    attachments: [{ type: String }],
    comments: [commentSchema],
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;

