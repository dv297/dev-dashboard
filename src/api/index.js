import { Router } from 'express';

import reviewDetails from './reviewForId';
import reviewerStatus from './updateReviewStatusForReviewer';
import repositories from './repositories';

const router = Router();

router.use('/reviewDetails', reviewDetails);
router.use('/reviewerStatus', reviewerStatus);
router.use('/repositories', repositories);

export default router;
