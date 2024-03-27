const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  id: { type: Number, required: true},
  Uemail: { type: String, required: true, unique: true },
  cName: { type: String, required: true },
  cEmail: { type: String, required: true },
  cMobile: { type: String, required: true },
  cMessage: { type: String, required: true }

}, { timestamps: true });


export default mongoose.models.message || mongoose.model("message", messageSchema);