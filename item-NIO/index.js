const lineList = document.querySelectorAll('.list');  //获取 导航栏下拉框li标签DOM  是一个数组
const spanLine = document.querySelectorAll('.sp');  //获取 导航栏下拉框li标签下span标签DOM  是一个数组
const jsOption = document.querySelectorAll('.option');//获取导航栏li标签DOM
const jsI = document.querySelectorAll('.i');  //获取  箭头小标
const jsDropdown = document.querySelectorAll('.dropdown-box');  //获取下拉框
//用数组循环来把触发了导航栏li标签，把下标传给li标签下箭头小标和下拉框还有underline
for (let i = 0; i < jsOption.length; i++) {
    // 触发事件
    jsOption[i].addEventListener('mouseover', () => {
        jsI[i].classList.add('up');
        jsDropdown[i].classList.add('show')
        jsOption[i].classList.add('underline')
    })
    //触发离开事件
    jsOption[i].addEventListener('mouseout', () => {
        jsI[i].classList.remove('up')
        jsDropdown[i].classList.remove('show')
        jsOption[i].classList.remove('underline')
    })
}
//用数组循环来把触发了导航栏下拉框li标签，把下标传给li标签下span数组
for (let j = 0; j < lineList.length; j++) {
    lineList[j].addEventListener('mouseover', () => {
        spanLine[j].classList.add('spanline')
    })
    lineList[j].addEventListener('mouseout', () => {
        spanLine[j].classList.remove('spanline')
    })
}
//轮播图js部分
/*获取HTML中的对象*/
var parent = document.getElementById("parent");
var img_ul = document.getElementById("img_ul");
var litCir_ul = document.getElementById("litCir_ul");
// var buttons = document.getElementById("buttons");
var cLis =litCir_ul.children;         //children 属性返回元素的子元素的集合
//定义一些变量
var len = img_ul.children.length;     //图片张数
var width = parent.offsetWidth;       //每张图片的宽度
var rate = 50;                        //一张图片的切换速度， 单位为px
var times = 1;                        //切换速度的倍率
var gap = 2000;                       //自动切换间隙， 单位为毫秒
var timer = null;                     //初始化一个定时器
var picN = 0;                         //当前显示的图片下标
var cirN = 0;                         //当前显示图片的小圆点下标
var temp;

//添加小圆点，之所用js添加小圆点，是因为小圆点的数量是由图片张数决定的。
for(let i = 0; i < len;i++){
var a_li = document.createElement('li');//创建li元素节点
a_li.className = 'quiet';//给li添加类名active
litCir_ul.appendChild(a_li);
}
litCir_ul.children[0].className = 'active';
//通过传进来的distance来控制img_ul的位置来显示      //设置img_ul的left该如何变化，以达到图片轮播的
function Roll(distance){                                         //参数distance：滚动的目标点（必为图片宽度的倍数）
    clearInterval(img_ul.timer);                                     //每次运行该函数必须清除之前的定时器！
    var speed = img_ul.offsetLeft < distance ?  rate : (0-rate);     //判断图片移动的方向  此处用了三元运算符  ？ 前面的不等式成立时为rate,不成立时为0-rete

    img_ul.timer = setInterval(function(){                           //设置定时器，每隔10毫秒，调用一次该匿名函数
        img_ul.style.left = img_ul.offsetLeft + speed + "px";        //每一次调用滚动到的地方 (速度为 speed px/10 ms)       offsetLeft为元素边框外侧到父元素边框内侧的距离    
        var leave = distance - img_ul.offsetLeft;                    //距目标点剩余的px值      
        /*接近目标点时的处理，滚动接近目标时直接到达， 避免rate值设置不当时不能完整显示图片*/
        // Math.abs()  abs() 方法可返回一个数的绝对值
        if (Math.abs(leave) <= Math.abs(speed)) {                    
            clearInterval(img_ul.timer);
            img_ul.style.left = distance + "px";
        }
    },10);
    }
//当图片从最后一张切换到第一张时，这时就不能通过逐渐改变img_ul的left值来实现滚动的效果，于是克隆第一张图片至列表尾部，当滚动完最后一张图片时，继续滚动到克隆的第一张，然后将img_ul的left值置为0。
    img_ul.appendChild(img_ul.children[0].cloneNode(true));//克隆第一张图片至列表尾部
    //自动轮播
    function autoRun(){
        picN++
        cirN++
        //如果轮播完克隆项因该轮播回第二张照片上，因为克隆项和第一张图片一样
        if(picN > len) {
            img_ul.style.left = 0;//改变left至真正的第一项处，这个过程是时间太快太短所以可以忽略不计然后立刻
            picN = 1;   //从第二张开始显示
        }
        // 自动轮播，当图片为第一张时应该自动到第二张上去，所以要传入第二张的picN值，以次类推
        Roll(-picN*width)
        //判断是否到了最后一个圆点，当圆点到了最后一个时，应该变回第一个点进行轮播
        if (cirN > len - 1) {
            cirN = 0;
        }
        for(var i = 0; i < len;i++) {
            cLis[i].className = 'quiet';//让所有圆点背景色变为默认色
        }
        cLis[cirN].className = 'active';
    }
    //注意：以上轮播图片时是当图片索引值picN已经有了，要+1，等待一定时间执行移动到下一张图片的事件
    // 开始自动滚动：
    timer = setInterval(autoRun, gap); //定时器

    //
    for(let j = 0;j < len ;j++){
        cLis[j].index = j;//给每个圆点一个索引值
        cLis[j].onmouseover = function() {
            for(var k = 0; k < len;k++) {
                cLis[k].className = 'quiet';//让所有圆点背景色变为默认色
            }
            this.className = 'active';
            temp = cirN;
            picN = cirN = this.index;
            times = Math.abs(this.index - temp);//距离上个小圆点的距离
            rate = rate*times;//根据距离改变切换速率
            Roll(-this.index * width);
            rate = 50;
        }
    }
    //触及轮播图区域,清除定时器
    parent.onmouseover = function(){
        clearInterval(timer);
    }//离开该区域时，重新开始定时器的自动轮播
    parent.onmouseout = function(){
        timer = setInterval(autoRun, gap);
    }

