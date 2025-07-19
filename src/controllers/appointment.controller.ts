import { Request, NextFunction, Response, Express } from "express";
import Appointment from "../models/Appointment";
import Doctor from "../models/Doctor";
import Pateint from "../models/Patients";

// CRUD for appointments
// 1st. Read >> GET
// get all appointments for both patients and doctors
const getAllAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

// get appointments by patient ID
const getAppointmentsByPatientId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // first get patient ID from req.user, why? because the patient is logged in
    // const { patientId } = req.params;
    const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
    // then findOne by patientID
    const patientAppointments = await Appointment.find(pateintID).populate(
      "doctor"
    );
    res.status(200).json(patientAppointments);
  } catch (error) {
    next(error);
  }
};

// get appointments by doctor ID
const getAppointmentsByDoctorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // first get doctor ID from req.user, why? because the patient is logged in
    // const { doctortId } = req.params;
    const { doctortId } = (req as any).user._id; // assuming user is the logged in doctor
    // then find by doctortId
    const doctorAppointments = await Appointment.find(doctortId).populate(
      "patient"
    );
    res.status(200).json(doctorAppointments);
  } catch (error) {
    next(error);
  }
};

// 2nd. Create >> POST
// create a new appointment
const makeAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get appointment data from request body
    const { type, date, time, duration } = req.body;
    // type: online, offline, emergency
    // status: upcoming, pending, done, cancelled
    const { doctorID } = req.params; // user is the logged in health care provider
    const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
    // create a new appointment
    const newAppointment = await Appointment.create({
      type,
      date,
      status: "Pending", // default status, it will show under pending appointments for the doctor they will accept or reject in FE
      time,
      duration,
      pateint: pateintID,
      doctor: doctorID,
    });
    const pateint = await Pateint.findByIdAndUpdate(pateintID, {
      $push: { appointment: newAppointment._id },
    });
    const doctor = await Doctor.findByIdAndUpdate(doctorID, {
      $push: { appointment: newAppointment._id },
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

// 3rd. Update >> PUT
// update an appointment date
const updateDateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.body;
    const { appointmentId } = req.params; // user is the logged in
    // const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { date: date }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};
// update an appointment time
const updateTimeAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { time } = req.body;
    const { appointmentId } = req.params; // user is the logged in
    // const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { time: time }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};
// update an appointment status
const updateStatusAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    const { appointmentId } = req.params; // user is the logged in
    // const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: status }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};
// update an appointment type: // online, offline
const updateTypeAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.body;
    const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { type: type }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};
// update an appointment price, based on the type of appointment: online: 25KD, Offline 35KD or whatever we decide
const updatePriceAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { price } = req.body;
    const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { price: price }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};
const updateDurationAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { duratoin } = req.body;
    const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { duratoin: duratoin }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};
// 4th. Delete >> DELETE
// delete an appointment
const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );
    res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
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
};
