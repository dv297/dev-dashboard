import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
  createDate: String,
  defectApproved: Boolean,
  defectRaised: Boolean,
  deleted: Boolean,
  message: String,
  messageAsHtml: String,
});

const model = mongoose.model('Comment', CommentSchema);

export default model;
export { CommentSchema };
