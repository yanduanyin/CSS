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
//轮播图部分
const jsImgs_box = document.querySelector('.box-imgs');
const JSImgs_ul = document.querySelector('.imgs');
const jsImg = JSImgs_ul.children;
const jsCirs_ul = document.querySelector('.box-cirs');
const jsCir = jsCirs_ul.children;
const jsText = document.querySelectorAll('.box-text');
// const jsBt = document.querySelector('.bt')
// console.log(jsCir)
var len = jsImg.length;//图片的张数
var timer = null;                     //初始化一个定时器
var picN = 0;                         //当前显示的图片下标
var cirN = 0;                         //当前显示图片的小圆点下标
var textN = 0;                         //当前显示文本的下标


///添加小圆点，之所用js添加小圆点，是因为小圆点的数量是由图片张数决定的。
for (var i = 0; i < len; i++) {
    var c_li = document.createElement('li');
    jsCirs_ul.appendChild(c_li);
}
//定义一个函数，通过传进来的要显示的图片的下标来控制显示
function Roll(index, num, tn) {
    for (var i = 0; i < len; i++) {
        jsImg[i].style.display = 'none';
        jsText[i].style.display = 'none';
        jsCir[i].className = '';
    }
    jsImg[index].style.display = 'block';
    jsCir[num].className = 'active';
    jsImg[index].className = 'ani';
    jsText[tn].style.display = 'block';
    jsText[tn].className = 'showtext';

}
//设置自动播放函数autoRun(),只要传入当前的图片和圆点的索引值就会从此处开始自动轮播
function autoRun(pic, cir, t) {
    // 当调用autoRun（）函数，传入的实参不是pic = 0,cir = 0;时,执行下面语句
    if (pic != 0) {
        //当点击最后一个圆点时，要先显示最后一张图片，再从第一张重新开始轮播
        if(pic === len - 1){
            Roll(pic, cir, t);
            pic = 0;
            cir = 0;
            t = 0;
            jsImg.timer = setInterval(function () {
                Roll(pic, cir, t);
                pic++;
                cir++;
                t++;
                if (pic > len - 1) {
                    pic = 0;
                }
                if (cir > len - 1) {
                    cir = 0;
                }
                if(t > len - 1) {
                    t = 0;
                }
            }, 7200)
        }else{//当点击第二、三个圆点时，显示当前点击圆点的图片和高亮，再进行循环
            Roll(pic, cir, t);
            ++pic;
            ++cir;
            ++t;
            jsImg.timer = setInterval(function () {
                Roll(pic, cir, t);
                pic++;
                cir++;
                t++;
                if (pic > len - 1) {
                    pic = 0;
                }
                if (cir > len - 1) {
                    cir = 0;
                }
                if(t > len - 1) {
                    t = 0;
                }
            }, 7200)
        }
       
    } else{//当页面加载时，预先定义好的pic = 0,cir = 0实参会传进来，执行下列语句，会自动轮播
        Roll(pic, cir, t);//先显示传入实参的图片和圆点的高亮
        ++pic
        ++cir
        ++t
        jsImg.timer = setInterval(function () {
            Roll(pic, cir, t);
            pic++;
            cir++;
            t++;
            if (pic > len - 1) {
                pic = 0;
            }
            if (cir > len - 1) {
                cir = 0;
            }
            if(t > len - 1) {
                t = 0;
            }
        }, 7200)
    }
}
//当页面加载时就调用autoRun函数自动播放，传入预先定义好的pic = 0,cir = 0实参
window.onload = autoRun(picN, cirN, textN);
//用for循环给每个圆点绑定一个点击事件
for (var j = 0; j < len; j++) {
    jsCir[j].index = j;//给每个圆点一个索引值
    //当触及小圆点是高亮
    jsCir[j].onclick = function () {
        clearInterval(jsImg.timer)//每次运行该函数必须清除之前的定时器！
        this.className = 'active';//给当前点击的圆点高亮
        var i = this.index;  //将当前圆点的index索引值传给i
        var e = this.index;
        autoRun(i, this.index, e)  //传入实参i，this.index，调用自动轮播函数autoRun()
    }
}


