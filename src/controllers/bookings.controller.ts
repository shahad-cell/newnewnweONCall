// import { Request, NextFunction, Response, Express } from "express";
// import Doctor from "../models/Doctors";
// import Pateint from "../models/Pateints";
// import Booking from "../models/Bookings";
// import HealthCareProvider from "../models/HealthCareProvider";
// import PhysioTherapist from "../models/Physio";
// import Labs from "../models/Labs";

// // CRUD for bookings
// // 1st. Read >> GET
// // get all bookings for both patients and healthcare providers
// const getAllBookings = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("pateint")
//       .populate("HealthCareProvider");
//     res.status(200).json(bookings);
//   } catch (error) {
//     next(error);
//   }
// };
// // get bookings by patient ID
// const getBookingsByPatientId = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
//     const patientBookings = await Booking.find({ pateint: pateintID }).populate(
//       "HealthCareProvider"
//     );
//     res.status(200).json(patientBookings);
//   } catch (error) {
//     next(error);
//   }
// };
// // get bookings by health care provider ID
// const getBookingsByHealthCareProviderId = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { healthCareProviderId } = (req as any).user._id; // assuming user is the logged in health care provider
//     const healthCareProviderBookings = await Booking.find({
//       serviceProvider: healthCareProviderId,
//     }).populate("pateint");
//     res.status(200).json(healthCareProviderBookings);
//   } catch (error) {
//     next(error);
//   }
// };
// // 2nd. Create >> POST
// // create a new booking with nurse
// const makeBookingWithNurse = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { date, time } = req.body;
//     const { serviceProviderID } = req.params; // user is the logged in health care provider
//     const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
//     const newBooking = await Booking.create({
//       pateint: pateintID,
//       serviceProvider: serviceProviderID,
//       status: "Pending", // default status
//       date,
//       time,
//     });
//     const pateint = await Pateint.findByIdAndUpdate(pateintID, {
//       $push: { bookings: newBooking._id },
//     });
//     const nurse = await Doctor.findByIdAndUpdate(serviceProviderID, {
//       $push: { bookings: newBooking._id },
//     });
//     res.status(201).json(newBooking);
//   } catch (error) {
//     next(error);
//   }
// };
// // create a new booking with physio therapist
// const makeBookingWithPhysio = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { date, time } = req.body;
//     const { serviceProviderID } = req.params; // user is the logged in health care provider
//     const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
//     const newBooking = await Booking.create({
//       pateint: pateintID,
//       serviceProvider: serviceProviderID,
//       status: "Pending", // default status
//       date,
//       time,
//     });
//     const pateint = await Pateint.findByIdAndUpdate(pateintID, {
//       $push: { bookings: newBooking._id },
//     });
//     const physioTherapist = await PhysioTherapist.findByIdAndUpdate(
//       serviceProviderID,
//       {
//         $push: { bookings: newBooking._id },
//       }
//     );
//     res.status(201).json(newBooking);
//   } catch (error) {
//     next(error);
//   }
// };
// // create a new booking with Labs
// const makeBookingWithLabs = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { date, time, typesOfTests } = req.body; // should I push type of tests to the booking model? or labs model?
//     const { serviceProviderID } = req.params; // user is the logged in health care provider
//     const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
//     const newBooking = await Booking.create({
//       pateint: pateintID,
//       serviceProvider: serviceProviderID,
//       status: "Pending", // default status
//       date,
//       time,
//     });
//     const pateint = await Pateint.findByIdAndUpdate(pateintID, {
//       $push: { bookings: newBooking._id },
//     });
//     const labs = await Labs.findByIdAndUpdate(serviceProviderID, {
//       $push: { bookings: newBooking._id, typesOfTests: typesOfTests }, // is this correct?
//     });
//     res.status(201).json(newBooking);
//   } catch (error) {
//     next(error);
//   }
// };
// // 3rd. Update >> PUT
// // update a booking date
// const updateBookingDate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { date } = req.body;
//     // const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
//     const { bookingId } = req.params; // user is the logged in
//     const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
//       date: date,
//     });
//     res.status(200).json(updatedBooking);
//   } catch (error) {
//     next(error);
//   }
// };
// // update a booking time
// const updateBookingTime = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { time } = req.body;
//     // const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
//     const { bookingId } = req.params; // user is the logged in
//     const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
//       time: time,
//     });
//     res.status(200).json(updatedBooking);
//   } catch (error) {
//     next(error);
//   }
// };
// // update a booking status
// const updateBookingStatus = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { status } = req.body;
//     // const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
//     const { bookingId } = req.params; // user is the logged in
//     const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
//       status: status,
//     });
//     res.status(200).json(updatedBooking);
//   } catch (error) {
//     next(error);
//   }
// };
// // 4th. Delete >> DELETE
// // delete a booking by ID, user is logged in
// const deleteBooking = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { bookingId } = req.params; // user is the logged in
//     const deletedBooking = await Booking.findByIdAndDelete(bookingId);
//     res.status(200).json(deletedBooking);
//   } catch (error) {
//     next(error);
//   }
// };

