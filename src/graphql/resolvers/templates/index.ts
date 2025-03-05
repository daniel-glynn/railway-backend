import { GraphQLError } from "graphql";
import type { Template } from "../../../types";
import { Context } from "../../context";

const templatesResolver = async (
  _: unknown,
  _args: unknown,
  context: Context
): Promise<Template[]> => {
  let data = {} as {templates: Template[]}

  try {
    data = await context.graphRequest.getRecommendedTemplates();
  } catch (e) {
    const err = e as Error;
    context.logger.error(
      `Error fetching deployments data from railway graph: ${err.message}`
    );
    throw new GraphQLError("Server Error");
  }

  return data.templates;
};

export default templatesResolver;
