import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';

const ProjectPullRequestList = ({ projectName, pullRequests }) => {
  const openNewTab = (url) => window.open(url);

  const getCreatorAvatar = (pullRequest) => (
    <Avatar src={pullRequest.user.avatar_url} title={pullRequest.user.login} alt={pullRequest.user.login} />
  );

  return (
    <div>
      <Typography variant="headline">{projectName}</Typography>
      {pullRequests.map((pullRequest) => (
        <Card key={pullRequest.id}>
          <CardHeader
            avatar={getCreatorAvatar(pullRequest)}
            title={pullRequest.title}
            subheader={`Created by ${pullRequest.user.login}`}
          />
          <CardContent>
            <Typography component="p">{`Project: ${projectName}`}</Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary" onClick={() => openNewTab(pullRequest.html_url)}>
              Open
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

ProjectPullRequestList.propTypes = {
  projectName: PropTypes.string.isRequired,
  pullRequests: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProjectPullRequestList;
