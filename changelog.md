       
*CURRENT*
---    

           
*0.0.3*
---    
- 2015-08-12 (吴建涛) 更新README.MD，增加了一个TODO.md  (28c90354ea42521d4ae36c4c2b83d0e902298d64)
- 2015-08-12 (吴建涛) 1. `gulp dev`任务运行正常 2. jade的错误输出正确  (f6cf0890abfbb0b911e6b19287c367051c2423a1)
- 2015-08-12 (吴建涛) 1. 更新了page任务的实现机制 2. 增加了jade支持  (b8776b5572949d336793af2bb1d920a951ea9b4b)
- 2015-08-11 (吴建涛) 更新ESLINTRC.   1. no-catch-shadow 会强迫你使用一种恶心的语法，而且这个规则的实现存在bug.   2. no-valid-this 在事件处理函数等这类需要后绑定context的地方，无法正常工作   3. prefer-const  无法跨文件判断一个变量是否是真的constant   4. valid-jsdoc   jsdoc的语法和yuidoc存在冲突  (257f1be26fb2fbf1ba6e97696476dd8c8018134c)
- 2015-08-11 (吴建涛) 1. 所有依赖升级到最新，貌似在IOJSv3.0上编译不过去； 2. 因为ES 6已经足够强大，不再支持coffee-scripts。未来可能考虑支持TypeScript 3. 因为最新版的ESLINT对于strict规则的改变，目前没有我想要的'use strict'规则，所有暂时禁用'use strict'检查。 4. 支持index.jsx文件作为页面入口脚本。  (b38acce6c9afb2ead195a8a61a6d806b15ea8123)
- 2015-08-03 (吴建涛) bugfix  (7226a8f57066b61b06c03bbd4a2f55920a00b06f)
           
*0.0.2*
---    
- 2015-07-24 (吴建涛) correct `version` in package.json and bower.json  (0944884944fa2f80927f54c1915f2382f174d2ca)
- 2015-07-24 (吴建涛) Update README，and delete unusefull bower dependencies.  (09b54d8022cfc61ff84c866c7f2c6d12e9fbe295)
- 2015-07-19 (吴建涛) 用非常肮脏的方式实现了新建页面，其中最大的问题是： 1. 嵌套ejs标签，很难维护，也很容易出错，gulp-ejs不支持定义delimiter 2. gulp中使用promise的方式没有理解透彻  (46ee854becb4dc48343298f7af3f771c1a5a7032)
- 2015-07-19 (吴建涛) 更新README  (69166d9f3f2afa96ef54ec45d1730a72c4baa55f)
- 2015-07-15 (吴建涛) 升级依赖  (a444089e9e48d7febe741d49f7ec67ee15c65d2c)
    