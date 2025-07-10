/**
 * global shared model, contains all data
 */
export const viewModel = new sap.ui.model.json.JSONModel({
  selectedKey: "",
  presentationList: [],
  main: {
    title: "Theo's Presentation List",
    content: "<div></div>",
  }
});

export async function refreshModel() {
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

export default viewModel