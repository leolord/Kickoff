#基于WebPack的web项目模板
[![Build Status](https://travis-ci.org/leolord/Kickoff.svg)](https://travis-ci.org/leolord/Kickoff) 

本项目是基于WebPack编译的web项目模板，其中强制要求使用sass。而对于JS比较宽松，可以使用原生的JavaScript、ES6格式的JavaScript或者JSX。

## 目前支持的特性
* vue
* jsx
* es6
* coffee
* ejs
* jade
* uglify
* eslint
* sass
* less

## ES6与React
  目前已经全面支持es6， 如果需要支持react，需要配置jsx-loader，由于我的开发环境中很少有适合react的场景，所以暂时不增加配置。

## 关于那个恶心的`.eslintrc`文件
  `eslint`是目前功能最全面的js语法检查器，它支持茫茫多的检查规则。我们希望最大程度的利用`eslint`保证我们代码的规范性和可读性，所以我们几乎在`.eslintrc`文件中设置了所有检查规则。如果这些规则确实对你造成了困扰，建议配置成你习惯的检查[规则](http://eslint.org/docs/user-guide/configuring)。

## 目录结构约定

所有JavaScript和SCSS文件应当放在app目录中，每个页面对应app目录中的一个文件夹，其中index.js、index.coffee、index.vue，或者index.jsx是页面的入口脚本，index.sass/scss/less是页面样式的入口。

```
 ▾ app/
  ▾ {{pageName}}/             /*页面assets目录*/
      index.js                /*页面入口脚本*/
      index.scss              /*页面入口样式*/
 ▾ templates/                 /*页面html目录，我们建议使用jade模版*/
    {{pageName}}.jade         /*使用jade模板的页面文件*/
    {{pageName}}.ejs          /*使用ejs模板的页面文件*/
 ▸ assets/                    /* 图片、音频、视频等文件*/
 ▸ scripts/                   /*gulp各个任务的脚本和webpack的配置文件*/
 ▾ dist/                      /*assets编译输出目录，你不应手动修改其中任何文件*/
  {{pageName}}.html
  ▾ app
     {{pageName}}.{{contentHash}}.js    /*页面的入口脚本，通过内容哈希作为文件名后缀的方式保证新部署上去的页面能够马上生效*/
     {{pageName}}.{{contentHash}}.css
     common.{{contentHash}}.js          /*共享的脚本文件*/
     common.{{contentHash}}.css         /*共享的页面样式*/
  ▾ vendor                              /*需要异步加载的文件所在的目录*/
    1.js
    ...
  
```

## 开始

### 初始化项目目录
```
ProjectName=MyProject #项目名称＃
git clone https://github.com/leolord/Kickoff.git $ProjectName
cd $ProjectName
npm install
```
### 修改必要的字段
包括`package.json` 中项目名称、版本号、git仓库地址、关键字、作者的姓名和联系方式等

### 新建页面

使用以下命令，并根据提示输入页面的名称和类型

```shell
npm run page
```
该命令会 
 
1. 在templates目录下新建对应的模板文件  
2. 在app目录下新建对应的目录，并创建空白的`js`、`scss`等文件

### 编译

```shell
npm run build
```
### 开发

```
npm run dev
```

之后访问<http://127.0.0.1:3000/> 就可以看到结果了，生成的编译结果存在于<http://127.0.0.1:3000/dist/>目录中，其实你只关心这个目录就可以了。

### 清理dist目录
**注意** 每次build的时候，都会自动执行一次清理。

```shell
npm run clean
```


### Note:

1. WebPack很强大，可以引用NodeJS的部分包，不过最好不要用，因为体积真心不小
2. Webpack异步加载脚本是以当前页面所在的路径为根路径的，不同路径的页面引用相同的脚本，通常不会出问题；但是如果脚本异步加载了某些文件，`webpack`计算相对路径可能出错，如果遇到这样的问题，请将`lib/webpack.base.conf.js`文件中的`publicPath`设置为绝对路径

## Q&A
* 为什么从less转向sass？  
  1. 因为sass更强大。
  2. 统一的mixin库允许我们不使用autoprefixer，这样编译速度快一些。
  3. BootStrap转向sass了，我们当前业务中很多没有设计师参与的PC页面会用到。

* 为什么不使用postcss？  
  postcss是CSSer们的玩具，功能很强大，但是配置复杂，使用SASS已经完全可以满足我们的需求，暂时不考虑在生产环境中使用postcss。  

* 为什么放弃bower？  
  因为bower安装的包，不能够通过JavaScript直接引入，如果在页面内直接引入，也不容易处理版本、路径等问题。同时，大量的开源库已经支持npm安装，所以除非需要用到zepto这种对于CommonJS标准不太友好的东西，尽量不使用bower。  

* 为什么不在脚本后面增加类似`?ts=timestamp`这样的参数保证新部署的脚本/样式能够马上生效?  
  通过在URL后面增加`?t=timestamp`的方式，实现起来很简单，KickOff起初的版本确实也是这么做得。但是这样做可能造成一些弱智浏览器无法缓存脚本。  

* 为什么选择Jade这样和HTML的语法几乎完全不同的模板引擎作为首选？  
  原因有三：
  1. 起初这个项目优先使用EJS模板，但是之后发现EJS模板中JS和HTML代码耦合太严重，而且HTML本身的语法很臃肿，也很混乱，所以选择了更加干净的Jade引擎。
  2. 我习惯使用vim+Syntastic，为了语法高亮，我必须将EJS的文件格式设置为`html`，但是这个时候，Syntastic会爆出一堆没有用的错误信息，让人看上去很烦，同时语法高亮也不尽如人意。
  3. Jade的语法要比ejs强大，当然副作用是编译出来的结果文件(JavaScript文件)稍微大一些。
  4. Jade会默认转义变量、检查变量是否存在，这样安全性更高。

## Change Log

### 1.0.0
* 使用express + webpack-dev-middleware 作为测试服务器，有更大的灵活性，可以方便得mock接口。
* 在入口脚本中需要require入口的样式文件，这样有利于模块化，同时借助于`extract-text-webpack-plugin`，大大简化了构建脚本的逻辑。
* 完全剔除gulp，因为功能上gulp和webpack有太大的重合，剔除gulp之后构建脚本更加精简，便于配置。
* 暂时剔除webpack的hotmodule reload，因为发现用处不大，只是看着酷炫而已。作为一个有些工作经验的前端工作者，盲写样式并没有多大难度。
* 暂时不对karma做深入配置，因为平时做的页面逻辑过于简单，没有单元测试的余地。
* 恢复了对ejs模板和lesscss的支持
* 完全支持vue，别问我，我也不知道怎么想的。
