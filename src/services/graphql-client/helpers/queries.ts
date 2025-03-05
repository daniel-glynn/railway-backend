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
      last: 10
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

export const fetchProjectQuery = gql`
  query project($id: String!) {
    project(id: $id ) {
      id
      name
      description
      updatedAt
      baseEnvironmentId
      services {
        edges {
          node {
            updatedAt
            id
            icon
            name
          }
        }
      }
      deployments(first: 10) {
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
            updatedAt
            serviceId
          }
        }
      }
      environments {
        edges {
          node {
            id
            name
            variables {
              edges {
              node {
                id
                name
                serviceId
              }
            }
          }
          }
        }
      }     
    }
  }
`

export const recommendedTemplates = gql`
  query templates {
    templates(
      first: 100
      recommended: true
    ) {
      edges {
        node {
          name
          id
          category
          description
          image
          serializedConfig
        }
      }
    }
  }
`

export const fetchServiceQuery = gql`
  query service($id: String!) {
    service(id: $id ) {
      updatedAt
      id
      icon
      name
    }
  }
`