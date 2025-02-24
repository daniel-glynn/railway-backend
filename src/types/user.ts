import { ProjectEdge } from './project'

export type User = {
  me: {
    avatar: string;
    email: string;
    name: string;
    projects: {
      edges: ProjectEdge[]
    }
  }
 
};
