
sap.ui.getCore().attachInit(function () {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then(regitration => {
        regitration.addEventListener("updatefound", () => {
          const worker = regitration.installing;
          worker.addEventListener('statechange', () => {
            if (worker.state === "activated") {
              sap.ui.require(["sap/m/MessageBox"], function (MessageBox) {
                MessageBox.confirm(
                  "The presentations have been updated. Do you want to reload this page ?",
                  () => { window.location.reload(); },
                  "Refresh Page"
                );
              });

            }
          });
        });
      })
      .catch(console.error);
  }

  /**
   * global shared model, contains all data
   */
  const viewModel = new sap.ui.model.json.JSONModel({
    selectedKey: "",
    presentationList: [],
    main: {
      title: "Theo's Presentation List",
      content: "<div></div>",
    }
  });


  // data initialize
  fetch("./presentations.json")
    .then(res => res.json())
    .then(data => {
      viewModel.setProperty("/presentationList", data)
      if (location.hash.length > 0) {
        const hash = location.hash.substring(1)
        const item = data.find(({ path }) => path === hash)
        if (item !== undefined) {
          viewModel.setProperty("/selectedKey", item.path)
          viewModel.setProperty("/main/title", item.title)
          viewModel.setProperty("/main/content", `<iframe src="${item.path}"></iframe>`);
          location.hash = item.path
        } else {
          // not existed file, reset
          location.path = ''
        }
      } else {
        const item = data[0]
        viewModel.setProperty("/selectedKey", item.path)
        viewModel.setProperty("/main/title", item.title)
        viewModel.setProperty("/main/content", `<iframe src="${item.path}"></iframe>`);
        location.hash = item.path
      }
    });


  // application main
  const app = new sap.m.SplitApp({
    id: "mainApp",
    initialMaster: "initMaster",
    initialDetail: "initDetail",
    detailPages: [
      new sap.m.Page({
        id: "initDetail",
        enableScrolling: false,
        footer: new sap.m.Toolbar({
          style: "Standard",
          content: [
            new sap.m.ToolbarSpacer(),
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
        content: [
          new sap.ui.core.HTML({
            id: "previewHtml",
            content: `{/main/content}`,
            sanitizeContent: true
          })
        ]
      }),
    ],
    masterPages: [
      new sap.m.Page({
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
            new sap.m.SearchField({
              placeholder: "Search 🚀",
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
    ]
  })

  const shell = new sap.m.Shell({ app })

  shell.setModel(viewModel)
  shell.placeAt("content")

});