$(function () {
  let form = layui.form;
  let layer = layui.layer;

  // 发送ajax请求来获取到用户的基本信息
  getUserInfo();
  function getUserInfo() {
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        console.log(res);

        // 给表单赋值
        // form 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        // 注意：需要按照name名字来一一对应 ==> 去给表单设置name属性
        form.val("form", res.data);
      },
    });
  }

  // 实现重置功能
  // reset 按钮是可以表单的重置（清空效果）不是需要的效果
  // 做法：点击重置按钮的时候，重新发送ajax请求来获取到用户的信息填充到form中
  $("#resetBtn").click(function (e) {
    e.preventDefault(); // 默认行为阻止下(清空效果)

    // 重新发送ajax请求来获取到用户的信息填充到form中
    getUserInfo();
  });

  // 实现表单的提交功能
  // 1. 给form注册submit
  // 2. 阻止其默认行为
  // 3. 收集表单数据
  // 4. ajax

  $(".layui-form").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize();

    $.ajax({
      url: "/my/userinfo",
      type: "POST",
      data,
      success: function (res) {
        console.log(res);

        if (res.status !== 0) {
          return layer.msg("修改用户信息失败！");
        }

        layer.msg("修改用户信息成功！");

        // 更新index页面左侧导航的名字
        // window.parent 来获取到父页面（index页面）
        // 注意点：父页面的getUserInfo函数需要是全局的
        window.parent.getUserInfo();
      },
    });
  });
});
