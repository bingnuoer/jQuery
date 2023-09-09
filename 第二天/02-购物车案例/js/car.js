$(function () {
    // 1.选中购物车头部复选框，change判断其勾选状态
    $(".checkall").change(function () {
        // console.log($(this).prop("checked"))
        // 商品详细模块的小复选框状态跟着购物车头部复选框状态走
        // 计算模块的复选框跟着选中购物车头部复选框走，并也能实现让商品详细模块的小复选框状态跟着其走
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"))
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item")
        } else {
            $(".cart-item").removeClass("check-cart-item")
        }

    })

    // 2.小复选框被选中的个数===3（也就是小复选框的个数） ，就选中大复选框，否则不选
    $(".j-checkbox").change(function () {
        // console.log($(".j-checkbox:checked").length)
        // $(".j-checkbox").length)是小复选框的个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true)
        } else {
            $(".checkall").prop("checked", false)
        }

        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item")
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item")
        }
    })

    // 3.商品增减模块
    // 加模块：加模块绑定点击事件
    $(".increment").click(function () {
        // 声明一个变量 = 当前加模块的兄弟文本框的值
        var n = $(this).siblings(".itxt").val()
        // console.log(n)
        // 变量++
        n++
        // 把改变后的变量写进加模块的兄弟文本框的值中
        $(this).siblings(".itxt").val(n)

        // 4. 商品小计模块 ：当前商品的价格*当前商品的数量 
        // 当前商品的价格
        // var p = $(this).parent().parent().siblings(".p-price").html()
        var p = $(this).parents(".p-num").siblings(".p-price").html()
        p = p.substr(1) // 截取字符串
        console.log(p)
        // 计算好的小计值写进去
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (p * n).toFixed(2))
        getSum()

    })
    // 减模块：加模块绑定点击事件
    $(".decrement").click(function () {
        // 声明一个变量 = 当前加模块的兄弟文本框的值
        var n = $(this).siblings(".itxt").val()
        // console.log(n)
        // 如果n==1，就退出函数
        if (n == 1) {  // 注意是== 值相等，不能是===
            return false
        }
        // 变量--
        n--
        // 把改变后的变量写进加模块的兄弟文本框的值中
        $(this).siblings(".itxt").val(n)

        // 当前商品的价格
        var p = $(this).parents(".p-num").siblings(".p-price").html()
        p = p.substr(1) // 截取字符串
        // console.log(p)
        // 计算好的小计值写进去
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (p * n).toFixed(2))
        getSum()
    })

    // 5.解决bug 用户输入商品数量 修改商品小计
    $(".itxt").change(function () {
        // 获取当前数量
        var n = $(this).val()
        // 获取当前商品价格
        var p = $(this).parents(".p-num").siblings(".p-price").html()
        p = p.substr(1) // 截取字符串
        // 计算好的小计值写进去
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (p * n).toFixed(2))
        // getSum()
    })

    // 6.解决商品总数量，总钱数
    // 封装求和函数
    getSum()
    function getSum() {
        var count = 0
        var money = 0
        // 总数量
        $(".itxt").each(function (i, ele) {
            // console.log(i)
            // console.log(ele)
            // console.log($(ele).val())
            count += parseInt($(ele).val())
        })
        $(".amount-sum em").text(count)

        // 总钱数
        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1))
        })
        $(".price-sum em").text("￥" + money.toFixed(2))
    }

    // 7.删除商品模块

    // 7.1 商品后面的删除按钮
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove()
        getSum()
    })

    // 7.2 删除选中的商品 
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove()
        getSum()
    })

    // 7.3 清理购物车
    $(".clear-all").click(function () {
        $(".cart-item-list").remove()
        getSum()
    })
})