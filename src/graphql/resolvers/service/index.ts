import { GraphQLError } from 'graphql';
import type { Service } from '../../../types';
import { Context } from '../../../graphql/context';

const serviceResolver = async (
  _: unknown,
  args: { serviceId: string},
  context: Context
): Promise<Service> => {
  const serviceId = args.serviceId
  let data = {} as Service | null;

  try {
    data = (await context.graphRequest.getService(serviceId)).service
  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error fetching service data from railway graph: ${err.message}`);
    throw new GraphQLError('Server Error');
  }

  return data
};

export default serviceResolver;
