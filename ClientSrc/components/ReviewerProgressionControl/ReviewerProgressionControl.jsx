import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ReviewProgressIcon, ReviewerStateSelector } from '../';
import { actionCreators } from '../../reducers/reducers';
import TaskPropType from '../../PropTypes/TaskPropType';

class ReviewerProgressionControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReviewStateSelectorOpen: false,
    };

    this.openReviewStateSelector = this.openReviewStateSelector.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  openReviewStateSelector() {
    this.setState({
      isReviewStateSelectorOpen: true,
    });
  }

  handleRequestClose(updatedStatus) {
    const { review, reviewer } = this.props;
    this.props.actions.updateReviewerStatus(review.permaId.id, reviewer.userName, updatedStatus);
    this.setState({
      isReviewStateSelectorOpen: false,
    });
  }

  render() {
    const { status } = this.props.reviewer;

    return (
      <div>
        <ReviewProgressIcon status={status} onClick={this.openReviewStateSelector} />
        <ReviewerStateSelector
          isOpen={this.state.isReviewStateSelectorOpen}
          onRequestClose={this.handleRequestClose}
          selectedValue={status}
        />
      </div>
    );
  }
}

ReviewerProgressionControl.propTypes = {
  review: TaskPropType.isRequired,
  reviewer: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    updateReviewerStatus: PropTypes.func,
  }),
};

ReviewerProgressionControl.defaultProps = {
  actions: {
    updateReviewerStatus: () => {},
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewerProgressionControl);

function mapStateToProps(state) {
  const review = state.reviewsForTeam[state.selectedTaskIndex];
  return {
    review,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}
