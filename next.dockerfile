FROM node:slim
ARG NODE_ENV=development
ENV NODE_ENV ${NODE_ENV}

# Add node_modules directory
WORKDIR /user/src/app

# Cache and Install dependencies
COPY --chown=node:node ./skillswipe/package.json ./
COPY --chown=node:node ./skillswipe/package-lock.json ./
RUN npm ci

# Add a work directory
WORKDIR /usr/src/app

# Copy app files
COPY --chown=node:node ./skillswipe/ ./

# Install dev run dependencies
RUN npm i -g nodemon

# Expose port
EXPOSE 3000
# Start the app
# CMD [ "npm", "run", "dev" ]
CMD [ -d "node_modules" ] && nodemon || npm ci && nodemon
USER node
