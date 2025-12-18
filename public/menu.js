var body = document.querySelector("body");

var contextMenu = document.createElement("div");
contextMenu.classList.add("context-menu")
contextMenu.style.position = "absolute";
contextMenu.style.zIndex = 10;

var menuHeader = document.createElement("h3");
menuHeader.textContent = "PAUSED"

contextMenu.appendChild(menuHeader);

export function showMenu() {
    body.appendChild(contextMenu)
}

export function hideMenu() {
    body.removeChild(contextMenu)
}
