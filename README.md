## on server

### init
```sh
# user:group for database
echo "export MY_UID=$(id -u)" >> ~/.bashrc
echo "export MY_GID=$(id -g)" >> ~/.bashrc

reboot

npm i -g dotenv-cli
```


### build
```sh
# open db
docker compose -f docker-compose.prod.yml up -d db-prod

# reset (new)
dotenv -e .env.production.local -- npx prisma migrate reset dev
# or: seed db
dotenv -e .env.production.local -- npx prisma db seed

# build image
npm run docker:prod:build
```


### compose `OR` swarm
```sh
# compose
docker compose -f docker-compose.prod.yml up -d

# swarm
docker swarm init
docker network create --ingress --driver overlay ingress

npm run docker:prod:up
```


### TODO
- move fractional indexing to the server (heavy deps)
- project pagination
- traefik config
