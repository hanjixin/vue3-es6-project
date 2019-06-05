

## 简介

- 该项目提供了基于vue-cli3 创建的项目模板


## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[axios](https://github.com/axios/axios) 提前了解和学习这些知识会对使用本项目有很大的帮助


## 功能

```
- 登录 / 注销

- 路由拦截

- css 预处理 scss

- request Handle

- build clear 开发日志

- src/utils 常用工具

- 全局环境变量文件
  - .env.develop
  - .env.test
  - .env.production

- 多环境发布
  - dev test  prod

```

## 开发

```bash
# 克隆项目
git clone git@github.com:hanjixin/vue3-es6-project.git

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev || npm run start || npm run serve
```

浏览器访问 http://localhost:8080

## 发布

```bash
# 构建测试环境
npm run build:test

# 构建生产环境
npm run build
```

## 其它

```
commit auto fix eslint
```
