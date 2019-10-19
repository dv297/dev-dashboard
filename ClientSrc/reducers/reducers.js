const SERVER_REQUEST_ALL_TASKS = 'server/REQUEST_ALL_TASKS';
const SERVER_UPDATE_REVIEWER_STATUS = 'server/UPDATE_REVIEWER_STATUS';

const RELOAD_TASKS = 'RELOAD_TASKS';
const REQUEST_ALL_TASKS_SUCCESS = 'REQUEST_ALL_TASKS_SUCCESS';

const SELECT_ACTIVE_TASK = 'SELECT_ACTIVE_TASK';
const UPDATE_REVIEWER_STATUS = 'UPDATE_REVIEWER_STATUS';

const requestAllTasksFromServer = () => ({
  type: SERVER_REQUEST_ALL_TASKS,
});

const selectActiveTask = (id) => ({
  type: SELECT_ACTIVE_TASK,
  id,
});

const updateReviewerStatus = (permaId, reviewer, status) => ({
  type: SERVER_UPDATE_REVIEWER_STATUS,
  permaId,
  reviewer,
  status,
});

function reducer(state = {}, action = {}) {
  switch (action.type) {
    case RELOAD_TASKS: {
      return {
        ...state,
        reviewsForTeam: action.reviewsForTeam,
      };
    }
    case REQUEST_ALL_TASKS_SUCCESS: {
      const updatedState = {
        ...state,
        reviewsForTeam: action.reviewsForTeam,
      };

      if (updatedState.reviewsForTeam.length > 0) {
        updatedState.selectedTaskIndex = 0;
      }
      return updatedState;
    }
    case SELECT_ACTIVE_TASK: {
      const selectedTaskIndex = state.reviewsForTeam.findIndex((review) => review.permaId.id === action.id);
      return {
        ...state,
        selectedTaskIndex,
      };
    }
    case UPDATE_REVIEWER_STATUS:
      return {
        ...state,
      };
    default:
      return state;
  }
}

const actionCreators = {
  requestAllTasksFromServer,
  selectActiveTask,
  updateReviewerStatus,
};

export default reducer;
export { actionCreators };
