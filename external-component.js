export default function createExternalRoot(container, clientBuilder) {

  // Initial HTML
  container.innerHTML = `
    <div id="entity-api-container" style="padding:12px;font-family:Arial"></div>
  `;

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

  function unmount() {
    container.innerHTML = "";
  }

  return {
    render,
    unmount
  };
}
