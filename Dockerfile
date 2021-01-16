# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:15.5-alpine AS builder
# Set working directory
WORKDIR /app
# Copy the package listings
COPY package.json .
COPY yarn.lock .
# Install node modules
RUN yarn install
# Copy all files from current directory to working dir in image
COPY public public
COPY src src
COPY tsconfig.json .
# Build assets
RUN yarn build

# nginx state for serving content
FROM nginx:alpine
# React with frontend routing needs a nginx config
COPY ./config/nginx/default.conf /etc/nginx/conf.d/default.conf
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]