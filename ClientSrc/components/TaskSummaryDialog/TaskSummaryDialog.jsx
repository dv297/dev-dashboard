import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { ReviewerSummaryComponent } from '../';
import TaskPropType from '../../PropTypes/TaskPropType';
import styles from './style.scss';
import { CRUCIBLE_BASE_URL } from '../../../src/constants';

const cx = classNames.bind(styles);

const dividerStyle = {
  marginTop: '10px',
  marginBottom: '10px',
};

const TaskSummaryDialog = ({ selectedTaskIndex, reviewsForTeam }) => {
  if (selectedTaskIndex === undefined) {
    return <Paper className="no-active-task-container" />;
  }

  const selectedTask = reviewsForTeam[selectedTaskIndex];
  const { name, creator, dashboardInfo } = selectedTask;

  if (!dashboardInfo) {
    return null;
  }

  const getReviewURL = (task) => `${CRUCIBLE_BASE_URL}/viewer/cru/${task.permaId.id}`;

  return (
    <div className={cx('task-summary-dialog')}>
      <Typography type="title" gutterBottom>
        <a href={getReviewURL(selectedTask)}>
          {name}
        </a>
      </Typography>
      <Typography type="subheading" gutterBottom>
        Creator: {creator.displayName}
      </Typography>
      <Divider style={dividerStyle} />
      {dashboardInfo && <ReviewerSummaryComponent reviewers={dashboardInfo.reviewers} />}
    </div>
  );
};

TaskSummaryDialog.propTypes = {
  reviewsForTeam: PropTypes.arrayOf(TaskPropType),
  selectedTaskIndex: PropTypes.number,
};

TaskSummaryDialog.defaultProps = {
  reviewsForTeam: [],
  selectedTaskIndex: undefined,
};

function mapStateToProps(state) {
  return {
    reviewsForTeam: state.reviewsForTeam,
    selectedTaskIndex: state.selectedTaskIndex,
  };
}

export default connect(mapStateToProps)(TaskSummaryDialog);