// export {
//   getAllBookings,
//   getBookingsByPatientId,
//   getBookingsByHealthCareProviderId,
//   makeBookingWithNurse,
//   makeBookingWithPhysio,
//   makeBookingWithLabs,
//   updateBookingDate,
//   updateBookingTime,
//   updateBookingStatus,
//   deleteBooking,
// };
import { Request, Response, NextFunction } from "express";
import cron from "node-cron";
import moment from "moment";
import Booking from "../models/Bookings";
import Patient from "../models/Patients";
import Doctor from "../models/Doctor";
import Physio from "../models/Physiotherapist";
import Labs from "../models/Lab";
import { sendNotification } from "../utils/sendNotification";

// ✅ Get all bookings
export const getAllBookings = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await Booking.find()
      .populate("patient")
      .populate("serviceProvider")
      .exec();

    res.status(200).json({ bookings });
  } catch (error) {
    next(error);
  }
};

// ✅ Get bookings by logged-in patient
export const getBookingsByPatientId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id: patientId } = (req as any).user;

    const bookings = await Booking.find({ patient: patientId })
      .populate("serviceProvider")
      .exec();

    res.status(200).json({ bookings });
  } catch (error) {
    next(error);
  }
};

// ✅ Get bookings by logged-in healthcare provider
export const getBookingsByHealthCareProviderId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id: providerId } = (req as any).user;

    const bookings = await Booking.find({ serviceProvider: providerId })
      .populate("patient")
      .exec();

    res.status(200).json({ bookings });
  } catch (error) {
    next(error);
  }
};

// ✅ Create booking (general — nurse, physio, labs)
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serviceProviderId } = req.params;
    const { date, time, type, location, notes, providerType } = req.body;
    const { _id: patientId } = (req as any).user;

    if (!providerType || !["doctor", "physio", "lab"].includes(providerType)) {
      return res.status(400).json({ message: "Invalid or missing providerType (doctor, physio, lab)" });
    }

    const newBooking = await Booking.create({
      patient: patientId,
      serviceProvider: serviceProviderId,
      status: "Pending",
      date,
      time,
      type,
      location,
      notes,
    });

    await Patient.findByIdAndUpdate(patientId, {
      $push: { bookings: newBooking._id },
    }).exec();

    if (providerType === "doctor") {
      await Doctor.findByIdAndUpdate(serviceProviderId, { $push: { bookings: newBooking._id } }).exec();
    } else if (providerType === "physio") {
      await Physio.findByIdAndUpdate(serviceProviderId, { $push: { bookings: newBooking._id } }).exec();
    } else if (providerType === "lab") {
      await Labs.findByIdAndUpdate(serviceProviderId, { $push: { bookings: newBooking._id } }).exec();
    }

    await sendNotification(patientId, "Your booking has been confirmed.", "booking confirmation");

    const reminderTime = moment(date).subtract(1, "hour").toDate();

    cron.schedule(
      `${reminderTime.getMinutes()} ${reminderTime.getHours()} ${reminderTime.getDate()} ${reminderTime.getMonth() + 1} *`,
      async () => {
        try {
          await sendNotification(patientId, "Reminder: Your booking is in 1 hour.", "reminder");
        } catch (err) {
          console.error("Reminder job failed", err);
        }
      }
    );

    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    next(error);
  }
};

// ✅ Update booking date
export const updateBookingDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId } = req.params;
    const { date } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { date },
      { new: true }
    ).exec();

    res.status(200).json({ updatedBooking });
  } catch (error) {
    next(error);
  }
};

// ✅ Update booking time
export const updateBookingTime = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId } = req.params;
    const { time } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { time },
      { new: true }
    ).exec();

    res.status(200).json({ updatedBooking });
  } catch (error) {
    next(error);
  }
};

// ✅ Update booking status
export const updateBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    ).exec();

    res.status(200).json({ updatedBooking });
  } catch (error) {
    next(error);
  }
};

// ✅ Delete booking
export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(bookingId).exec();

    res.status(200).json({ deletedBooking });
  } catch (error) {
    next(error);
  }
};
