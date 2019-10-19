import mongoose from 'mongoose';

const { Schema } = mongoose;

const TaskSchema = new Schema({
  createDate: String,
  creator: {
    avatarUrl: String,
    displayName: String,
    url: String,
    userName: String,
  },
  description: String,
  jiraIssueKey: String,
  name: String,
  permaId: {
    id: String,
  },
});

const model = mongoose.model('Task', TaskSchema);

export default model;
export { TaskSchema };
