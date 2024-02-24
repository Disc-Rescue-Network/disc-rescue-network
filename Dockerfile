
# Stage 1: Build the React application
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of your app's source code
COPY . .

# Build app
RUN yarn run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access it from the outside.
EXPOSE 80

# The command to run Nginx in foreground so Docker can track it as the main process
CMD ["nginx", "-g", "daemon off;"]
