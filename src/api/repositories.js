import { Router } from 'express';

import getRepositories from '../scripts/getRepositories';

const router = Router();

router.get('/', (req, res) => {
  getRepositories()
    .then((repositories) => res.json(repositories))
    .catch((err) => {
      if (err === undefined) {
        res.json({ error: 'Unknown error' });
      }
      res.json(err);
    });
});

export default router;
