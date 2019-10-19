import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames/bind';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import styles from './NavigationBar.scss';

const cx = classNames.bind(styles);

const inlineStyles = () => ({
  root: {
    width: '100%',
  },
});

const CodeReviewLink = (props) => <Link to="/" {...props} />;
const PullRequestLink = (props) => <Link to="/github" {...props} />;

const NavigationBar = () => {
  return (
    <div>
      <AppBar color="default" position="static">
        <ToolBar>
          <Typography type="title" color="inherit" className={cx('title')}>
            Developer Dashboard - Team Rockhold
          </Typography>
          <Button component={CodeReviewLink}>Code Reviews</Button>
          <Button component={PullRequestLink}>Pull Requests</Button>
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default withStyles(inlineStyles)(NavigationBar);
