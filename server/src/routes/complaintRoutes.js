import express from "express";
import multer from "multer";
import { body } from "express-validator";
import path from "path";
import { fileURLToPath } from "url";
import {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} from "../controllers/complaintController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "..", "uploads");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

router.use(protect, authorizeRoles("student"));

router.post(
  "/",
  upload.array("attachments", 3),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category")
      .isIn(["Hostel", "Academics", "Infrastructure", "Library", "Others"])
      .withMessage("Valid category is required"),
  ],
  createComplaint
);

router.get("/", getMyComplaints);
router.get("/:id", getComplaintById);
router.put("/:id", upload.array("attachments", 3), updateComplaint);
router.delete("/:id", deleteComplaint);

export default router;

