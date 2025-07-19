import { Schema, model, Types, Document, models } from "mongoose";
import autopopulate from "mongoose-autopopulate";

export interface IPhysiotherapist extends Document {
  provider: Types.ObjectId;

  // HealthCareProvider fields
  name: string;
  email: string;
  civilID: string;
  phoneNum: string;
  YOEX: number;
  licenseNum: string;
  specialization: string;
  image?: string;
  bio?: string;
  gender?: string;
  age?: number;

  // Physiotherapist-specific
  bookings: Types.ObjectId[];
  companyName: string;
}

const physiotherapistSchema = new Schema<IPhysiotherapist>(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: "HealthCareProvider",
      required: true,
      autopopulate: true,
    },

    // HealthCareProvider fields
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    civilID: { type: String, required: true, trim: true },
    phoneNum: { type: String, required: true, trim: true },
    YOEX: { type: Number, required: true },
    licenseNum: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    image: { type: String },
    bio: { type: String },
    gender: { type: String },
    age: { type: Number },

    // Physiotherapist-specific
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

physiotherapistSchema.plugin(autopopulate);

export default models.Physiotherapist ||
  model<IPhysiotherapist>("Physiotherapist", physiotherapistSchema);
