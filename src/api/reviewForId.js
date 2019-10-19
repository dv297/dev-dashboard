import { Router } from 'express';

import getReviewForId, { getAllReviewDetails } from './Review';
import { getErrorProjection } from '../util';

const router = Router();

router.get('/', (req, res) => {
  getAllReviewDetails()
    .then((reviewDetails) => res.json(reviewDetails))
    .catch((err) => {
      if (err === undefined) {
        res.json({ error: 'Unknown error' });
      }
      res.json(getErrorProjection(err));
    });
});

router.get('/:id', (req, res) => {
  getReviewForId(req.params.id)
    .then((reviewDetails) => res.json(reviewDetails))
    .catch((err) => {
      if (err === undefined) {
        res.json({ error: 'Unknown error' });
      }
      res.json(getErrorProjection(err));
    });
});

export default router;
