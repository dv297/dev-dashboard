import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import NotOnReviewIcon from 'material-ui-icons/Menu';
import ReadyToReviewIcon from 'material-ui-icons/Markunread';
import InProgressIcon from 'material-ui-icons/Comment';
import WaitingForAuthorIcon from 'material-ui-icons/Timer';
import CompletedIcon from 'material-ui-icons/ThumbUp';
import grey from 'material-ui/colors/grey';
import blue from 'material-ui/colors/blue';
import yellow from 'material-ui/colors/yellow';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

const REVIEW_STATUSES = {
  NOT_ON_REVIEW: 'NOT_ON_REVIEW',
  READY_TO_REVIEW: 'READY_TO_REVIEW',
  IN_PROGRESS: 'IN_PROGRESS',
  WAITING_FOR_AUTHOR: 'WAITING_FOR_AUTHOR',
  COMPLETE: 'COMPLETE',
};

const notOnReviewIndicator = (
  <Avatar style={{ backgroundColor: grey[500] }} title="Not On Review">
    <NotOnReviewIcon />
  </Avatar>
);

const readyToReviewIndicator = (
  <Avatar style={{ backgroundColor: red[500] }} title="Ready To Review">
    <ReadyToReviewIcon />
  </Avatar>
);

const inProgressIndicator = (
  <Avatar style={{ backgroundColor: blue[500] }} title="In Progress">
    <InProgressIcon />
  </Avatar>
);

const waitingForAuthorIndicator = (
  <Avatar style={{ backgroundColor: yellow[800] }} title="Waiting For Author">
    <WaitingForAuthorIcon />
  </Avatar>
);

const completedIndicator = (
  <Avatar style={{ backgroundColor: green[500] }} title="Completed">
    <CompletedIcon />
  </Avatar>
);

const addOnClick = (element, onClick) => {
  return React.cloneElement(element, { onClick });
};

const ReviewProgressIcon = ({ status, onClick }) => {
  const { NOT_ON_REVIEW, READY_TO_REVIEW, IN_PROGRESS, WAITING_FOR_AUTHOR, COMPLETE } = REVIEW_STATUSES;

  const bindClickListener = (element) => addOnClick(element, onClick);

  switch (status) {
    case NOT_ON_REVIEW:
      return bindClickListener(notOnReviewIndicator);
    case READY_TO_REVIEW:
      return bindClickListener(readyToReviewIndicator);
    case IN_PROGRESS:
      return bindClickListener(inProgressIndicator);
    case WAITING_FOR_AUTHOR:
      return bindClickListener(waitingForAuthorIndicator);
    case COMPLETE:
      return bindClickListener(completedIndicator);
    default:
      return bindClickListener(notOnReviewIndicator);
  }
};

ReviewProgressIcon.propTypes = {
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ReviewProgressIcon.defaultProps = {
  onClick: () => {},
};

export default ReviewProgressIcon;
export { REVIEW_STATUSES };
