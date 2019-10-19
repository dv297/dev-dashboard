const possibleStates = [
  {
    status: 'NOT_ON_REVIEW',
    displayName: 'Not on Review',
  },
  {
    status: 'READY_TO_REVIEW',
    displayName: 'Ready to Review',
  },
  {
    status: 'IN_PROGRESS',
    displayName: 'In Progress',
  },
  {
    status: 'WAITING_FOR_AUTHOR',
    displayName: 'Waiting for Author',
  },
  {
    status: 'COMPLETE',
    displayName: 'Complete',
  },
];

export default possibleStates;

const getDisplayNameForStatus = (status) => {
  const states = possibleStates.filter((state) => state.status === status);
  if (states.length > 0) {
    return states[0].displayName;
  }

  return '';
};

export { getDisplayNameForStatus };
