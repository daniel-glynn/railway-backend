import gql from 'graphql-tag';

export const createProjectMutation = gql`
  mutation projectCreate($description: String!, $name: String!) {
    projectCreate(
      input: {
        description: $description
        name: $name
      }
    ) {
      id
      name
      description
      updatedAt
    }
  }
`;

export const deleteProjectMutation = gql`
  mutation projectDelete($id: String!) {
    projectDelete(id: $id) 
  }
`;

export const deployTemplateMutation = gql`
  mutation templateDeployV2($input: TemplateDeployV2Input!) {
    templateDeployV2(
      input: $input
    ) {
      projectId
      workflowId
    }
  }
`;

export const restartDeploymentMutation = gql`
  mutation deploymentRestart($id: String!) {
    deploymentRestart(id: $id)
  }
`;

export const serviceDelete = gql`
  mutation serviceDelete($id: String!) {
    serviceDelete(id: $id )
  }
`;
