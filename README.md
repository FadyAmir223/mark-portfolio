### deps
- node 18.18.1
- npm 10.8.1
- docker 26.1.2


### init
```sh
# user:group for database
echo "export MY_UID=$(id -u)" >> ~/.bashrc
echo "export MY_GID=$(id -g)" >> ~/.bashrc

reboot

npm i -g dotenv-cli
```


### build image
```sh
# open db
docker compose -f docker-compose.prod.yml up -d db-prod

# reset (new volume)
dotenv -e .env.production.local -- npx prisma migrate reset dev
# or: seed db
dotenv -e .env.production.local -- npx prisma db seed

# build image
npm run docker:prod:build
```


### compose `OR` swarm
```sh
# compose (recommended (1 node only))
docker compose -f docker-compose.prod.yml up -d

# swarm
docker swarm init
docker network create --ingress --driver overlay ingress

npm run docker:prod:up
```

## Disclosures
it's recommended to use a dedicated content platform for video because video files are large and can lead to excessive bandwidth usage
