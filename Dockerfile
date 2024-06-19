# Stage 1: Build the React app with Vite
FROM node:18-alpine AS development

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Copy SSL certificates into the container
COPY localhost.crt ./
COPY localhost.key ./

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
