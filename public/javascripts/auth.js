// auth.js
// This file contains the JavaScript code for the auth page.

// Function to submit login form
function submitLoginForm() {
  const username =
    document.getElementById("loginForm").elements["username"].value;
  const password =
    document.getElementById("loginForm").elements["password"].value;
  fetch(`${back_server.http}://${back_server.host}:${back_server.port}/login`, {
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
        } else {
          pageMessage(false, "未知错误喵~", 3000);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}
