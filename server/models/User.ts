import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: { type: Number, required: true, unique: true },
  avatar: {
    type: String,
    required: true,
  },
});

export default mongoose.model('user', UserSchema);
