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
router.get(
  "/patient",
  authenticate,
  authorizeRole(["patient"]),
  getAppointmentsByPatientId
);

// 📌 Get appointments for logged-in doctor
router.get(
  "/doctor",
  authenticate,
  authorizeRole(["doctor"]),
  getAppointmentsByDoctorId
);

// 📌 Create a new appointment (by patient, for doctor)
router.post(
  "/create/:doctorID",
  authenticate,
  authorizeRole(["patient"]),
  makeAppointment
);

// 📌 Update appointment time
router.put(
  "/:appointmentID/time",
  authenticate,
  authorizeRole(["patient"]),
  updateTimeAppointment
);

// 📌 Update appointment date
router.put(
  "/:appointmentID/date",
  authenticate,
  authorizeRole(["patient"]),
  updateDateAppointment
);

// 📌 Update appointment status
router.put(
  "/:appointmentID/status",
  authenticate,
  updateStatusAppointment
);

// 📌 Update appointment type
router.put(
  "/:appointmentID/type",
  authenticate,
  authorizeRole(["patient"]),
  updateTypeAppointment
);

// 📌 Update appointment price
router.put(
  "/:appointmentID/price",
  authenticate,
  authorizeRole(["doctor"]),
  updatePriceAppointment
);

// 📌 Update appointment duration
router.put(
  "/:appointmentID/duration",
  authenticate,
  authorizeRole(["doctor"]),
  updateDurationAppointment
);

// 📌 Delete appointment
router.delete(
  "/:appointmentID",
  authenticate,
  authorizeRole(["patient"]),
  deleteAppointment
);

export default router;
