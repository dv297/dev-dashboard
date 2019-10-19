const { GraphQLClient } = require('graphql-request');

const { GITHUB_GRAPHQL_API_URL, GITHUB_REPOS_FOR_PULL_REQUEST_LISTING_QUERY } = require('../constants');

const githubAPIEndPoint = GITHUB_GRAPHQL_API_URL;
const githubAPIEndPointToken = process.env.GITHUB_TOKEN;

const repositoryQuery = ({ cursor }) => {
  const startingAfterClause = cursor ? `after: ${cursor}` : '';

  return `
query {
	search(query: "${GITHUB_REPOS_FOR_PULL_REQUEST_LISTING_QUERY}", 
	type: REPOSITORY, first: 100, ${startingAfterClause}) {
    edges {
      cursor
			node {
        ... on Repository {
          name
          url
        }
      }
    }
  }
}
`;
};

const graphqlClient = new GraphQLClient(githubAPIEndPoint, {
  headers: {
    authorization: `Bearer ${githubAPIEndPointToken}`,
  },
});

module.exports = ({ startingCursor } = {}) =>
  graphqlClient
    .request(repositoryQuery({ startingCursor }))
    .then((data) => data.search.edges.map(({ cursor, node: { name, url } }) => ({ cursor, name, url })));
