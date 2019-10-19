import mongoose from 'mongoose';

import { POSSIBLE_STATES } from '../../constants';

const TaskDetails = mongoose.model('TaskDetail');

export default function updateTaskDetailStatusForReviewer(reviewId, reviewerToUpdate, statusToUpdateTo) {
  if (!POSSIBLE_STATES.includes(statusToUpdateTo)) {
    return Promise.reject({
      error: 'Invalid status was provided',
    });
  }

  const userNameRegex = new RegExp(reviewerToUpdate, 'i');
  return new Promise((resolve, reject) => {
    TaskDetails.update(
      {
        'permaId.id': reviewId,
        'dashboardInfo.reviewers': { $elemMatch: { userName: { $in: [userNameRegex] } } },
      },
      { $set: { 'dashboardInfo.reviewers.$.status': statusToUpdateTo } },
      (updateErr, reviewDetails) => {
        if (updateErr) {
          console.error(`Error update reviews details for review ID: ${reviewId}`, updateErr);
          reject();
        } else {
          resolve(reviewDetails);
        }
      },
    );
  });
}

export function getTaskDetailStatusForReviewer(reviewId) {
  return new Promise((resolve, reject) => {
    TaskDetails.find(
      {
        'permaId.id': reviewId,
      },
      {
        dashboardInfo: true,
      },
      (updateErr, reviewDetails) => {
        if (updateErr) {
          console.error(`Error update reviews details for review ID: ${reviewId}`, updateErr);
          reject();
        } else {
          resolve(reviewDetails);
        }
      },
    );
  });
}
