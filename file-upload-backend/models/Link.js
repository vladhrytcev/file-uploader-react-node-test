import { Schema, model } from "mongoose";

const linkSchema = new Schema({
  language: { type: String, default: "EN" },
  link: { type: String },
  fileTree: { type: Object },
  originalDir: { type: Object },
  address: { type: String },
  visited: { type: Array }
});

export const Link = model("Link", linkSchema);
