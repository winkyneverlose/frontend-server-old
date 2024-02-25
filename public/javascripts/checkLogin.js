// checkLogin.js
// This file checks if the user is logged in.

// Function to check if the user is logged in
function checkLogin() {
  fetch(
    `${back_server.http}://${back_server.host}:${back_server.port}/get_session`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Check login failed");
      }
      return response.json();
    })
    .then((json) => {
      if (json.status === "success") {
        console.log("User is logged in");
      } else {
        window.location.href = "/login";
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

checkLogin();
