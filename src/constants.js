export const USERS_TO_PULL_REVIEWS_FROM = ['jd123456'];

/**
 * Constructs a reviewer object
 * @param {string} displayName
 *    The display name of the reviewer.
 * @param userName
 *    The Crucible username of the reviewer
 * @param avatarUrl
 *    The URL of the avatar for the reviewer
 *
 * @returns {object} Object representing the reviewer.
 *
 * @example
 * createReviewer('Daniel Vu', 'DV045327', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'),
 */
const createReviewer = (displayName, userName, avatarUrl) => ({
  userName,
  displayName,
  avatarUrl,
});

/**
 * Array of reviewers created using {@link createReviewer}.
 */
export const REVIEWERS_FOR_TEAM = [
  createReviewer(
    'John Doe',
    'JD123456',
    'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  ),
];

export const POSSIBLE_STATES = ['NOT_ON_REVIEW', 'READY_TO_REVIEW', 'IN_PROGRESS', 'WAITING_FOR_AUTHOR', 'COMPLETE'];

export const CRUCIBLE_BASE_URL = 'http://crucible.com';

export const API_BASE_URL = 'http://crucible.com/viewer/rest-service';

export const GITHUB_GRAPHQL_API_URL = 'https://github.com/api/graphql';

/**
 * The search string used to find the repositories to retrieve pull requests from
 */
export const GITHUB_REPOS_FOR_PULL_REQUEST_LISTING_QUERY = 'org:test-org language:javascript';
