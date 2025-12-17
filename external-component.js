export default function createExternalRoot(container, clientBuilder) {

  container.innerHTML = `
    <div id="entity-api-container" style="padding:12px"></div>
  `;

  function render(context) {
    const entityId = context?.page?.entity?.id;
    if (!entityId) return;

    container.querySelector("#entity-api-container").innerHTML = `
      <strong>Entity API URL:</strong><br/>
      <a href="/api/entities/${entityId}" target="_blank">
        /api/entities/${entityId}
      </a>
    `;
  }

  return {
    render,
    unmount() {
      container.innerHTML = "";
    }
  };
}
