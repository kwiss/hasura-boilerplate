# hasura boilerplate app
hasura boilerplate app with koa knex objection passport jwt

```
# Clone the repo
git clone https://github.com/kwiss/hasura-node-starter

# Change directory
cd hasura-node-knex

# Install NPM dependencies
yarn

# Create your own .env file with given .env.sample

# you sample keys or generate the RSA keys
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout > public.pem

# start docker with postgres and hasura

docker-compose up

# Then simply start your app
yarn dev

# Apply migrations
# (Note) this step creates tables "users", "roles" and "user_roles" in the database
yarn workspace knex migrate:latest
```