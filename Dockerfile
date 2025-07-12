# Start from a lightweight, official Nginx image
FROM nginx:1.25-alpine

# Remove the default Nginx welcome page
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy our HTML, CSS, and JS files
COPY html/ /usr/share/nginx/html/
