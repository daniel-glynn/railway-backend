export type Project = {
  id: string;
  name: string;
  updatedAt: Date;
  description: string;
  baseEnvironmentId: string;
  services: ServiceEdge[]
  environments: EnvironmentEdge[]
};

export type ProjectEdge = {
  node: Project
}

export type PluginEdge = {
  node: Plugin
}

export type EnvironmentEdge = {
  node: Environment
}

export type ServiceEdge = {
  node: Environment
}

export type Plugin = {
  id: string;
  name: string;
};

export type Environment = {
  id: string;
  name: string;
  variables: {
    edges: {
     node: {
        id: string
        name: string 
        serviceId: string
      }
    }
  }
};

export type Service = {
  id: string;
  name: string;
};

export type Deployment = {
  canRedeploy: boolean;
  canRollback: boolean;
  deploymentStopped: boolean;
  environmentId: string;
  projectId: string;
  status: DeploymentStatus;
  url: string;
  staticUrl: string;
  id: string;
}

enum DeploymentStatus {
  BUILDING='BUILDING',
  CRASHED='CRASHED',
  DEPLOYING='DEPLOYING',
  FAILED='FAILED',
  INITIALIZING='INITIALIZING',
  NEEDS_APPROVAL='NEEDS_APPROVAL',
  QUEUED='QUEUED',
  REMOVED='REMOVED',
  REMOVING='REMOVING',
  SKIPPED='SKIPPED',
  SLEEPING='SLEEPING',
  SUCCESS='SUCCESS',
  WAITING='WAITING',
}

export type Template = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string
  serializedConfig: JSON
};
