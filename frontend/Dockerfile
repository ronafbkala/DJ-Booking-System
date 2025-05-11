#FROM node:18 AS build
#WORKDIR /app
#COPY . .
#ENV REACT_APP_API_BASE_URL=http://backend:8080
#RUN npm install
#RUN npm run build
#RUN npm install -g serve
#CMD ["serve", "-s", "build"]



# build stage
FROM node:18 AS build
WORKDIR /app


ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

COPY . .
RUN npm install
RUN npm run build

# production stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

