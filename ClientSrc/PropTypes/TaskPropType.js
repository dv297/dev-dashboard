import PropTypes from 'prop-types';

export default {
  createDate: PropTypes.string.isRequired,
  creator: PropTypes.shape({
    avatarURL: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  jiraIssueKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  permaId: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
