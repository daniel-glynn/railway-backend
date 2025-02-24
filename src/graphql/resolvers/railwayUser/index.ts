import { GraphQLError } from 'graphql';
import type { RailwayUser } from '../../../types';
import { Context } from '../../context';

const resolver = async (
  _: unknown,
  _args: unknown,
  context: Context
): Promise<RailwayUser> => {
  let data = {} as RailwayUser | null;

  try {
    data = await context.graphRequest.getRailwayUserDetails()
  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error fetching user data from railway graph: ${err.message}`);
    throw new GraphQLError('Server Error');
  }

  if (data === null) {
    return data;
  }
  console.log(data)
  return {
    me: {
      avatar: data.me.avatar,
      email: data.me.email,
      name: data.me.name,
      projects: data.me.projects
    }
   
  };
};

export default resolver;
