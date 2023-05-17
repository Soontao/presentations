
sap.ui.getCore().attachInit(function () {

  if ('serviceWorker' in navigator && !window.location.host.includes("localhost")) {
    navigator.serviceWorker
      .register('sw.js')
      .then(regitration => {
        regitration.addEventListener("updatefound", () => {
          const worker = regitration.installing;
          worker.addEventListener('statechange', () => {
            if (worker.state === "activated") {
              sap?.m?.MessageToast?.show?.("The presentations have been updated.")
              refreshModel()
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

  async function refreshModel() {
    // data initialize
    return fetch("./presentations.json")
      .then(res => res.json())
      .then(data => {
        viewModel.setProperty("/presentationList", data)

        let initItem = undefined
        // if with prefefined presentation, select it
        if (location.hash.length > 0) {
          const hash = location.hash.substring(1)
          const item = data.find(({ path }) => path === hash)
          if (item !== undefined) {
            initItem = item
          }
        }

        initItem = initItem ?? data?.[0]
        if (initItem !== undefined) {
          viewModel.setProperty("/selectedKey", initItem.path)
          viewModel.setProperty("/main/title", initItem.title)
          viewModel.setProperty("/main/content", `<iframe src="${initItem.path}"></iframe>`);
          location.hash = initItem.path
        }
        else {
          sap.m.MessageToast.show("not found any presentation")
        }

      })
      .catch(console.error);
  }

  refreshModel() // refresh on init

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
    ]
  })

  app.setModel(viewModel)
  app.placeAt("content")

});