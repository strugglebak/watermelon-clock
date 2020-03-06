# watermelon-clock

> 这是一个🍉闹钟，可以随时用来记录你的个人计划和生活琐事哦~

## 主要技术栈

- React 16.12
- antd 4.0.1
- axios 库
- react-redux 7.1.3
- redux 4.0.5
- typescript 3.7.2
- history 4.10.1
- lodash 4.14

## 安装

### 使用 yarn

```bash
yarn add -D
```

### 使用 npm

```bash
npm i -D
```

由于是使用 `create-react-app` 生成的项目，在运行命令之前可参考 `package.json` 中的 `scripts` 选项

```json
"scripts": {
  "predeploy": "yarn build",
  "deploy": "npx gh-pages -d build",
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
}
```

### 项目运行

```bash
yarn start
```

### 项目 build

```bash
yarn build
```

### 项目打包和部署

```bash
yarn run deploy
```

## 协议

MIT
