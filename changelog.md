       
*CURRENT*
---    
- 2015-09-06 (吴建涛) 彻底抛弃ejs和less，用compass-mixins代替autoprefixer  (d2362388fbfb075a5aeb53da41301a735ba5e794)
- 2015-08-31 (吴建涛) 更新changelog  (c309172e52ed7cf43e7aa1cd3c1918279113bcf8)
- 2015-08-26 (吴建涛) Add Default Font Configuration for Mobile Page.  (f4d9331b5fa36349e15693f86cf2ddcb195ba926)
- 2015-08-24 (吴建涛) fixbugs:   Sometimes html files cannot include the right file, after building.  (29bc0b3edee1642c5cb395c92de800953aedf522)
- 2015-08-20 (吴建涛) 更新gitignore  (664231bc9d2d7c7e0a9bdb7b6f6271756ccef743)
- 2015-08-18 (吴建涛) optimize  (63ab933d0012052212fc139555f5ef7c17830a77)
- 2015-08-18 (吴建涛) 1. 更新eslint配置，更好的支持React 2. 常使用React+Reflux写了一个页面，相信我你绝不会愿意在移动端使用这样的配置  (b7f6dcfe657be4b9dd2d222a68bd6b743a0232bc)
- 2015-08-16 (吴建涛) bugfix  (25e6afaecd7ca9c7268deee4c852975398f2ec46)
- 2015-08-16 (吴建涛) 1. 恢复merge的时候，丢失的提交。 2. 更新TODO.md  (4360f40b52e3d25529c29fa38fc1f331cd195f92)
           
*0.0.4*
---    
- 2015-08-16 (吴建涛) 1. 彻底放弃用时间戳作为缓存参数，换为文件哈希 2. 优化打包效率，完善webpack配置  (d0eef727382cfde2bae2eef94db88598931cf77a)
- 2015-08-13 (吴建涛) 为低版本IE浏览器添加html5/es5支持  (64143b7fd47647bbcaf34a9d06a53226efb8234d)
- 2015-08-13 (吴建涛) 1. 目前使用用户的GIT配置作为生成页面的作者  (919a2e2f09a1e134ff1cf5fb5e3bab4cc22021a1)
- 2015-08-12 (吴建涛) 添加chengelog  (0c1f30fb62dcd841f6602b6159ee232344766186)
           
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
    