import { GraphQLError } from 'graphql';
import { Context } from '../../../graphql/context';

const deleteServiceResolver = async (
  _: unknown,
  args: { id: string },
  context: Context
): Promise<Boolean> => {
  const id = args.id

  try {
    await context.graphRequest.serviceDelete(id)
  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error deleting service from railway graph: ${err.message}`);
    throw new GraphQLError('Server Error');
  };
  return true
};

export default deleteServiceResolver;