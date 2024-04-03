const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    hash: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    birthdate: { type: Date, default: "" },
    gender: {
      type: String,
      enum: ["male", "female", "prefer not to say", ""],
      default: "",
    },
    account_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    role: { type: String, required: true, default: "user" },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", UsersSchema);
