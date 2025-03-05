import { GraphQLError } from "graphql";
import type { Deployment } from "../../../types";
import { Context } from "../../context";

const deploymentsResolver = async (
  _: unknown,
  args: { projectId: string},
  context: Context
): Promise<Deployment[]> => {
  let data = {} as {deployments: Deployment[]}

  try {
    data = await context.graphRequest.getLatestDeploymentsForProject(args.projectId);
  } catch (e) {
    const err = e as Error;
    context.logger.error(
      `Error fetching deployments data from railway graph: ${err.message}`
    );
    throw new GraphQLError("Server Error");
  }

  return data.deployments;
};

export default deploymentsResolver;
