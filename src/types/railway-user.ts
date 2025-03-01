import { ProjectEdge } from './project'

export type RailwayUser = {
  me: RailwayUserProperties
};

export type RailwayUserProperties = {
  avatar: string;
  email: string;
  name: string;
  projects: {
    edges: ProjectEdge[]
  }
}
