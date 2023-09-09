$(function () {
    // alert(11)
    // 事件对象判断用户按下的是不是回车键
    load()
    // 1.按下回车，把完整数据 存储到本地存储里面
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            if ($(this).val() === '') {
                alert('请添加ToDo')
            } else {
                // alert(11)
                // 1.1 读取本地存储原来的数据
                var local = getData()
                // console.log(local)
                // 1.2 local数组进行更新数据。获取表单数据，添加到本地存储取出来的数组中
                local.push({ title: $(this).val(), done: false })
                // 把这个数组local 存储给本地存储
                savaData(local)
                // 2.渲染页面 把本地存储更新后的数据渲染到页面中
                load()
            }
            $(this).val('')
        }
    })
    // 3.todolist 删除操作
    // 3.1 获取本地存储
    $("ol,ul").on("click", "a", function () {
        // alert(11)
        var data = getData()
        // console.log(data)
        // 3.2 获取本条li>a的索引号 修改数据
        // 获取自定义属性用attr
        var index = $(this).attr("id")
        // console.log(index)
        // 修改数据
        data.splice(index, 1)
        // 3.3 修改后的数据保存到本地存储中
        savaData(data)

        // 3.4 重新渲染页面
        load()
    })
    // 4.todolist 正在进行 和 已经完成 操作
    $("ol,ul").on("click", "input", function () {
        // 4.1获取本地存储
        var data = getData()
        // console.log(data)
        // 4.2修改数据
        // 修改data的done固有属性(prop())为相反值
        var index = $(this).siblings("a").attr("id")
        // data[?]=?
        data[index].done = $(this).prop("checked")
        console.log(data)
        // 4.3存放到本地存储
        savaData(data)
        // 4.4渲染页面
        load()
    })


    // 取出本地数据
    function getData() {
        var data = localStorage.getItem("todolist")
        if (data !== null) {
            return JSON.parse(data)
        } else {
            return []
        }
    }
    // 保存本地数据
    function savaData(data) {
        localStorage.setItem("todolist", JSON.stringify(data))
    }
    // 渲染页面
    function load() {
        // 获取本地数据
        var data = getData()
        var todoCount = 0 // 代办个数
        var doneCount = 0 // 已完成个数

        // 先清空ol,ul
        $("ol").empty()
        $("ul").empty()
        // 遍历本地存储的数据，有几条数据，给ol中生成几个li

        $.each(data, function (i, n) {
            // console.log(i)
            // console.log(n)

            // 外双引号内单引号
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked = 'checked'> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a ></li > ")
                doneCount++
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a ></li > ")
                todoCount++
            }
        })
        // 修改统计数 内容
        $("#todocount").text(todoCount)
        $("#donecount").text(doneCount)

    }

})