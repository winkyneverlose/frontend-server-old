// auth.js
// This file contains the JavaScript code for the auth page.

// Function to submit login form
function submitLoginForm() {
  const username =
    document.getElementById("loginForm").elements["username"].value;
  const password =
    document.getElementById("loginForm").elements["password"].value;
  fetch(`/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((json) => {
      if (json.status === "success") {
        pageMessage(true, "登录成功喵~", 3000);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        if (json.code == 1) {
          pageMessage(false, "用户信息不对喵~", 3000);
        } else if (json.code == 2) {
          pageMessage(false, "你已经被可喵大人封禁喵~", 3000);
        } else if (json.code == 3) {
          pageMessage(
            false,
            "可喵大人还没有批准你注册，过段时间再来登录喵~",
            8000
          );
        } else {
          pageMessage(false, "未知错误喵~", 3000);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

// Function to submit register form
function submitRegisterForm() {
  const username =
    document.getElementById("registerForm").elements["username"].value;
  const email = document.getElementById("registerForm").elements["email"].value;
  const password =
    document.getElementById("registerForm").elements["password"].value;
  fetch(`/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Register failed");
      }
      return response.json();
    })
    .then((json) => {
      if (json.status === "success") {
        pageMessage(true, "成功注册喵~", 3000);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        if (json.code == 1) {
          pageMessage(false, "用户名已经有人选了喵~", 3000);
        } else if (json.code == 2) {
          pageMessage(false, "邮箱地址已经存在喵~", 3000);
        } else if (json.code == 3) {
          pageMessage(false, "所有信息都不能为空喵~", 3000);
        } else if (json.code == 4) {
          pageMessage(
            false,
            "用户名中间不能有空格，只能是字母数字下划线，少于15字符，大于4字符 喵~",
            7000
          );
        } else if (json.code == 5) {
          pageMessage(false, "电子邮件格式不对喵~", 3000);
        } else if (json.code == 6) {
          pageMessage(false, "密码太短了喵~", 3000);
        } else {
          pageMessage(false, "未知错误喵~", 3000);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

if (sessionStorage.getItem("user-login") === "true") {
  window.location.href = "/";
}
