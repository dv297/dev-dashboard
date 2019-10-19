import React from 'react';
import { storiesOf } from '@storybook/react';

import { TaskCardReviewerSummaryView } from '../../ClientSrc/components';
import DefaultTask from '../data/DefaultTask';

export default () => {
  storiesOf('TaskCardReviewerSummaryView', module).add('Default', () => (
    <TaskCardReviewerSummaryView task={DefaultTask} />
  ));
};
