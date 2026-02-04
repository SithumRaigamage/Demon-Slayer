# ================================
# Demon Slayer Website - Dockerfile
# ================================
# A lightweight container to serve the static website using Nginx

FROM nginx:alpine

# Labels for metadata
LABEL maintainer="SithumRaigamage"
LABEL description="Demon Slayer Fan Website"
LABEL version="1.0.0"

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy website files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY Js/ /usr/share/nginx/html/Js/
COPY Styles/ /usr/share/nginx/html/Styles/
COPY Pictures/ /usr/share/nginx/html/Pictures/

# Copy media files
COPY Demon-Slayer.mp3 /usr/share/nginx/html/
COPY dsvid.mov /usr/share/nginx/html/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
