import axios from 'axios';
import moment from 'moment';

import { API_BASE_URL } from '../constants';

export default function getReviewsForTeam(team) {
  const reviewsForTeam = team.map((member) => getReviewForUser(member));

  return Promise.all(reviewsForTeam)
    .then((reviewsForAuthorsList) => Promise.resolve([].concat(...reviewsForAuthorsList)))
    .then((reviews) => reviews.filter(isReviewsWithinPast30Days));
}

function getReviewForUser(userId) {
  const statesFilter = 'states=Review';
  const authorFilter = `author=${userId}`;
  const filters = `${statesFilter}&${authorFilter}`;

  const getURL = `${API_BASE_URL}/reviews-v1/filter?${filters}&${process.env.CRUCIBLE_AUTH_TOKEN}`;

  return axios.get(getURL).then((result) => Promise.resolve(result.data.reviewData));
}

function isReviewsWithinPast30Days(review) {
  const durationOpen = moment.duration(moment().diff(moment(review.createDate)));
  return durationOpen.asDays() < 30;
}
