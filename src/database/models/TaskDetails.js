import mongoose from 'mongoose';

import { UserSchema } from './User';
import { CommentSchema } from './Comment';

const { Schema } = mongoose;

const TaskDetailSchema = new Schema({
  author: UserSchema,
  createDate: String,
  creator: UserSchema,
  description: String,
  generalComments: {
    comments: [CommentSchema],
  },
  jiraIssueKey: String,
  name: String,
  permaId: {
    id: String,
  },
  reviewers: {
    reviewer: [
      {
        userName: String,
        displayName: String,
        avatarUrl: String,
        completed: Boolean,
        timeSpent: Number,
      },
    ],
  },
  stats: [
    new Schema({
      defects: Number,
      drafts: Number,
      leaveUnread: Number,
      published: Number,
      read: Number,
      unread: Number,
      user: String,
    }),
  ],
  dashboardInfo: {
    reviewers: [
      new Schema({
        userName: String,
        displayName: String,
        avatarUrl: String,
        status: String,
      }),
    ],
  },
});

const model = mongoose.model('TaskDetail', TaskDetailSchema);

export default model;
export { TaskDetailSchema };
