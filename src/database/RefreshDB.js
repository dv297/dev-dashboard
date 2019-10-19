import getReviewsFromTeam from './GetReviewsForTeam';
import getReviewDetailsForId from './GetReviewDetailsForId';
import { USERS_TO_PULL_REVIEWS_FROM, REVIEWERS_FOR_TEAM } from '../constants';
import TaskModel from './models/Task';
import TaskDetails from './models/TaskDetails';

const removeOutdatedReviewsFromDatabase = (reviews) => {
  const permaIds = reviews.map((review) => review.permaId.id);
  const query = { 'permaId.id': { $nin: permaIds } };
  TaskModel.remove(query, (err) => {
    if (err) {
      console.warn(err);
    }
  });

  TaskDetails.remove(query, (err) => {
    if (err) {
      console.warn(err);
    }
  });
};

const insertReviewsIntoDatabase = (reviews) =>
  reviews.forEach((review) => {
    const query = { 'permaId.id': review.permaId.id };
    const optionsForUpdate = { upsert: true, new: true };
    const callback = (err) => {
      if (err) {
        console.warn(err);
      }
    };

    return TaskModel.findOneAndUpdate(query, review, optionsForUpdate, callback);
  });

const insertSingleReviewDetailIntoDatabase = (review) =>
  getReviewDetailsForId(review.permaId.id).then((reviewDetails) => {
    const query = { 'permaId.id': review.permaId.id };
    const optionsForUpdate = { upsert: true, new: true };

    return new Promise((resolve, reject) => {
      TaskDetails.findOneAndUpdate(query, reviewDetails, optionsForUpdate, (error, document) => {
        if (error) {
          console.warn(error);
          reject(error);
        }

        resolve(document);
      });
    });
  });

const insertReviewDetailsIntoDatabase = (reviews) => {
  const reviewDetails = reviews.map(insertSingleReviewDetailIntoDatabase);
  return Promise.all(reviewDetails);
};

const insertDashboardInfo = (reviews) => {
  reviews.forEach((review) => {
    TaskDetails.findById(review._id, (error, taskDetails) => {
      if (error) {
        console.eror('Error finding task details', error);
      } else if (
        !taskDetails.dashboardInfo ||
        !taskDetails.dashboardInfo.reviewers ||
        taskDetails.dashboardInfo.reviewers.length === 0
      ) {
        const reviewersWithStatus = REVIEWERS_FOR_TEAM.map((reviewer) => {
          const updatedReviewer = { ...reviewer };

          if (!updatedReviewer.status) {
            updatedReviewer.status = 'NOT_ON_REVIEW';
          }

          return updatedReviewer;
        });

        // eslint-disable-next-line no-param-reassign
        taskDetails.dashboardInfo = {
          reviewers: reviewersWithStatus,
        };

        taskDetails.save((saveError) => {
          if (saveError) {
            console.error('Error saving task detail', saveError);
          }
        });
      }
    });
  });
};

export default () => {
  getReviewsFromTeam(USERS_TO_PULL_REVIEWS_FROM)
    .then((reviews) => {
      insertReviewsIntoDatabase(reviews);
      removeOutdatedReviewsFromDatabase(reviews);
      return reviews;
    })
    .then(insertReviewDetailsIntoDatabase)
    .then(insertDashboardInfo)
    .then(() => console.log('Finished database management'))
    .catch((err) => {
      console.log('Could not refresh database: ', err);
    });
};
