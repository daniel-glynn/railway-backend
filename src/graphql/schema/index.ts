import activeDeploymentResolver from '../resolvers/activeDeployment';
import railwayUserResolver from '../resolvers/railwayUser';
import deploymentsResolver from '../resolvers/deployments';

import createServiceResolver from '../resolvers/createService';
import deleteProjectResolver from '../resolvers/deleteProject';
import registerOwnerResolver from '../resolvers/registerOwner';
import loginResolver from '../resolvers/login';

import restartDeploymentResolver from '../resolvers/restartDeployment';

export const resolvers = {
  Query: {
    activeDeployment: activeDeploymentResolver,
    deployments: deploymentsResolver,
    me: railwayUserResolver,
  },
  Mutation: {
    createService: createServiceResolver,
    deleteProject: deleteProjectResolver,
    login: loginResolver,
    registerOwner: registerOwnerResolver,
    restartDeployment: restartDeploymentResolver,
  },
};
