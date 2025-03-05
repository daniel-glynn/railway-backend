import activeDeploymentResolver from '../resolvers/activeDeployment';
import railwayUserResolver from '../resolvers/railwayUser';
import deploymentsResolver from '../resolvers/deployments';
import projectResolver from '../resolvers/project';
import templatesResolver from '../resolvers/templates';

import createProjectResolver from '../resolvers/createProject';
import createServiceResolver from '../resolvers/createService';
import deleteProjectResolver from '../resolvers/deleteProject';
import deleteServiceResolver from '../resolvers/deleteService';
import registerOwnerResolver from '../resolvers/registerOwner';
import loginResolver from '../resolvers/login';
import restartDeploymentResolver from '../resolvers/restartDeployment';
import serviceResolver from '../resolvers/service';

export const resolvers = {
  Query: {
    activeDeployment: activeDeploymentResolver,
    deployments: deploymentsResolver,
    me: railwayUserResolver,
    project: projectResolver,
    service: serviceResolver,
    templates: templatesResolver
  },
  Mutation: {
    createProject: createProjectResolver,
    createService: createServiceResolver,
    deleteProject: deleteProjectResolver,
    deleteService: deleteServiceResolver,
    login: loginResolver,
    registerOwner: registerOwnerResolver,
    restartDeployment: restartDeploymentResolver,
  },
};
