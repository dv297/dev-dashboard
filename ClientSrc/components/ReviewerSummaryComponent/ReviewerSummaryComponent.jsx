import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

import { ReviewerProgressionControl } from '../';
import { getDisplayNameForStatus } from '../../constants/PossibleStates';

const ReviewerSummaryComponent = ({ reviewers }) => {
  if (!reviewers) {
    return null;
  }

  return (
    <Paper>
      <List subheader={<ListSubheader>Reviewers</ListSubheader>}>
        {reviewers.map((reviewer) => (
          <ListItem key={reviewer.userName} button>
            <Avatar>
              <Avatar src={reviewer.avatarUrl} />
            </Avatar>
            <ListItemText primary={`${reviewer.displayName} - ${getDisplayNameForStatus(reviewer.status)}`} />
            {reviewer.status && <ReviewerProgressionControl reviewer={reviewer} />}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

ReviewerSummaryComponent.propTypes = {
  reviewers: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string,
      displayName: PropTypes.string,
      avatarUrl: PropTypes.string,
      url: PropTypes.string,
      reviewProgress: PropTypes.string,
    }),
  ),
};

ReviewerSummaryComponent.defaultProps = {
  reviewers: [],
};

export default ReviewerSummaryComponent;
