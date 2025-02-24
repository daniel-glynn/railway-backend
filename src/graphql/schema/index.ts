import activeDeploymentResolver from '../resolvers/activeDeployment';
import userResolver from '../resolvers/user';
import createServiceResolver from '../resolvers/createService';
import deleteProjectResolver from '../resolvers/deleteProject';
import restartDeploymentResolver from '../resolvers/restartDeployment';

export const resolvers = {
  Query: {
    activeDeployment: activeDeploymentResolver,
    user: userResolver,
  },
  Mutation: {
    createService: createServiceResolver,
    deleteProject: deleteProjectResolver,
    restartDeployment: restartDeploymentResolver,
  },
};
