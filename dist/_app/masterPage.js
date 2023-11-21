import viewModel from "./model.js";
import app from './app.js'


export const masterPage = new sap.m.Page({
  id: "initMaster",
  content: [
    new sap.m.SelectList({
      id: 'list',
      selectedKey: "{/selectedKey}",
      items: {
        path: "/presentationList",
        template: new sap.ui.core.ListItem({
          key: "{path}",
          text: "{title}"
        })
      },
      itemPress: event => {
        if (sap.ui.Device.orientation.portrait) {
          app.toDetail("initDetail")
        }
        const bindingItem = event
          .getParameter("item")
          .getBindingContext()

        viewModel.setProperty(
          "/main/title",
          bindingItem.getObject("title")
        );
        const path = bindingItem.getObject("path");
        location.hash = path
        viewModel.setProperty(
          "/main/content",
          `<iframe src="${path}"></iframe>`
        );

      }
    })
  ],
  customHeader: new sap.m.Bar({
    contentLeft: [
      new sap.m.Title({ text: "Presentations", visible: sap.ui.Device.system.phone }),
      new sap.m.SearchField({
        placeholder: "Search 🚀",
        visible: !sap.ui.Device.system.phone,
        liveChange: (event) => {
          const value = event.getParameter("newValue")
          const binding = sap.ui.getCore().byId("list").getBinding("items")
          binding.filter([
            new sap.ui.model.Filter({
              path: "title",
              operator: sap.ui.model.FilterOperator.Contains,
              value1: value,
            })
          ])
        },
      })
    ],

  })
})


export default masterPage