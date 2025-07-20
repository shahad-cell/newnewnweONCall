import express from "express";
import { authenticate, authorizeRole } from "../middlewares/auth";
import {
  getAllAppointments,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  makeAppointment,
  updateDateAppointment,
  updateTimeAppointment,
  updateStatusAppointment,
  updateTypeAppointment,
  updatePriceAppointment,
  updateDurationAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller";

const router = express.Router();

// 📌 Get all appointments (admin use or debug)
router.get("/", getAllAppointments);

// 📌 Get appointments for logged-in patient
router.get("/patient", authenticate, getAppointmentsByPatientId);
// authorizeRole(["patient"])

// 📌 Get appointments for logged-in doctor
router.get("/doctor", authenticate, getAppointmentsByDoctorId);
//   authorizeRole(["doctor"]),

// 📌 Create a new appointment (by patient, for doctor)
router.post("/create/:doctorID", authenticate, makeAppointment);
//authorizeRole(["patient"]),

// 📌 Update appointment time
router.put("/:appointmentID/time", authenticate, updateTimeAppointment);
//  authorizeRole(["patient"]),

// 📌 Update appointment date
router.put("/:appointmentID/date", authenticate, updateDateAppointment);
//   authorizeRole(["patient"]),

// 📌 Update appointment status
router.put("/:appointmentID/status", authenticate, updateStatusAppointment);

// 📌 Update appointment type
router.put("/:appointmentID/type", authenticate, updateTypeAppointment);
//  authorizeRole(["patient"]),

// 📌 Update appointment price
router.put("/:appointmentID/price", authenticate, updatePriceAppointment);
//   authorizeRole(["doctor"]),

// 📌 Update appointment duration
router.put("/:appointmentID/duration", authenticate, updateDurationAppointment);
//   authorizeRole(["doctor"]),

// 📌 Delete appointment
router.delete("/:appointmentID", authenticate, deleteAppointment);
//   authorizeRole(["patient"]),

export default router;
