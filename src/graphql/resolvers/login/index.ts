import { GraphQLError } from 'graphql';
import { Owner } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { Context } from '../../context';

const loginResolver = async (
  _: unknown,
  args: {email: string, password: string},
  context: Context
): Promise<Partial<Owner>> => {
  let data = {} as Owner | null;

  try {
    data = await context.prisma.findOwnerByEmail(args.email)

  } catch (e) {
    const err = e as Error;
    context.logger.error(`Error fetching user login data from railway graph: ${err.message}`);
    throw new GraphQLError('Server Error');
  }

  if(data == null) {
    context.logger.debug(`No existing user found for supplied email`);
    return data;
  }

  if (data?.password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(args.password, data.password as string, (err, res) => {
        if (err) {
          context.logger.debug(`Incorrect password! n attempts remaining`);
          resolve(null)
        }
        if (res) {
          resolve({
            id: data.id,
            email: data.email,
            username: data.username,
            firstName: 'insert firstname logic here',
            lastName: 'insert lastname logic here',
          })
        } else {
          resolve(null)
        }
      });
    });
  } else {
    return null;
  }
};

export default loginResolver;
