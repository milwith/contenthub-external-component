export default function createExternalRoot(container, clientBuilder) {

  container.innerHTML = `
    <div id="entity-api-container" style="padding:12px;font-family:Arial"></div>
  `;

  let unsubscribe;

  function render(props) {
    const entityId =
      props?.options?.entityId ||
      props?.entity?.systemProperties?.id;

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

  // Subscribe to entityCreated
  clientBuilder.getClient().then(client => {
    unsubscribe = client.events.subscribe("entityCreated", event => {
      if (event.entityDefinition === "M.Asset") {
        render({
          entity: {
            systemProperties: {
              id: event.entityId
            }
          }
        });
      }
    });
  });

  function unmount() {
    if (unsubscribe) {
      unsubscribe();
    }
    container.innerHTML = "";
  }

  return {
    render,
    unmount
  };
}
