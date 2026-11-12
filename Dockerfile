# Use official Node.js runtime as a parent image (Alpine is lightweight)
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json first to leverage Docker cache
COPY backend/package*.json ./backend/

# Install only production dependencies
RUN cd backend && npm ci --only=production

# Copy the entire project directory into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the Node.js application
CMD ["node", "backend/server.js"]
