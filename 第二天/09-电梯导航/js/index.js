$(function () {
    // 4.bug:当点击了li，此时不需要执行 页面滚动事件里面的 li 的背景选择添加current
    // 节流阀 互斥锁
    var flag = true

    // 1.显示隐藏电梯导航栏
    var toolTop = $(".recommend").offset().top
    // 刚打开页面就调用下是否滚动
    toggleTool()
    // 把判断是否滚动效果封装到一个函数里
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn()
        } else {
            $(".fixedtool").fadeOut()
        }
    }
    // 页面滑动调用下是否滚动
    $(window).scroll(function () {
        toggleTool()
        // 3.页面滚动到相应的内容区域，电梯导航相应的li添加current类，其兄弟移除current类

        // 循环遍历内容区域,判断卷去的距离，取到相应内容的索引号
        if (flag) { //把添加类放到节流阀判断里
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // console.log(i)
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass()
                }
            })
        }
    })

    // 2.点击电梯导航可以滑动到相应的内容页面
    // 获取左侧电梯导航栏li的索引号
    $(".fixedtool li").click(function () {
        flag = false //关闭节流阀
        // console.log($(this).index())
        // 计算对应的内容区域的盒子距离顶部的距离
        var current = $(".floor .w").eq($(this).index()).offset().top
        // 页面滚动添加动画
        $("body,html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true // 回调函数控制节流阀 开启节流阀
        })
        // 排他思想：给当前点击的li添加current类名，兄弟移除current类名
        // 添加和移除类名相同 removeClass() 括号中可以省略类名
        $(this).addClass("current").siblings().removeClass("current")
    })
})