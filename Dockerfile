FROM node
COPY dist /opt/app/
COPY .npmrc /root/
WORKDIR /opt/app/
RUN npm i --production