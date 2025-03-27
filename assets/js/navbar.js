document.addEventListener("DOMContentLoaded", function () {
  // Get the current path
  const currentPath = window.location.pathname;

  // Calculate the relative path to the root
  const pathToRoot =
    currentPath
      .split("/")
      .slice(0, -1)
      .map(() => "..")
      .join("/") || ".";

  // Construct the path to navbar.html
  const navbarPath = `${pathToRoot}/navbar.html`;

  fetch(navbarPath)
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch((error) => console.error("Error loading navbar:", error));
});
