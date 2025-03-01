import { GraphQLError } from 'graphql';
import { Owner } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker }from '@faker-js/faker'

import { Context } from '../../context';

const registerOwnerResolver = async (
  _: unknown,
  args: {email: string, password: string, railwayApiKey: string},
  context: Context
): Promise<Owner> => {
  let data = {} as Owner | null;

  try {
    const existingUser = await context.prisma.findOwnerByEmail(args.email)
    if (existingUser) {
      throw new GraphQLError('Owner already exists!',);
    }
    const hashedPassword = await bcrypt.hash(args.password, 10);
    data = await context.prisma.registerOwner({
      email: args.email,
      password: hashedPassword,
      username: faker.internet.username(),
      railwayApiKey: args.railwayApiKey
      
    })

  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error registering owner: ${err.message}`);
    throw new GraphQLError('Owner already exists!');
  }
  if(data == null){
    context.logger.error(`Unable to register owner!`);
    return null;
  }

  return data
};

export default registerOwnerResolver;
