export default function createExternalRoot(container, clientBuilder) {

  console.log("[ExternalComponent] createExternalRoot initialized");

  container.innerHTML = `
    <div id="entity-api-container" style="padding:12px;font-family:Arial"></div>
  `;

  // Render helper
  function renderEntity(entityId) {
    console.log("[ExternalComponent] renderEntity called with entityId:", entityId);

    if (!entityId) {
      console.warn("[ExternalComponent] No entityId available");
      container.innerHTML = "No entity context available";
      return;
    }

    container.querySelector("#entity-api-container").innerHTML = `
      <strong>Entity API URL</strong><br/>
      <a href="/api/entities/${entityId}" target="_blank">
        /api/entities/${entityId}
      </a>
    `;
  }

  // Initial render (existing entity)
  function render(props) {
    console.log("[ExternalComponent] render called with props:", props);

    const entityId =
      props?.options?.entityId ||
      props?.entity?.systemProperties?.id;

    console.log("[ExternalComponent] resolved entityId:", entityId);
    renderEntity(entityId);
  }

  // Subscribe to ENTITY_CREATED
  const onEntityCreated = (evt) => {
    console.log("[ExternalComponent] ENTITY_CREATED event received:", evt);

    const { definitionName, id } = evt.detail || {};
    console.log(
      "[ExternalComponent] ENTITY_CREATED details → definition:",
      definitionName,
      "id:",
      id
    );

    // Only react to Assets
    if (definitionName === "M.Asset" && id) {
      console.log("[ExternalComponent] Matching entity detected. Rendering entity.");
      renderEntity(id);
    } else {
      console.log("[ExternalComponent] Entity ignored (not M.Asset)");
    }
  };

  console.log("[ExternalComponent] Subscribing to ENTITY_CREATED event");
  window.addEventListener("ENTITY_CREATED", onEntityCreated);

  function unmount() {
    console.log("[ExternalComponent] unmount called. Removing event listener");
    window.removeEventListener("ENTITY_CREATED", onEntityCreated);
    container.innerHTML = "";
  }

  return {
    render,
    unmount
  };
}
