import { Router } from 'express';

import updateReviewStatusForReviewer, { getTaskDetailStatusForReviewer } from './TaskDetails';

const router = Router();

router.get('/', (req, res) => {
  const { permaId } = req.query;
  getTaskDetailStatusForReviewer(permaId)
    .then((reviewDetails) => res.json(reviewDetails))
    .catch((err) => {
      if (err === undefined) {
        res.json({ error: 'Unknown error' });
      }
      res.json(err);
    });
});

router.put('/', (req, res) => {
  const { permaId, reviewerUserName, statusToUpdateTo } = req.query;
  updateReviewStatusForReviewer(permaId, reviewerUserName, statusToUpdateTo)
    .then((reviewDetails) => res.json(reviewDetails))
    .catch((err) => {
      if (err === undefined) {
        res.json({ error: 'Unknown error' });
      }
      res.json(err);
    });
});

export default router;
