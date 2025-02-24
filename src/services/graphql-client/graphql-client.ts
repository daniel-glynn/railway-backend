import { GraphQLClient as GraphqlRequest } from 'graphql-request';

import { EnvKeys } from '../../constants';
import { env } from '../../util';
import { Service, User, Deployment } from '../../types'

import {
  userDetailsQuery,
  latestActiveDeploymentQuery
} from './helpers/queries';
import {
  createServiceMutation,
  deleteProjectMutation,
  restartDeploymentMutation
} from './helpers/mutations';

class GraphQLClient {
  private graphqlClient: GraphqlRequest;

  constructor() {
    const graphRequest = new GraphqlRequest(
      env.get(EnvKeys.RAILWAY_PUBLIC_API),
      {
        headers: {
          'Authorization': `Bearer ${env.get(EnvKeys.RAILWAY_API_KEY)}`,
        },
      }
    );
    this.graphqlClient = graphRequest;
  }

  async getUserDetails(): Promise<User> {
    return this.graphqlClient.request(userDetailsQuery);
  }

  async deleteProject(id: string): Promise<void> {
    return await this.graphqlClient.request(deleteProjectMutation, { id });
  }

  async createService(projectId: string, repo: string): Promise<Service> {
    return await this.graphqlClient.request(createServiceMutation, { projectId, repo });
  }

  async getLatestActiveDeploymentForProject(projectId: string, environmentId: string, serviceId: string): Promise<Deployment> {
    console.log(projectId)

    return await this.graphqlClient.request(latestActiveDeploymentQuery, { projectId, environmentId, serviceId });
  }

  async restartDeployment(id: string): Promise<void> {
    const test = await this.graphqlClient.request(restartDeploymentMutation, { id });
    console.log(JSON.stringify(test))
    return 
  }
}

export default GraphQLClient;
