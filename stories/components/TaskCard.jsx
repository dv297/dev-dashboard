import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, boolean } from '@storybook/addon-knobs/react';

import { TaskCard } from '../../ClientSrc/components';
import DefaultTask from '../data/DefaultTask';

const store = createStore((state) => state, { selectedTaskId: 0 });

const getTaskKnob = (task = DefaultTask) => object('task', task);
const getIsSelectedKnob = (isSelected = false) => boolean('isSelected', isSelected);

export default () => {
  storiesOf('TaskCard', module)
    .addDecorator((story) => <Provider store={store}>{story()}</Provider>)
    .addDecorator(withKnobs)
    .add('Default', () => <TaskCard task={getTaskKnob()} isSelected={getIsSelectedKnob()} />)
    .add('Selected', () => <TaskCard task={getTaskKnob()} isSelected={getIsSelectedKnob(true)} />);
};
