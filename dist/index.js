sap.ui.getCore().attachInit(async function () {

  const { app } = await import("./_app/app.js")
  const { viewModel, refreshModel } = await import("./_app/model.js")

  app.setModel(viewModel).placeAt("content")

  if ('serviceWorker' in navigator && !window.location.host.includes("localhost")) {
    try {
      const regitration = await navigator.serviceWorker.register('sw.js')
      regitration.addEventListener("updatefound", () => {
        const worker = regitration.installing;
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