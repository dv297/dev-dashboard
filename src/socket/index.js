import SocketIO from 'socket.io';
import { getReviewDetailsForTeam } from '../api/Team';
import getReviewForId from '../api/Review';
import updateReviewerStatus from '../api/TaskDetails';

export default (server) => {
  const io = new SocketIO(server);

  io.on('connection', (socket) => {
    socket.on('action', (action) => {
      switch (action.type) {
        case 'server/REQUEST_ALL_TASKS': {
          getReviewDetailsForTeam().then((reviewsForTeam) =>
            socket.emit('action', { type: 'REQUEST_ALL_TASKS_SUCCESS', reviewsForTeam }),
          );
          break;
        }
        case 'server/REQUEST_TASK_DETAILS': {
          getReviewForId(action.permaId).then((reviewDetails) =>
            socket.emit('action', { type: 'REQUEST_TASK_DETAILS_SUCCESS', reviewDetails }),
          );
          break;
        }
        case 'server/UPDATE_REVIEWER_STATUS': {
          updateReviewerStatus(action.permaId, action.reviewer, action.status)
            .then(getReviewDetailsForTeam)
            .then((reviewsForTeam) => io.emit('action', { type: 'RELOAD_TASKS', reviewsForTeam }));
          break;
        }
        default: {
          socket.emit({ type: 'default' });
        }
      }
    });
  });
};
