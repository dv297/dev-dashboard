import mongoose from 'mongoose';

const TaskDetails = mongoose.model('TaskDetail');

export default function getReviewForId(reviewId) {
  return new Promise((resolve, reject) => {
    TaskDetails.findOne({ 'permaId.id': reviewId }, (err, reviewDetails) => {
      if (err) {
        console.error(`Error finding reviews details for review ID: ${reviewId}`, err);
        reject();
      } else {
        resolve(reviewDetails);
      }
    });
  });
}

export function getAllReviewDetails() {
  return new Promise((resolve, reject) => {
    TaskDetails.find({}, (err, reviewDetails) => {
      if (err) {
        console.error('Error finding reviews details', err);
        reject();
      } else {
        resolve(reviewDetails);
      }
    });
  });
}
