import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';

import possibleStates from '../../constants/PossibleStates';

const ReviewerStateSelector = ({ isOpen, selectedValue, onRequestClose }) => {
  const handleRequestClose = () => {
    onRequestClose(selectedValue);
  };

  const handleItemSelected = (itemValue) => {
    onRequestClose(itemValue);
  };

  const stateList = possibleStates.map((state) => (
    <ListItem button onClick={() => handleItemSelected(state.status)} key={state.status}>
      <ListItemText primary={state.displayName} />
    </ListItem>
  ));

  return (
    <Dialog open={isOpen} onRequestClose={handleRequestClose}>
      <DialogTitle>Set Review Status for Reviewer</DialogTitle>
      <List>{stateList}</List>
    </Dialog>
  );
};

ReviewerStateSelector.propTypes = {
  isOpen: PropTypes.bool,
  selectedValue: PropTypes.string,
  onRequestClose: PropTypes.func,
};

ReviewerStateSelector.defaultProps = {
  isOpen: false,
  selectedValue: '',
  onRequestClose: () => {},
};

export default ReviewerStateSelector;
