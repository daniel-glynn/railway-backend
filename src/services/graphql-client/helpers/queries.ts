import gql from 'graphql-tag';

export const userDetailsQuery = gql`
   query getUserDetails {
    me {
      email
      name
      avatar
      projects {
        edges {
          node {
            id
            name
            description
            updatedAt
            services {
              edges {
                node {
                  id
                  name
                }
              }
            }
            plugins {
              edges {
                node {
                  id
                  name
                }
              }
            }
            environments {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const latestDeployments = gql`
  query deployment($projectId: String!) {
    deployments(
      first: 10
      input: {
      projectId: $projectId
    }
    ) {
      edges {
        node {
          id
          staticUrl
          canRedeploy
          canRollback
          deploymentStopped
          environmentId
          status
          projectId
          url        
        }
      }
    }
  }
`


export const latestActiveDeploymentQuery = gql`
  query deployments($projectId: String!, $environmentId: String!, $serviceId: String!) {
    deployments(
      first: 1
      input: {
        projectId: $projectId
        environmentId: $environmentId
        serviceId: $serviceId
      }
    ) {
      edges {
        node {
          id
          staticUrl
          canRedeploy
          canRollback
          deploymentStopped
          environmentId
          status
          projectId
          url        
        }
      }
    }
  }
`

