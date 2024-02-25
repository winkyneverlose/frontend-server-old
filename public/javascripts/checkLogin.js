// checkLogin.js
// This file checks if the user is logged in.

// Function to check if the user is logged in
function checkLogin() {
  fetch(`/api/get_session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        window.location.href = "/login";
        throw new Error("Check login failed");
      }
      return response.json();
    })
    .then((json) => {
      if (json.status === "success") {
        sessionStorage.setItem("user-login", "true");
        console.log("User is logged in");
      } else {
        sessionStorage.setItem("user-login", "false");
        window.location.href = "/login";
      }
    })
    .catch((error) => {
      window.location.href = "/login";
    });
}

checkLogin();
