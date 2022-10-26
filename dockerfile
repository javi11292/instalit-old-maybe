FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG SKIP_BUILD=""
RUN if [ -z "$SKIP_BUILD" ] ; then npm run next:build ; fi

FROM node:alpine
WORKDIR /app
COPY --from=build /app ./

EXPOSE 3000

ENTRYPOINT ["npm", "run", "next:start"]