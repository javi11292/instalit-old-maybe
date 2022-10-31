FROM node:alpine as build
WORKDIR /next
COPY package*.json ./
RUN npm ci
COPY . .
ARG SKIP_BUILD=""
RUN if [ -z "$SKIP_BUILD" ] ; then npm run next:build ; fi

FROM node:alpine
WORKDIR /next
COPY --from=build /next ./

EXPOSE 3000

ENTRYPOINT ["npm", "run", "next:start"]