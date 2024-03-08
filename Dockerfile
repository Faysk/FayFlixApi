# Use uma imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e o arquivo package-lock.json, se disponível, para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta que o aplicativo usará
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD [ "node", "app.js" ]
