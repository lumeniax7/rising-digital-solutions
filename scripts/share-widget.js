(() => {
  const mainMenu = document.querySelector(".share-site [data-share-control]");
  const sourcePanel = mainMenu?.querySelector("[data-share-panel]");
  const mainTrigger = mainMenu?.querySelector("[data-share-trigger]");

  if (!mainMenu || !sourcePanel || !mainTrigger) {
    console.error("Share controls could not initialize: the site share button or panel is missing.");
    return;
  }

  const panelMarkup = sourcePanel.innerHTML;

  function createMenu({ label, panelId, className = "share-menu" }) {
    const menu = document.createElement("div");
    menu.className = className;
    menu.dataset.shareControl = "";

    const trigger = document.createElement("button");
    trigger.className = "share-trigger";
    trigger.type = "button";
    trigger.textContent = label;
    trigger.setAttribute("aria-label", label);
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", panelId);
    trigger.dataset.shareTrigger = "";

    const panel = document.createElement("div");
    panel.className = "share-panel";
    panel.id = panelId;
    panel.dataset.sharePanel = "";
    panel.hidden = true;
    panel.innerHTML = panelMarkup;

    menu.append(trigger, panel);
    return menu;
  }

  const floatingMenu = createMenu({
    label: "Partager",
    panelId: "share-floating-panel",
    className: "share-menu share-fab",
  });
  document.body.append(floatingMenu);

  const menus = [...document.querySelectorAll("[data-share-control]")];

  function closeMenus(returnFocus = false) {
    let focusedTrigger = null;

    for (const menu of menus) {
      const trigger = menu.querySelector("[data-share-trigger]");
      const panel = menu.querySelector("[data-share-panel]");
      if (trigger?.getAttribute("aria-expanded") === "true") {
        focusedTrigger = trigger;
      }
      trigger?.setAttribute("aria-expanded", "false");
      if (panel) panel.hidden = true;
    }

    if (returnFocus) focusedTrigger?.focus();
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-share-trigger]");
    if (trigger) {
      const willOpen = trigger.getAttribute("aria-expanded") !== "true";
      closeMenus();
      if (willOpen) {
        trigger.setAttribute("aria-expanded", "true");
        document.getElementById(trigger.getAttribute("aria-controls")).hidden = false;
      }
      return;
    }

    if (!event.target.closest("[data-share-control]")) closeMenus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenus(true);
  });
})();
