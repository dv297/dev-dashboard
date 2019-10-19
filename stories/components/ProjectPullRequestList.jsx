import React from 'react';
import { storiesOf } from '@storybook/react';

import { ProjectPullRequestList } from '../../ClientSrc/components';
import DefaultPullRequestList from '../data/DefaultPullRequestList';

export default () => {
  storiesOf(ProjectPullRequestList.name, module).add('Default', () => (
    <ProjectPullRequestList projectName="Default Project Name" pullRequests={DefaultPullRequestList} />
  ));
};
