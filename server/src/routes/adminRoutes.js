import express from "express";
import { body } from "express-validator";
import {
  getAllComplaints,
  getComplaintAdminById,
  updateComplaintStatus,
  addComment,
  deleteComplaintAdmin,
  getStudents,
  getDashboardStats,
} from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorizeRoles("admin"));

router.get("/complaints", getAllComplaints);
router.get("/complaints/stats", getDashboardStats);
router.get("/complaints/:id", getComplaintAdminById);
router.put(
  "/complaints/:id/status",
  [
    body("status")
      .isIn(["Pending", "In Progress", "Resolved", "Rejected"])
      .withMessage("Invalid status"),
  ],
  updateComplaintStatus
);

router.post(
  "/complaints/:id/comments",
  [body("message").notEmpty().withMessage("Message is required")],
  addComment
);

router.delete("/complaints/:id", deleteComplaintAdmin);

router.get("/students", getStudents);

export default router;

