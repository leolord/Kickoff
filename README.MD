#基于WebPack的web项目模板

本项目是基于WebPack编译的web项目模板，其中强制要求使用lesscss。而对于JS比较宽松，可以使用原生的JavaScript或者CoffeeScript。

## 目前支持的功能

* coffee
* less
* autoprefix
* uglify
* eslint
* cleancss

## ES6与React
  目前已经全面支持es6和react，不过为了尽量缩短编译时间，es6的文件必须命名为`*.es6.js`，React的用到jsx语法的文件必须命名为`*.jsx`。ES 6特性的支持是由`bebel`提供的，默认设置的是最大可能的支持新的语法特性。

## 关于那个恶心的`.eslintrc`文件
  `eslint`是目前功能最全面的js语法检查器，它支持茫茫多的检查规则。我们希望最大程度的利用`eslint`保证我们代码的规范性和可读性，所以我们几乎在`.eslintrc`文件中设置了所有检查规则。如果这些规则确实对你造成了困扰，建议通过[inline](http://eslint.org/docs/user-guide/configuring)的方式配置单个文件的语法检查规则。直接修改全局的`.eslintrc`文件其实是降低了对于自己代码的要求。

## 目录结构约定

所有JavaScript和Less文件应当放在app目录中，每个页面对应app目录中的一个文件夹，其中index.js、index.es6.js，或者index.coffee是页面的入口脚本，index.less是页面样式的入口，我们不考虑支持用原生css编写页面样式，因为原生css不利于模块化开发。

```
 ▾ app/
  ▾ {{pageName}}/             /*页面assets目录*/
      index.js                /*页面入口脚本*/
      index.less              /*页面入口样式*/
 ▾ template/                  /*页面html目录，我们强制要求使用ejs模版(合格的程序员，应该避免任何形式的代码重复)*/
    {{pageName}}.ejs          /*页面文件*/
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

1. `package.json` 中项目名称、版本号、git仓库地址、关键字、作者的姓名和联系方式
2. `bower.json` 中项目名称、关键字、项目介绍、版本号
3. 如果你用bower安装了其他的包，最好在`scripts/webpack/alias.json`中配置下，这样在页面中引用模块就会更方便

### 新建页面

使用以下命令，并根据提示输入页面的名称和类型

```shell
gulp page
```
该命令会 
 
1. 在template目录下新建对应的`EJS`文件  
2. 在app目录下新建对应的目录，并创建空白的`js`和`less`文件

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
* 为什么不支持sass？  
  因为less简单，sass必须安装ruby等工具，而在天朝，这一点可能会拦住很多初学者；less只需要NodeJS环境就可以了。虽然我认可sass比less强大，但是我同样认为安装ruby等一堆工具划不来。

* 为什么不放弃bower，转投npm?  
  根据大牛们的说法，bower有种种缺陷，而如果使用npm的话，能够得到的好处至少有： 
  1. npm的API比bower稳定； 
  2. 对于CommonJS语法有天然的支持，不需要再单独配置依赖库的路径，也不需要require相对路径； 
  3. npm下载的包更小。  
  
  对于我们而言，我们依旧不会彻底放弃bower，因为通过bower下载完整的git仓库（接近完整）可以保证两点：
  
    1. 对于Less Mixin这样的类库，可以有很好的支持； 
    2. npm下载的文件比较少，我们担心如果我们只是依赖一个库中的一个源文件，npm会下载编译完成的完整的包，导致我们最终打包出来的文件太大。

* 为什么不在脚本后面增加类似`?ts=timestamp`这样的参数保证脚本/样式能够马上生效?  
  通过在URL后面增加`?t=timestamp`的方式，可能造成一些浏览器无法缓存脚本。
