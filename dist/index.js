
sap.ui.getCore().attachInit(function () {

  const model = new sap.ui.model.json.JSONModel([])
  const list = new sap.m.SelectList({
    items: {
      path: "/",
      template: new sap.ui.core.ListItem({
        text: "{title}"
      })
    },
    itemPress: event => {
      const presentationPath = event.getParameter("item").getBindingContext().getObject("path")
      window.open(presentationPath, "_blank").focus()
    }
  })

  model.loadData("./presentations.json")

  list.setModel(model)

  const app = new sap.m.App({
    pages: new sap.m.Page({
      content: [list],
      customHeader: new sap.m.Bar({
        contentLeft: [
          new sap.m.Title({ text: "Theo's Presentation List" }),
        ],
        contentMiddle: [
          (
            new sap.m.SearchField({
              liveChange: (event) => {
                const value = event.getParameter("newValue")
                const binding = list.getBinding("items")
                binding.filter([
                  new sap.ui.model.Filter({
                    path: "title",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: value,
                  })
                ])
              },
            })
          ).addStyleClass("sapUiHideOnPhone")
        ],
        contentRight: [
          new sap.m.Button({
            icon: "sap-icon://source-code",
            text: "Source Code",
            press: () => {
              window.open("https://github.com/Soontao/presentations", "_blank").focus()
            }
          }),
        ]
      })
    })
  })

  const shell = new sap.m.Shell({ app })

  shell.placeAt("content")

});