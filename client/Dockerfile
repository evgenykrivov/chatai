FROM node:20-alpine as build

COPY package.json package.json

RUN npm install

COPY . .

ARG VITE_API_URL
ARG VITE_API_TOKEN

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_TOKEN=$VITE_API_TOKEN

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]