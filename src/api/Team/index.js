

import mongoose from 'mongoose';

const Task = mongoose.model('Task');
const TaskDetail = mongoose.model('TaskDetail');

export default function getReviewsForTeam() {
  return new Promise((resolve, reject) => {
    Task.find({}, (err, reviews) => {
      if (err) {
        console.error('Error finding reviews for team', err);
        reject();
      } else {
        resolve(reviews);
      }
    });
  });
}

export function getReviewDetailsForTeam() {
  return new Promise((resolve, reject) => {
    TaskDetail.find({}, (err, reviews) => {
      if (err) {
        console.error('Error finding review details for team', err);
        reject();
      } else {
        resolve(reviews);
      }
    });
  });
}
