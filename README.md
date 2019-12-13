# 1. 开发环境需求
**NodeJS：** v8.9.0+  
**NPM：** 5.5.1+  
**PM2：** 2.7.2+  
**Gulp：** 3.9.1+  
**IDE：** IntelliJ WebStorm  
**Git：** Github Desktop  

# 2. 编译构建  

## 2.1 编译环境  
```
npm i cnpm -g
cnpm i  
cnpm install gulp -g  
cnpm install pm2 -g  
```

## 2.2 生产环境  
```
npm i cnpm -g
cnpm i --production
cnpm install pm2 -g  
```

## 2.3 开发环境编译  
```
#编译
gulp
#清理
gulp clean

```

## 2.4 测试环境编译  
```
gulp -p
```

# 3. 启动项目  

## 3.1 开发环境  
```
cnpm run debug
```

## 3.2 测试/准生产环境  
```
cnpm run test
```

## 3.3 生产环境  
```
cnpm run start
```

# 4. 访问
```
http://localhost:4000
```