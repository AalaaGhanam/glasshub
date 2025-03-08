FROM node:18
RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN mkdir -p /app/uploads
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

EXPOSE 3000
CMD ["/wait-for-db.sh"]