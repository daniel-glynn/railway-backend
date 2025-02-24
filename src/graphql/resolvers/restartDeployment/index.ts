import { GraphQLError } from 'graphql';
import { Context } from '../../context';

const restartDeploymentResolver = async (
  _: unknown,
  args: { id: string},
  context: Context
): Promise<Boolean> => {
  const deploymentId = args.id

  try {
    await context.graphRequest.restartDeployment(deploymentId)
  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error restarting deployment from railway graph: ${err.message}`);
    throw new GraphQLError('Server Error');
  };
  return true
};

export default restartDeploymentResolver;