sap.ui.getCore().ready(async function () {
  const { app } = await import("./app/app.js")
  const { viewModel, refreshModel } = await import("./app/model.js")

  app.setModel(viewModel).placeAt("content")

  if ('serviceWorker' in navigator && !window.location.host.includes("localhost")) {
    try {
      const registration = await navigator.serviceWorker.register('sw.js')
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        worker.addEventListener('statechange', () => {
          if (worker.state === "activated") {
            sap?.m?.MessageToast?.show?.("The presentations have been updated.")
            refreshModel()
          }
        });
      });
    } catch (error) {
      console.error(error)
    }
  }

});