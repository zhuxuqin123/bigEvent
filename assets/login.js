$(function () {
    // layui是全局对象，通过它可以得到form对象
    var form = layui.form
    // 表单提交数据登录按钮
    $('.layui-form').submit(function (e) {

        //阻止表单按钮的默认提交按钮
        e.preventDefault()

        //获取表单数据
        var formData = $(this).serialize()
        //表单验证

        // 基于LayUI自定义表单验证规则
        form.verify({
            // 必须是6-8位字符,不包括空格
            uname: [/^[\S]{6,8}$/, '用户名必须是6-8位字符'],
            // 密码必须是6位数字
            pwd: function (value, item) {
                // 形参value标书对应输入域的值
                // item表示DOM元素
                // 验证6位数字
                var reg = /^\d{6}$/
                // 如果规则不匹配就返回提示
                if (!reg.test(value)) {
                    return '密码必须是6位数字'
                }
            }
        })

        //调用接口发送请求
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            type: 'post',
            data: formData,
            success: function (res) {
                if (res.status === 0) {
                    location.href = './index.html'
                }
            }
        });
    })
})