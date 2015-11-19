#基于WebPack的web项目模板

本项目是基于WebPack编译的web项目模板，其中强制要求使用sass。而对于JS比较宽松，可以使用原生的JavaScript、ES6格式的JavaScript或者JSX。

## 目前支持的特性
* jsx
* es6
* ejs
* jade
* uglify
* eslint
* sass
* cleancss
* minify-html

## ES6与React
  目前已经全面支持es6和react，不过为了尽量缩短编译时间，es6的文件必须命名为`*.es6.js`，React的用到jsx语法的文件必须命名为`*.jsx`。ES 6和JSX的语法支持是由`bebel`提供的，默认设置的是最大可能的支持新的语法特性，也就是说最新的ES 7中的部分语法也可以尝试使用。

## 关于那个恶心的`.eslintrc`文件
  `eslint`是目前功能最全面的js语法检查器，它支持茫茫多的检查规则。我们希望最大程度的利用`eslint`保证我们代码的规范性和可读性，所以我们几乎在`.eslintrc`文件中设置了所有检查规则。如果这些规则确实对你造成了困扰，建议通过[inline](http://eslint.org/docs/user-guide/configuring)的方式配置单个文件的语法检查规则。直接修改全局的`.eslintrc`文件其实是降低了对于自己代码的要求。

## 目录结构约定

所有JavaScript和SCSS文件应当放在app目录中，每个页面对应app目录中的一个文件夹，其中index.js、index.es6.js，或者index.jsx是页面的入口脚本，index.sass/scss是页面样式的入口，我们不考虑支持用原生css编写页面样式，因为原生css不利于模块化开发。

```
 ▾ app/
  ▾ {{pageName}}/             /*页面assets目录*/
      index.js                /*页面入口脚本*/
      index.scss              /*页面入口样式*/
 ▾ template/                  /*页面html目录，我们强制建议使用jade模版(合格的程序员，应该避免任何形式的代码重复)*/
    {{pageName}}.jade         /*使用jade模板的页面文件*/
    {{pageName}}.ejs          /*使用ejs模板的页面文件*/
 ▸ img/                       /*图片文件夹，这个文件夹的名称不做约束，不过需要在package.json中配置这些需要拷贝到dist根目录下的文件的glob*/
 ▸ scripts/                   /*gulp各个任务的脚本和webpack的配置文件*/
 ▾ dist/                      /*assets编译输出目录，你不应手动修改其中任何文件*/
  {{pageName}}.html
  ▾ {{pageName}}
     index.1435971510804.js    /*页面的入口脚本，我们通过时间戳方式保证新部署上去的页面能够马上生效*/
     index.1435971510804.js.map/*仅在开发环境中才会生成map文件*/
     index.1435971510804.css
  ▾ vendor                    /*需要异步加载的文件所在的目录*/
    1.js
    ...
   commons.chunk.js           /*通用脚本文件所在的目录，所有页面中都需要引入*/
   commons.chunk.js.map       /*仅在开发环境中才会生成map文件*/
  
```

## 开始

### 初始化项目目录
```
ProjectName=MyProject #项目名称＃
git clone https://github.com/leolord/Kickoff.git $ProjectName
cd $ProjectName
npm install
bower install
```
### 修改必要的字段
包括：

1. `package.json` 中项目名称、版本号、git仓库地址、关键字、作者的姓名和联系方式等
2. `bower.json` 中项目名称、关键字、项目介绍、版本号
3. 如果你用bower安装了其他的包，最好在`scripts/webpack/alias.json`中配置下，这样在页面中引用模块就会更方便

### 新建页面

使用以下命令，并根据提示输入页面的名称和类型

```shell
gulp page
```
该命令会 
 
1. 在template目录下新建对应的`EJS`文件  
2. 在app目录下新建对应的目录，并创建空白的`js`和`scss`文件

### 引入全局脚本/样式

某些情况下，我们希望全站都引用同一份全局的脚本/样式，这样这个脚本/样式可以被浏览器缓存，有利于提高网站性能。此时，应当在`package.json`中的`path/globalLibs`配置这些全局文件的路径，编译的时候，这些全局文件会被拷贝到`dist/vendor`目录中。同时也请在模板文件中，在页面脚本加载之前引入这些全局文件，以确保全局脚本可以在正确的时间注册全局变量。

### 编译

```shell
gulp build
```
或者

```shell
gulp
```

### 开发

```
gulp dev
```

之后访问<http://127.0.0.1:8080/> 就可以看到结果了，生成的编译结果存在于<http://127.0.0.1:8080/dist/>目录中，其实你只关心这个目录就可以了。这个命令实质上调用了`webpack-dev-server`。

### 清理dist目录
**注意** 每次执行gulp/gulp dev/gulp build命令的时候，都会自动执行一次gulp clean命令。

```shell
gulp clean
```


### Note:

1. WebPack很强大，可以引用NodeJS的部分包，不过最好不要用，因为体积真心不小
2. 在`scripts/webpack/alias.json`中配置alias的时候，不要使用大写字母，否则在Linux下可能无法正确的解析依赖包的路径
3. Webpack异步加载脚本是以当前页面所在的路径为根路径的，不同路径的页面引用相同的脚本，通常不会出问题；但是如果脚本异步加载了某些文件，`webpack`计算相对路径可能出错，如果遇到这样的问题，请将`scripts/webpack/webpack-config.generator.js`文件中`configEntry`函数设置的`publicPath`设置为绝对路径

## Q&A
* 为什么放弃less，转向sass？  
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
  2. 我习惯使用vim+Syntastic，为了语法高亮，我必须将EJS的文件格式设置为`html`，但是这个时候，Syntastic会爆出一堆没有用的错误信息，让人看上去很烦，同事语法高亮也不尽如人意。
  3. Jade的语法要比ejs强大，当然副作用是编译出来的结果文件(JavaScript文件)稍微大一些。
  4. Jade会默认转义变量、检查变量是否存在，这样安全性更高。
