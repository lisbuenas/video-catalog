#FROM node:alpine

#WORKDIR '/app'

#COPY package.json .
#RUN npm install
#COPY . .
#CMD ["npm", "start"]


# Imagem de Origem
FROM node:alpine
# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /app
# Adicionando `/app/node_modules/.bin` para o $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Instalando dependências da aplicação e armazenando em cache.
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.3.1 -g --silent
# start app
CMD ["npm", "start"]
#CMD ["yarn", "run", "serve"]