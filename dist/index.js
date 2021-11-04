
sap.ui.getCore().attachInit(function () {

  const previewContent = new sap.ui.model.json.JSONModel({ content: "<div></div>" })

  const previewHtml = new sap.ui.core.HTML({
    id: "previewHtml",
    content: `{/content}`,
    sanitizeContent: true
  })

  previewHtml.setModel(previewContent)

  const presentationList = new sap.ui.model.json.JSONModel([])
  const list = new sap.m.SelectList({
    items: {
      path: "/",
      template: new sap.ui.core.ListItem({
        text: "{title}"
      })
    },
    itemPress: event => {
      const presentationPath = event
        .getParameter("item")
        .getBindingContext()
        .getObject("path")

      previewContent.setProperty(
        "/content",
        `<iframe src="${presentationPath}"></iframe>`
      )

    }
  })

  presentationList.loadData("./presentations.json")

  list.setModel(presentationList)

  const app = new sap.m.SplitApp({
    id: "mainApp",
    initialMaster: "initMaster",
    initialDetail: "initDetail",
    detailPages: [
      new sap.m.Page({
        id: "initDetail",
        customHeader: new sap.m.Bar({
          contentLeft: [
            new sap.m.Title({ text: "Theo's Presentation List" }),
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
        }),
        content: [previewHtml]
      }),

    ],
    masterPages: [
      new sap.m.Page({
        id: "initMaster",
        content: [list],
        customHeader: new sap.m.Bar({
          contentLeft: [
            (
              new sap.m.SearchField({
                placeholder: "Search 🚀",
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
            ).addStyleClass("sapUiHideOnPhone"),
            // new sap.m.Title({ text: "Theo's Presentation List" }),
          ],

        })
      })
    ]
  })

  const shell = new sap.m.Shell({ app })

  shell.placeAt("content")

});