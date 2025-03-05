# Railway backend build

> Hacked together for a railway interview.

Pretty typical node server setup with express and apollo-server for graphql requests. Started on tests initially but too much time, prisma for DB for speed. Requests to railway authenticated via x-hacky-id(I know) header, which grabs a user from the DB and uses their apikey to make requests. In my defense, I put up a spending limit of 10 on my railway account. Otherwise exposes a graph for the frontend to make requests to, and uses graphql-request package to make requests to railway. Server has internal user in the DB which is postgres, alongside the "owner"(user) type coming from Railway. Could've held more data in my own DB instead of pinging railway every time, and was thinking around playing with the idea of one railway-backend being linked to multiple railway users (personal account, work account) for easy switching, but just ran out of time.
