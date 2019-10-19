import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import classNames from 'classnames/bind';
import moment from 'moment';

import { TaskCardReviewerSummaryView } from '../';
import { actionCreators } from '../../reducers/reducers';
import TaskPropType from '../../PropTypes/TaskPropType';
import styles from './TaskCard.scss';
import { CRUCIBLE_BASE_URL } from '../../../src/constants';

const cx = classNames.bind(styles);

const TaskCard = ({ task, isSelected, dispatch }) => {
  const creatorAvatar = (
    <Avatar src={task.creator.avatarUrl} title={task.creator.displayName} alt={task.creator.displayName} />
  );
  const getReviewURL = (review) => `${CRUCIBLE_BASE_URL}/viewer/cru/${review.permaId.id}`;
  const openNewTab = (url) => window.open(url);

  const daysOpen = moment().diff(moment(task.createDate, 'YYYY-MM-DD'), 'days');
  const daysLabel = daysOpen > 1 ? 'days' : 'day';

  return (
    <Card
      className={cx('card')}
      data-selected={isSelected}
      raised={isSelected}
      onClick={() => dispatch(actionCreators.selectActiveTask(task.permaId.id))}
    >
      <CardHeader title={task.name} subheader={task.permaId.id} avatar={creatorAvatar} />
      <CardContent>
        <Typography component="p">Open for {`${daysOpen} ${daysLabel}`}</Typography>
      </CardContent>
      <CardActions>
        <Button dense color="primary" onClick={() => openNewTab(getReviewURL(task))}>
          Open
        </Button>
        <TaskCardReviewerSummaryView task={task} />
      </CardActions>
    </Card>
  );
};

TaskCard.propTypes = {
  task: TaskPropType.isRequired,
  isSelected: PropTypes.bool,
  dispatch: PropTypes.func,
};

TaskCard.defaultProps = {
  isSelected: false,
  dispatch: () => {},
};

export default connect(mapStateToProps)(TaskCard);

function mapStateToProps(state) {
  return {
    selectedTaskId: state.selectedTaskId,
  };
}
