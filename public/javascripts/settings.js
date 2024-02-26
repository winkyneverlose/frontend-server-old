// settings.js
// This file contains the JavaScript code for the settings page.

// Avatar upload preview
window.addEventListener("DOMContentLoaded", () => {
  const avatarUploadInput = document.getElementById("avatar-upload");
  const avatarPreview = document.getElementById("avatar-preview");
  avatarUploadInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
});

// Get the user's settings
window.addEventListener("DOMContentLoaded", () => {
  fetch("/api/get_settings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("avatar-preview").src = data.user.data.avatar_url;
      document.getElementById("username").value = data.auth.data.username;
      document.getElementById("email").value = data.auth.data.email;

      document.getElementById("nickname").value = data.user.data.username;
      document.getElementById("first-name").value = data.user.data.first_name;
      document.getElementById("last-name").value = data.user.data.last_name;
      if (data.user.data.gender == "male") {
        document.getElementById("male").checked = true;
      } else if (data.user.data.gender == "female") {
        document.getElementById("female").checked = true;
      }
      const birthday = new Date(data.user.data.birthday);
      const formattedBirthday = birthday.toISOString().split("T")[0];
      document.getElementById("birthday").value = formattedBirthday;
      document.getElementById("bio").value = data.user.data.bio;
      document.getElementById("educated").value = data.user.data.educated;
      document.getElementById("language").value = data.user.data.language;
      document.getElementById("customize-url1").value =
        data.user.data.customize_url_1;
      document.getElementById("customize-url2").value =
        data.user.data.customize_url_2;
      document.getElementById("customize-url3").value =
        data.user.data.customize_url_3;
      document.getElementById("customize-url4").value =
        data.user.data.customize_url_4;

      for (let i = 0; i < data.interests.interests.length; i++) {
        try {
          document.getElementById(data.interests.interests[i]).checked = true;
        } catch (e) {
          console.error(e);
        }
      }
    });
});

// Update the user's personal information
window.addEventListener("DOMContentLoaded", () => {
  const updatePersonalInfoButton = document.getElementById(
    "save-personal-settings"
  );
  updatePersonalInfoButton.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const userAvatarSrc = document.getElementById("avatar-preview").src;
    fetch(userAvatarSrc)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = function () {
          const avatarUrl = reader.result;
          fetch("/api/save_personal_settings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              settings: {
                username,
                email,
                avatarUrl,
              },
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "success") {
                pageMessage(true, "更新成功喵~", 5000);
              } else if (data.status === "error") {
                if (data.code === 1) {
                  pageMessage(false, "用户头像错误喵~", 5000);
                } else if (data.code === 2) {
                  pageMessage(
                    false,
                    "用户名中间不能有空格，只能是字母数字下划线，少于15字符，大于4字符 喵~",
                    7000
                  );
                } else if (data.code === 3) {
                  pageMessage(false, "电子邮件格式不对喵~", 5000);
                } else if (data.code === 4) {
                  pageMessage(false, "用户名已经有人选了喵~", 5000);
                } else if (data.code === 5) {
                  pageMessage(false, "邮箱地址已经存在喵~", 5000);
                } else {
                  pageMessage(false, "未知错误喵~", 5000);
                }
              }
            });
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  });
});

// Update the user's password
window.addEventListener("DOMContentLoaded", () => {
  const updatePasswordButton = document.getElementById(
    "save-password-settings"
  );
  updatePasswordButton.addEventListener("click", () => {
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    if (newPassword !== confirmPassword) {
      pageMessage(false, "新密码和确认密码不一样喵~", 5000);
      return;
    }
    fetch("/api/update_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          pageMessage(true, "更新成功喵~", 5000);
        } else if (data.status === "error") {
          if (data.code === 1) {
            pageMessage(false, "密码太短了喵~", 5000);
          } else {
            pageMessage(false, "未知错误喵~", 5000);
          }
        }
      });
  });
});

// Update the user's profile
window.addEventListener("DOMContentLoaded", () => {
  const updateProfileButton = document.getElementById("save-profile-settings");
  updateProfileButton.addEventListener("click", () => {
    const nickname = document.getElementById("nickname").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    let gender;
    if (document.getElementById("male").checked) {
      gender = "male";
    } else if (document.getElementById("female").checked) {
      gender = "female";
    } else {
      gender = "unknown";
    }
    let birthday = new Date(document.getElementById("birthday").value);
    birthday = birthday.getTime();
    const bio = document.getElementById("bio").value;
    const educated = document.getElementById("educated").value;
    const language = document.getElementById("language").value;
    const customizeUrl1 = document.getElementById("customize-url1").value;
    const customizeUrl2 = document.getElementById("customize-url2").value;
    const customizeUrl3 = document.getElementById("customize-url3").value;
    const customizeUrl4 = document.getElementById("customize-url4").value;
    fetch("/api/save_profile_settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        settings: {
          username: nickname,
          firstName,
          lastName,
          gender,
          birthday,
          bio,
          educated,
          language,
          customizeUrl1,
          customizeUrl2,
          customizeUrl3,
          customizeUrl4,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          pageMessage(true, "更新成功喵~", 5000);
        } else if (data.status === "error") {
          if (data.code === 1) {
            pageMessage(false, "用户名格式不对喵~", 5000);
          } else if (data.code === 2) {
            pageMessage(false, "姓名格式不对喵~", 5000);
          } else if (data.code === 3) {
            pageMessage(false, "是生理性别喵~", 5000);
          } else {
            pageMessage(false, "未知错误喵~", 5000);
          }
        }
      });
  });
});

// Update the user's interests
window.addEventListener("DOMContentLoaded", () => {
  const updateInterestsButton = document.getElementById("save-tags-settings");
  updateInterestsButton.addEventListener("click", () => {
    const interests = tagArray;
    fetch("/api/save_interests_settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interests,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          pageMessage(true, "更新成功喵~", 5000);
        } else if (data.status === "error") {
          if (data.code === 1) {
            pageMessage(false, "未知错误喵~", 5000);
          }
        }
      });
  });
});
