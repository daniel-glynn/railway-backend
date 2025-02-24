import { GraphQLError } from 'graphql';
import type { Deployment } from '../../../types';
import { Context } from '../../../graphql/context';

const activeDeploymentResolver = async (
  _: unknown,
  args: { projectId: string, environmentId: string, serviceId: string},
  context: Context
): Promise<Deployment> => {
  const projectId = args.projectId
  const environmentId = args.environmentId
  const serviceId = args.serviceId
  let data = {} as Deployment | null;

  try {
    data = await context.graphRequest.getLatestActiveDeploymentForProject(projectId, environmentId, serviceId)
  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error fetching latest active deployment data from railway graph: ${err.message}`);
    throw new GraphQLError('Server Error');
  }

  return data
};

export default activeDeploymentResolver;
