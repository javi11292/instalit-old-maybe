FROM node:alpine as build
WORKDIR /next
COPY package*.json ./
RUN --mount=type=cache,target=node_modules npm i && cp -r node_modules node_modules.cache
RUN rm -r node_modules && mv node_modules.cache node_modules
COPY . .
ARG SKIP_BUILD=""
RUN --mount=type=cache,target=.next if [ -z "$SKIP_BUILD" ] ; then npm run build && cp -r .next .next.cache ; fi
RUN if [ -z "$SKIP_BUILD" ] ; then rm -r .next && mv .next.cache .next ; fi

FROM node:alpine
WORKDIR /next
COPY --from=build /next ./

EXPOSE 3000

ENTRYPOINT ["node_modules/.bin/next", "start"]