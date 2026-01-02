# Build stage
FROM node:18-alpine as builder
ENV NODE_OPTIONS=--max_old_space_size=4096
WORKDIR '/app'
# Install git
RUN apk update && apk add --no-cache git
COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# Production stage
FROM nginx
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
