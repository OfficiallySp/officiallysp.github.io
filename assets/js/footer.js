document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  const pathToRoot =
    currentPath
      .split("/")
      .slice(0, -1)
      .map(() => "..")
      .join("/") || ".";
  const footerPath = `${pathToRoot}/footer.html`;

  fetch(footerPath)
    .then((response) => response.text())
    .then((data) => {
      const placeholder = document.getElementById("footer-placeholder");
      if (placeholder) {
        placeholder.innerHTML = data;
      } else {
        document.body.insertAdjacentHTML("beforeend", data);
      }
    })
    .catch((error) => console.error("Error loading footer:", error));
});
