 # 简易版UI组件
 
 [![Build Status](https://travis-ci.org/MrJ5678/vue-ui-primary.svg?branch=main)](https://travis-ci.org/MrJ5678/vue-ui-primary)

作者: hhhhhq
  
## 介绍

此框架作用之一是学习了解vue。
  
## 开始使用
  
1. 添加css样式
  
    使用本框架，默认使用border-box
      
     ````
     * { box-sizing: border-box }, *::before { box-sizing: border-box }, *::after { box-sizing: border-box }
     ````
    另 还需要设置默认颜色等变量, 后面会改进
    ````
    :root {
      --button-height: 32px;
      --font-size: 14px;
      --button-bg: #fff;
      --button-activebg: #eee;
      --border-radius: 4px;
      --color: #333;
      --border-color: #999;
      --border-color-hover: #666;
    }
    ````
2. 安装
    ````
   npm i --save vue-ui-primary-1
   ````
3. 引入
    ````
   import { Button } from 'vue-ui-primary-1'
   import 'vue-ui-primary-1/dist/index.css'
   
   export default {
     ...
     components: {
       'g-button': Button
     }
   }
   ````
4. 引入 svg 图标
   ````
   <script src="//at.alicdn.com/t/font_2146072_1zleacjbviu.js"></script>
   ````

## 文档

## 提问

## 变更记录

## 联系方式

## 贡献代码
