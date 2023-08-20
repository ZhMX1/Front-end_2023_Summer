Language: 中文 | [English](README_EN.md)

# HMS物业管理系统前端

[![vue2.0](https://img.shields.io/badge/vue-2.0-brightgreen)](https://cn.vuejs.org/) [![vue-cli4.5.13](https://img.shields.io/badge/vue--cli-4.5.13-blue)](https://cli.vuejs.org/)

本项目使用 MIT license。

> 北航2020级大三暑期实践项目 
[后端仓库指路](https://git.code.tencent.com/8c49d71dc01e57667266b1bd940a74d6/e83eb69fc5caaeab6691bb17c53300a3/backend)


## 项目介绍


## 如何安装本项目


## 运行方式

安装依赖

```
npm install
```

本地前端运行

```
npm run serve
```

本地前端构建

```
npm run build
```

## 部署方案

### 手动在服务器上部署

根据 `Dockerfile` 构建镜像

```bash
sudo docker build -t frontend-image .
```


根据镜像启动容器

```bash
sudo docker run -itd -p 443:443 --name frontend-container frontend-image
```


启动容器

```bash
sudo docker start frontend-container
```

停止容器

```bash
sudo docker stop frontend-container
```

删除容器

```bash
sudo docker rm frontend-container 
```

### 使用脚本触发部署

本地提供了一个 `deploy.sh` 脚本, 通过触发服务器上的脚本拉取最新代码并重新构建镜像，然后重启容器。(需要提前配置好与服务器的ssh连接, 如使用密钥登录)

```bash
bash deploy.sh
```