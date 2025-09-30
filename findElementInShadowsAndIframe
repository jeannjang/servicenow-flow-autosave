const findElementInShadowsAndIframe = (root, selector, depth) => {
    const found = root.querySelector(selector);
    if (found) return found;
    const depthPrefix = ">> ".repeat(depth);
    const elementsWithShadow = root.querySelectorAll("*");
    for (const element of elementsWithShadow) {
      if (element.tagName === "IFRAME") {
        console.log(depthPrefix + "[IFRAME] Searching in iframe", element);
        try {
          const iframeDoc =
            element.contentDocument || element.contentWindow.document;
          const result = findElementInShadowsAndIframe(
            iframeDoc,
            selector,
            depth + 1
          );
          if (result) return result;
        } catch (e) {
          console.warn("Could not access iframe content:", e);
        }
      }
      if (element.shadowRoot) {
        console.log(
          depthPrefix + "[SHADOW DOM] Searching in shadowRoot of",
          element
        );
        const result = findElementInShadowsAndIframe(
          element.shadowRoot,
          selector,
          depth + 1
        );
        if (result) return result;
      }
    }
    return null;
  };
  const saveButton = findElementInShadowsAndIframe(
    document,
    "#editor_save_btn",
    0
  );
  console.log({ found: !!saveButton, disabled: saveButton?.disabled });
  if (saveButton && !saveButton.disabled) {
    saveButton.click();
    console.log("Clicked Save once");
  }
