import axios from 'axios';

import { API_BASE_URL } from '../constants';

export default function getReviewForId(reviewId) {
  const getURL = `${API_BASE_URL}/reviews-v1/${reviewId}/details/?${process.env.CRUCIBLE_AUTH_TOKEN}`;

  return axios.get(getURL).then((result) => Promise.resolve(result.data));
}
