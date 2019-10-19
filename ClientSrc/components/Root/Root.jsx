import React from 'react';
import { Provider } from 'react-redux';
import classNames from 'classnames/bind';

import store from '../../store';
import { actionCreators } from '../../reducers/reducers';
import { TaskCardList, TaskSummaryDialog } from '../index';
import styles from './style.scss';

const cx = classNames.bind(styles);

class Root extends React.Component {
  componentDidMount() {
    store.dispatch(actionCreators.requestAllTasksFromServer());
  }

  render() {
    return (
      <Provider store={store}>
        <div className={cx('root')}>
          <div className={cx('task-workflow-container')}>
            <div className={cx('task-card-list-container')}>
              <TaskCardList />
            </div>
            <div className={cx('task-summary-dialog-container')}>
              <TaskSummaryDialog />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default Root;
