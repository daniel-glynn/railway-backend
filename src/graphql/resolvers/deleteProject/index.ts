import { GraphQLError } from 'graphql';
import { Context } from '../../../graphql/context';

const deleteProjectResolver = async (
  _: unknown,
  args: { projectId: string},
  context: Context
): Promise<Boolean> => {
  const projectId = args.projectId

  try {
    await context.graphRequest.deleteProject(projectId)
  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error deleting project from railway graph: ${err.message}`);
    throw new GraphQLError('Server Error');
  };
  return true
};

export default deleteProjectResolver;