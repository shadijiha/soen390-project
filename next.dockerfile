ARG NODE_ENV

FROM node:slim
# ENV NODE_ENV ${NODE_ENV}
# Add a work directory
WORKDIR /user/src/app
# Cache and Install dependencies
COPY ./skillswipe/package.json ./
COPY ./skillswipe/package-lock.json ./
RUN npm install
# Copy app files
COPY ./skillswipe/ ./
RUN npm run build
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "run", "dev" ]