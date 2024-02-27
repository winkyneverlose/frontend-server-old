// game.js
// This file contains the JavaScript code for the game page.

// Function to get the next page of games
let Parameters = {};
function getNextPage() {
  fetch("/api/game/get", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("game-body").innerHTML = data.data;
      Parameters = data.parameters;
      try {
        getPageScript();
      } catch (e) {
        console.log("Error: " + e.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

// Function to get the next page of games
function getPageScript() {
  try {
    document.getElementById("game-script").remove();
  } catch (e) {
    console.log("Error: " + e.message);
  }
  const script = document.createElement("script");
  script.id = "game-script";
  script.type = "text/javascript";
  script.src = "/api/game/get/js";
  document.body.appendChild(script);
}

function sendChoose(choose) {
  fetch("/api/game/set", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      choose: choose,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 0) {
        location.reload();
        // getNextPage();
      } else {
        console.log(data.message);
      }
    });
}

window.addEventListener("DOMContentLoaded", () => {
  // Load the next page of games
  getNextPage();
});

// Class to handle the game menu
class GameMenu {
  constructor() {
    this.toolBar = document.getElementById("game-menu");
    this.listeners = [];
  }

  show() {
    this.toolBar.style.display = "flex";
  }

  hide() {
    this.toolBar.style.display = "none";
  }

  creatTool(toolName, callback) {
    let newTool = document.createElement("div");
    let newToolText = document.createElement("span");
    newToolText.innerHTML = toolName;
    let newToolValue = document.createElement("span");
    newToolValue.id = "tool-" + Math.random().toString(36).substr(2);
    newTool.appendChild(newToolText);
    newTool.appendChild(newToolValue);
    this.toolBar.appendChild(newTool);
    callback(newToolValue.id);
    this.checkListeners();
  }

  updateTool(id, value) {
    document.getElementById(id).innerHTML = value;
    this.checkListeners();
  }

  createLocalTime(callback) {
    this.creatTool("时间", (id) => {
      setInterval(() => {
        this.updateTool(id, new Date().toLocaleTimeString("chinese"));
        this.checkListeners();
      }, 1000);
      callback(id);
    });
  }

  createLocalDate(callback) {
    this.creatTool("日期", (id) => {
      setInterval(() => {
        this.updateTool(id, new Date().toLocaleDateString("chinese"));
        this.checkListeners();
      }, 1000);
      callback(id);
    });
  }

  createTime(startAt, timeStep = 1, callback) {
    // timeStep 是正常时间的倍数
    timeStep = timeStep * 1000;
    this.creatTool("时间", (id) => {
      let time = startAt;
      setInterval(() => {
        time += timeStep;
        this.updateTool(id, new Date(time).toLocaleTimeString("chinese"));
        this.checkListeners();
      }, 1000);
      callback(id);
    });
  }

  createDate(startAt, timeStep = 1, callback) {
    // timeStep 是正常时间的倍数
    timeStep = timeStep * 1000;
    this.creatTool("日期", (id) => {
      let time = startAt;
      setInterval(() => {
        time += timeStep;
        this.updateTool(id, new Date(time).toLocaleDateString("chinese"));
        this.checkListeners();
      }, 1000);
      callback(id);
    });
  }

  createCountDown(time_d, time_h, time_m, time_s, timeStep = 1, callback) {
    timeStep = timeStep * 1000;
    this.creatTool("倒计时", (id) => {
      let time =
        time_d * 24 * 60 * 60 * 1000 +
        time_h * 60 * 60 * 1000 +
        time_m * 60 * 1000 +
        time_s * 1000;
      setInterval(() => {
        if (time <= 0 || time - timeStep < 0) {
          this.updateTool(id, "0天0时0分0秒");
          clearInterval();
          return;
        }
        time -= timeStep;
        let d = Math.floor(time / (24 * 60 * 60 * 1000));
        let h = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        let m = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
        let s = Math.floor((time % (60 * 1000)) / 1000);
        this.updateTool(id, d + "天" + h + "时" + m + "分" + s + "秒");
        this.checkListeners();
      }, 1000);
      callback(id);
    });
  }

  createListener(id, listener) {
    this.listeners.push({ id: id, listener: listener });
  }

  clearListener(id) {
    this.listeners = this.listeners.filter((listener) => listener.id != id);
  }

  checkListeners() {
    // 监听器只能精确到秒，如果判断是否相等请使用大于或小于来判断
    this.listeners.forEach((listener) => {
      listener.listener(document.getElementById(listener.id).innerHTML);
    });
  }
}

window.addEventListener("load", function () {
  let gameMenu = document.getElementById("game-menu");
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      gameMenu.style.position = "fixed";
    } else {
      gameMenu.style.position = "static";
    }

    lastScrollTop = scrollTop;
  });
});
