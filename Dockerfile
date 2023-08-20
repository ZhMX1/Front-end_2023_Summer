# Stage 0 - the build process for vue2
FROM node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
RUN npm run build

# Stage 1 - the production environment: copy /dist and ngixn configuration
FROM nginx
COPY --from=0 /app/dist /usr/share/nginx/html
COPY --from=0 /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/server.cer /etc/nginx/ssl/server.cer
COPY --from=0 /app/server.key /etc/nginx/ssl/server.key

# Expose port 80 and 443
EXPOSE 80
EXPOSE 443