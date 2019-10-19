import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  avatarUrl: String,
  displayName: String,
  url: String,
  userName: String,
});

const model = mongoose.model('User', UserSchema);

export default model;
export { UserSchema };
