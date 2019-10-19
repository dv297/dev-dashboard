import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TaskCard } from '../';
import TaskPropType from '../../PropTypes/TaskPropType';

class TaskCardList extends React.Component {
  render() {
    const { reviewsForTeam, selectedTaskIndex } = this.props;

    if (!reviewsForTeam) {
      return null;
    }

    return reviewsForTeam.map((review, index) => <TaskCard task={review} isSelected={index === selectedTaskIndex} />);
  }
}

TaskCardList.propTypes = {
  selectedTaskIndex: PropTypes.number.isRequired,
  reviewsForTeam: PropTypes.arrayOf(TaskPropType).isRequired,
};

export default connect(mapStateToProps)(TaskCardList);

function mapStateToProps(state) {
  return {
    reviewsForTeam: state.reviewsForTeam,
    selectedTaskIndex: state.selectedTaskIndex,
  };
}
