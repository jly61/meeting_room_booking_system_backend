# 分两阶段是为了使用第一阶段dist，减少第二阶段容器大小

FROM  node:18.0-alpine3.14 as build-stage

# 指定指令工作目录，可设置多次
WORKDIR /app

# 复制到容器
COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

# 把其余文件复制到容器
COPY . .

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]


