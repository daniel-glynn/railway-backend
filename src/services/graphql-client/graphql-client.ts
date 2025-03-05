import { GraphQLClient as GraphqlRequest } from 'graphql-request';

import { EnvKeys } from '../../constants';
import { env } from '../../util';
import {  RailwayUser, Deployment, Project } from '../../types'

import {
  userDetailsQuery,
  latestActiveDeploymentQuery,
  latestDeployments,
  fetchProjectQuery,
  recommendedTemplates,
  fetchServiceQuery
} from './helpers/queries';
import {
  createProjectMutation,
  deleteProjectMutation,
  deployTemplateMutation,
  restartDeploymentMutation,
  serviceDelete
} from './helpers/mutations';
import { Service, Template } from 'ui/types/project';

class GraphQLClient {
  private graphqlClient: GraphqlRequest;

  constructor() {
    const graphRequest = new GraphqlRequest(
      env.get(EnvKeys.RAILWAY_PUBLIC_API)
    );
    this.graphqlClient = graphRequest;
  }

  async setHeader(apiKey: string): Promise<void> {
    this.graphqlClient.setHeader('Authorization', `Bearer ${apiKey}`)
  }

  async getRailwayUserDetails(): Promise<RailwayUser> {
    return this.graphqlClient.request(userDetailsQuery);
  }

  async deleteProject(id: string): Promise<void> {
    return await this.graphqlClient.request(deleteProjectMutation, { id });
  }

  async createService(projectId: string, environmentId: string, templateId: string, serializedConfig): Promise<{templateDeployV2: {projectId: string, workflowId: string}}> {
    return await this.graphqlClient.request(deployTemplateMutation, { input: {projectId, environmentId, templateId, serializedConfig }  });
  }

  async createProject(description: string, name: string): Promise<{projectCreate: Project}> {
    return await this.graphqlClient.request(createProjectMutation, { description, name  });
  }

  async getProject(id: string): Promise<{project: Project}> {
    return await this.graphqlClient.request(fetchProjectQuery, { id  });
  }

  async getService(id: string): Promise<{service: Service}> {
    return await this.graphqlClient.request(fetchServiceQuery, { id  });
  }

  async getRecommendedTemplates(): Promise<{templates: Template[]}> {
    return await this.graphqlClient.request(recommendedTemplates);
  }

  async getLatestDeploymentsForProject(projectId: string): Promise<{deployments: Deployment[]}> {
    return await this.graphqlClient.request(latestDeployments, {
      projectId
    });
  }

  async getLatestActiveDeploymentForProject(projectId: string, environmentId: string, serviceId: string): Promise<Deployment> {
    return await this.graphqlClient.request(latestActiveDeploymentQuery, { projectId, environmentId, serviceId });
  }

  async restartDeployment(id: string): Promise<void> {
    return await this.graphqlClient.request(restartDeploymentMutation, { id });
  }

  async serviceDelete(id: string): Promise<void> {
    const test = await this.graphqlClient.request(serviceDelete, { id });
    console.log(JSON.stringify(test))
    return 
  } 
}

export default GraphQLClient;
