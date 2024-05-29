"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const usernameInput = document.getElementById("username-input");

  searchButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
      fetchGitHubProfile(username);
    }
  });

  function fetchGitHubProfile(username) {
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Not Found") {
          alert("User not found");
          return;
        }
        document.getElementById("avatar").src = data.avatar_url;
        document.getElementById("name").textContent = data.name || "N/A";
        document.getElementById("bio").textContent = data.bio || "N/A";
        document.getElementById("repos").textContent = data.public_repos;
        document.getElementById("followers").textContent = data.followers;
        document.getElementById("following").textContent = data.following;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        document.getElementById("name").textContent = "Error fetching data";
      });
  }
});
