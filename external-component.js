// 💥 ADD THIS LINE AT THE TOP 💥
alert("Component Script is running!");
export default function createExternalRoot(container, clientBuilder) {
  // 1. Log immediately to confirm the component itself is even loading
  console.log("External Component Initializing...");

  container.innerHTML = `
    
      Waiting for Entity Created event...
    </div>
  `;

  function renderEntity(entityId) {
    console.log("Updating UI for ID:", entityId);
    const target = container.querySelector("#entity-api-container");
    if (target) {
      target.innerHTML = `
        <strong>New Entity API URL</strong><br/>
        /api/entities/${entityId}</a>
      `;
    }
  }

  // 🔹 Define the listener
  const onEntityCreated = (evt) => {
    // This will log ANY entity creation to help you see the exact definitionName
    console.log("ENTITY_CREATED Event Detected!", evt.detail);

    const { definitionName, id } = evt.detail;

    // Sitecore often uses 'M.Asset' (Case sensitive)
    if (definitionName === "M.Asset" && id) {
      console.log("Success: Asset detected. Triggering render.");
      renderEntity(id);
    } else {
      console.warn(`Event skipped: definitionName was '${definitionName}', expected 'M.Asset'`);
    }
  };

  // 🔹 Subscribe to window-level events (Standard for Content Hub 4.2+)
  window.addEventListener("ENTITY_CREATED", onEntityCreated);
  console.log("Listener attached to window: ENTITY_CREATED");

  return {
    render(props) {
      console.log("Initial Render Props:", props);
      const entityId = props?.options?.entityId || props?.entity?.systemProperties?.id;
      if (entityId) renderEntity(entityId);
    },
    unmount() {
      console.log("Unmounting: Removing listener");
      window.removeEventListener("ENTITY_CREATED", onEntityCreated);
      container.innerHTML = "";
    }
  };
}
