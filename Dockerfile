FROM ubuntu:latest
LABEL authors="gigasora"

ENTRYPOINT ["top", "-b"]

#build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Production stage
FROM nginx:stable-alpine as product-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]