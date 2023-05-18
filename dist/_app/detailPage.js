import viewModel from "./model.js"

export const detailPage = new sap.m.Page({
  id: "initDetail",
  enableScrolling: false,
  footer: new sap.m.Toolbar({
    style: "Standard",
    content: [
      new sap.m.Button({
        icon: "sap-icon://nav-back",
        text: "Back",
        visible: sap.ui.Device.system.phone,
        press: () => {
          app.backMaster("initMaster")
        }
      }),
      new sap.m.ToolbarSpacer(),
      new sap.m.Button({
        icon: "sap-icon://source-code",
        text: "Source Code",
        press: () => {
          window.open("https://github.com/Soontao/presentations", "_blank").focus()
        }
      }),
      new sap.m.Button({
        text: "Open in Single Page",
        press: () => {
          const selectedKey = viewModel.getProperty("/selectedKey")
          window.open(selectedKey, "_blank").focus()
        },
        type: "Transparent"
      }),
    ]
  }),
  customHeader: new sap.m.Bar({
    contentLeft: [
      new sap.m.Title({ text: "{/main/title}" })
    ]
  }),
  content: [
    new sap.ui.core.HTML({
      id: "previewHtml",
      content: `{/main/content}`,
      sanitizeContent: true
    })
  ]
})

export default detailPage