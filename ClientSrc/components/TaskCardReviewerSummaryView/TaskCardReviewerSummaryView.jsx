import React from 'react';
import classNames from 'classnames/bind';

import { getDisplayNameForStatus } from '../../constants/PossibleStates';
import styles from './TaskCardReviewerSummaryView.scss';
import TaskPropType from '../../PropTypes/TaskPropType';

const cx = classNames.bind(styles);

const TaskCardReviewerSummaryView = ({ task }) => {
  const participatingReviewers = task.dashboardInfo.reviewers.filter((reviewer) => reviewer.status !== 'NOT_ON_REVIEW');

  const reviewIndicator = participatingReviewers.map((reviewer) => (
    <div
      key={reviewer._id}
      className={cx('circle', reviewer.status)}
      title={`${reviewer.displayName} - ${getDisplayNameForStatus(reviewer.status)}`}
    />
  ));

  return <span>{reviewIndicator}</span>;
};

TaskCardReviewerSummaryView.propTypes = {
  task: TaskPropType.isRequired,
};

export default TaskCardReviewerSummaryView;
