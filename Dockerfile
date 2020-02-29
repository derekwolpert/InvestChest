FROM node:10-alpine as frontend

WORKDIR /app
COPY /frontend/package*.json ./
RUN npm install
COPY /frontend ./
RUN npm run build

FROM node:10-alpine

WORKDIR /app

COPY --from=frontend /app/dist ./frontend/dist
COPY --from=frontend /app/public ./frontend/public

COPY package*.json  ./
RUN npm install
COPY /config ./config
COPY /models ./models
COPY /routes ./routes
COPY /validation ./validation
COPY app.js ./

ENV PORT 3000
ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]