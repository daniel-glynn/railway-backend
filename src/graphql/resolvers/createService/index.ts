import { GraphQLError } from 'graphql';
import { Context } from '../../context';

const createServiceResolver = async (
  _: unknown,
  args: { projectId: string, environmentId: string, templateServiceId: string, serializedConfig: JSON},
  context: Context
): Promise<{projectId: string, workflowId: string}> => {
  const projectId = args.projectId
  const environmentId = args.environmentId
  const templateServiceId = args.templateServiceId
  const serializedConfig = args.serializedConfig

  let data = {} as {projectId: string, workflowId: string}
  try {
    data =  await (await context.graphRequest.createService(projectId, environmentId, templateServiceId, serializedConfig)).templateDeployV2
  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error creating template service from railway graph: ${err.message}`);
    throw new GraphQLError('Server Error');
  };
  return data
};

export default createServiceResolver;