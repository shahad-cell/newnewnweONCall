import { model, Schema, Document, Types } from "mongoose";
import autopopulate from "mongoose-autopopulate";

export interface IAppointment extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  type: string;
  status?: string;
  price?: number;
  date: Date;
  time: number;
  duration: number;
  AItranscript?: Types.ObjectId;
  notes?: string[];
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      autopopulate: { select: "name" },
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      autopopulate: { select: "speciality" },
    },
    type: { type: String, required: true }, // online, offline, emergency
    status: { type: String }, // upcoming, pending, done, cancelled
    price: { type: Number },
    date: { type: Date, required: true },
    time: { type: Number, required: true }, // could be hour or timestamp
    duration: { type: Number, required: true }, // in minutes: 15, 30, 60
    AItranscript: {
      type: Schema.Types.ObjectId,
      ref: "Transcript",
    }, // optional, future feature
    notes: { type: [String] },
  },
  { timestamps: true }
);

appointmentSchema.plugin(autopopulate);

const Appointment = model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;
