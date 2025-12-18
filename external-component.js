export default function createExternalRoot(container, clientBuilder) {

  container.innerHTML = `
    <div id="entity-api-container" style="padding:12px;font-family:Arial"></div>
  `;

  // 🔹 Render helper
  function renderEntity(entityId) {
    if (!entityId) {
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

  // 🔹 Initial render (existing entity)
  function render(props) {
    const entityId =
      props?.options?.entityId ||
      props?.entity?.systemProperties?.id;

    renderEntity(entityId);
  }

  // 🔹 Subscribe to ENTITY_CREATED (DOCUMENTATION WAY)
  const onEntityCreated = (evt) => {
    const { definitionName, id } = evt.detail;

    // Only react to Assets
    if (definitionName === "M.Asset" && id) {
      renderEntity(id);
    }
  };

  window.addEventListener("ENTITY_CREATED", onEntityCreated);

  function unmount() {
    window.removeEventListener("ENTITY_CREATED", onEntityCreated);
    container.innerHTML = "";
  }

  return {
    render,
    unmount
  };
}
