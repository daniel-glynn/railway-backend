import { ProjectEdge } from './project'

export type RailwayUser = {
  me: {
    avatar: string;
    email: string;
    name: string;
    projects: {
      edges: ProjectEdge[]
    }
  }
 
};
