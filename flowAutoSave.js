if(window.autoSaveIntervalID){
  clearInterval(window.autoSaveIntervalID);
  window.autoSaveInterval = null;
  console.log("Auto save is off");
  return; 
}

let LOG_ENABLED = true;

const findElementInShadowsAndIframe = (root, selector) => {
  const found = root.querySelector(selector);
  if (found) return found;

  const elementsWithShadow = root.querySelectorAll("*");
  for (const element of elementsWithShadow) {
    if (element.tagName === "IFRAME") {
      try {
        const iframeDoc =
          element.contentDocument || element.contentWindow.document;
        const result = findElementInShadowsAndIframe(iframeDoc, selector);
        if (result) return result;
      } catch (e) {
        console.warn("Could not access iframe content:", e);
      }
    }
    if (element.shadowRoot) {
      const result = findElementInShadowsAndIframe(
        element.shadowRoot,
        selector
      );
      if (result) return result;
    }
  }
  return null;
};

window.autoSaveIntervalID=setInterval(() => {
  const saveButton = findElementInShadowsAndIframe(
    document,
    "#editor_save_btn"
  );

  if (LOG_ENABLED) {
    console.log({
      message: "Auto Save is on!",
      found: !!saveButton,
      disabled: saveButton?.disabled,
    });
    console.log("window.autoSaveIntervalID:", window.autoSaveIntervalID);
  }

  if (saveButton && !saveButton.disabled) {
    saveButton.click();

    console.log("Clicked Save at", new Date().toLocaleTimeString());
  }

  LOG_ENABLED = false;
}, 10000);
