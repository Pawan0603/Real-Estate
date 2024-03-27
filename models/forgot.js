const mongoose = require('mongoose');

const forgotSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true },

}, { timestamps: true });

//mongoose.models = {};
export default mongoose.models.user || mongoose.model("forgot", userSchema);
//export default mongoose.model("user", userSchema);