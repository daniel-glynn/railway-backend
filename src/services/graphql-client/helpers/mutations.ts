import gql from 'graphql-tag';

export const deleteProjectMutation = gql`
  mutation projectDelete($id: String!) {
    projectDelete(id: $id) 
  }
`;

export const createServiceMutation = gql`
  mutation serviceCreate($projectId: String!, $repo: String!) {
    serviceCreate(
      input: {
        projectId: $projectId
        source: { repo: $repo }
      }
    ) {
      id
      name
    }
  }
`;

export const restartDeploymentMutation = gql`
  mutation deploymentRestart($id: String!) {
    deploymentRestart(id: $id)
  }
`;