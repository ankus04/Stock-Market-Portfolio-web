# Dockerfile for Frontend
# Multi-stage build: Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

# Fix permissions for node binaries
RUN chmod +x node_modules/.bin/*

COPY . .
RUN npm run build

# Production stage: Serve with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]