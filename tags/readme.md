
css 烦 花括号不愿打？
{
    key：value；
}
css 编译 stylus

- stylus 是css预编译
    用stylus 语法来写css快多了，还有其他一些高级功能
    写的是.stylus文件，浏览器要的是css
- stylus common.styl -o common.css   转化文件为.css
- stylus -w common.styl -o common.css  实时编译

- 界面第一步是写结构， 最重要的
 1. 脱离分析标签表面的低级趣味 从内到外
 2.  盒子模型 从外到内 
 main.container>ul.tag-list>li.item>div.tag>.info-box+.action-box
 3. 写机构 不要去管css 
 4. 语义化，用合适的标签

