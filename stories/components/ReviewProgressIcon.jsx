import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions/dist/index';

import { ReviewProgressIcon } from '../../ClientSrc/components';

export default () => {
  storiesOf('ReviewProgressIcon', module)
    .add('Not on Review', () => <ReviewProgressIcon status="NOT_ON_REVIEW" onClick={action('clicked')} />)
    .add('Ready to Review', () => <ReviewProgressIcon status="READY_TO_REVIEW" onClick={action('clicked')} />)
    .add('In Progress', () => <ReviewProgressIcon status="IN_PROGRESS" onClick={action('clicked')} />)
    .add('Waiting for Author', () => <ReviewProgressIcon status="WAITING_FOR_AUTHOR" onClick={action('clicked')} />)
    .add('Complete', () => <ReviewProgressIcon status="COMPLETE" onClick={action('clicked')} />);
};
