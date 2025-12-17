(function () {
    // Create a container
    var container = document.createElement("div");

    // Style it a bit
    container.style.padding = "16px";
    container.style.border = "2px solid #4CAF50";
    container.style.borderRadius = "8px";
    container.style.fontFamily = "Arial";
    container.style.backgroundColor = "#f9f9f9";

    // Add content
    container.innerHTML = `
        <h2>✅ External Component Loaded</h2>
        <p>This component is loaded from GitHub.</p>
        <p>If you can see this, your setup works 🎉</p>
    `;

    // Add it to Content Hub page
    document.body.appendChild(container);
})();
