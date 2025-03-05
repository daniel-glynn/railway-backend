import { GraphQLError } from 'graphql';
import type { Project } from '../../../types';
import { Context } from '../../../graphql/context';

const projectResolver = async (
  _: unknown,
  args: { projectId: string},
  context: Context
): Promise<Project> => {
  const projectId = args.projectId
  let data = {} as Project | null;

  try {
    data = (await context.graphRequest.getProject(projectId)).project
    console.log(JSON.stringify(data))
  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error fetching project data from railway graph: ${err.message}`);
    throw new GraphQLError('Server Error');
  }

  return data
};

export default projectResolver;
