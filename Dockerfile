# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (no global installs needed, use local versions)
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:1.27.0-alpine

# Security updates
RUN apk update && apk upgrade --no-cache && \
    rm -rf /var/cache/apk/*

# Copy build artifacts and nginx config
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Set proper permissions (nginx user already exists in base image)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

# Build and run commands:
# docker build -t portfolio.ui .
# docker run -d -p 8090:8080 --name portfolio.ui portfolio.ui