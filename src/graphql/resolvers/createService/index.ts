import { GraphQLError } from 'graphql';
import { Context } from '../../context';

const createServiceResolver = async (
  _: unknown,
  args: { projectId: string, repo: string},
  context: Context
): Promise<Boolean> => {
  const projectId = args.projectId
  const repo = args.repo

  try {
    await context.graphRequest.createService(projectId, repo)
  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error creating service from railway graph: ${err.message}`);
    throw new GraphQLError('Server Error');
  };
  return true
};

export default createServiceResolver;