# react
FROM node:22-alpine AS build

WORKDIR /app
COPY . .

RUN apk update && apk upgrade --no-cache

RUN npm install -g npm@latest
RUN npm install -g vite@latest
RUN npm install

RUN npm run build

# ...

FROM nginx:1.27.0-alpine

RUN apk update && apk upgrade --no-cache

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build "/app/nginx.conf" "/etc/nginx/conf.d/default.conf"

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

# docker build -t portfolio.ui .
# docker run -d -p 8090:8080 --name portfolio.ui portfolio.ui