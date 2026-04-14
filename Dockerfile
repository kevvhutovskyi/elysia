# Use the official Ubuntu base image
FROM ubuntu:latest

# Set environment variables
ENV NODE_ENV=production

# Install necessary packages
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Set Bun to PATH
ENV PATH="/root/.bun/bin:$PATH"

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "src/index.ts"]