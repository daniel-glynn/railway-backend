import { GraphQLError } from 'graphql';
import { Context } from '../../context';
import { Project } from 'ui/types';

const createProjectResolver = async (
  _: unknown,
  args: { description: string, name: string},
  context: Context
): Promise<Project> => {
  let project = {} as Project
  const description = args.description
  const name = args.name

  try {
    project = (await context.graphRequest.createProject(description, name)).projectCreate
    console.log(project)
  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error creating project from railway graph: ${err.message}`);
    throw new GraphQLError('Server Error');
  };
  return project
};

export default createProjectResolver;