(function () {
    // Content Hub calls this function automatically
    window.ExternalComponent = function (options) {

        // options.element is the container provided by Content Hub
        var container = options.element;

        container.innerHTML = `
            <div style="
                padding:16px;
                border:2px solid #4CAF50;
                border-radius:8px;
                font-family:Arial;
                background:#f9f9f9;">
                
                <h2>✅ External Component Loaded</h2>
                <p>Loaded from GitHub Pages</p>
                <p>If you see this, everything works 🎉</p>
            </div>
        `;
    };
})();
