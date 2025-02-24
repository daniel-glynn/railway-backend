// import { ApolloError } from 'apollo-server-express';
// import type { PostgresNotification } from '@/interfaces';
// import type { Context } from '@/graphql/context';
// import type {
//   Notification,
//   Resolvers,
//   UserNotificationArgs,
// } from '@/graphql/types';
// import { mapWebNotificationFromPostgresToGraphql } from '@/graphql/helpers/mappers';

// import { hasPermission } from '@/graphql/auth/has-permission';
// import { permissionReadNotifications } from '@/constants';
// import { applyWebNotificationTranslations } from '@/graphql/helpers';

// const resolver = async (
//   _: unknown,
//   args: UserNotificationArgs,
//   context: Context
// ): Promise<Notification> => {
//   hasPermission(context, permissionReadNotifications);
//   let data = {} as PostgresNotification | null;

//   try {
//     data = await context.postgres.getWebNotification(
//       args.notificationId,
//       context.tenantGuid,
//       context.userGid
//     );
//   } catch (e) {
//     const err = e as Error;
//     context.logger.error(`Error fetching web notification: ${err.message}`);
//     throw new ApolloError('Server Error');
//   }

//   if (data === null) {
//     return <Notification>{};
//   }

//   return mapWebNotificationFromPostgresToGraphql(
//     applyWebNotificationTranslations(data, args.locale)
//   );
// };

// const notificationResolver: Resolvers = {
//   Query: {
//     notification: resolver,
//   },
//   User: {
//     notification: resolver,
//   },
// };

// export default notificationResolver;
