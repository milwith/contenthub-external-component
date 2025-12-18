export default function createExternalRoot(container, clientBuilder) {

  container.innerHTML = `
    </div>
  `;

  function renderEntity(entityId) {
    if (!entityId) {
      container.innerHTML = "No entity context available";
      return;
    }
    container.querySelector("#entity-api-container").innerHTML = `
      <strong>Entity API URL</strong><br/>
      
        /api/entities/${entityId}
      </a>
    `;
  }

  function render(props) {
    // Log when the component renders initially
    console.log("Component Rendered with Props:", props);
    const entityId = props?.options?.entityId || props?.entity?.systemProperties?.id;
    renderEntity(entityId);
  }

  const onEntityCreated = (evt) => {
    // 🔹 LOG 1: Confirm the listener caught ANY event
    console.log("ENTITY_CREATED event received!", evt.detail);

    const { definitionName, id } = evt.detail;

    // 🔹 LOG 2: Check the specific data being filtered
    console.log(`Checking definition: ${definitionName}, ID: ${id}`);

    if (definitionName === "M.Asset" && id) {
      // 🔹 LOG 3: Confirm the match was successful
      console.log("Match found! Updating UI for Asset ID:", id);
      renderEntity(id);
    } else {
      console.warn("Event ignored: Definition is not M.Asset or ID is missing.");
    }
  };

  window.addEventListener("ENTITY_CREATED", onEntityCreated);
  console.log("Event listener for ENTITY_CREATED has been attached.");

  function unmount() {
    window.removeEventListener("ENTITY_CREATED", onEntityCreated);
    console.log("Event listener removed during unmount.");
    container.innerHTML = "";
  }

  return { render, unmount };
}
