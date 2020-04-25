const glob = require("fast-glob");
const fs = require("fs").promises;
const { parse } = require("@textlint/markdown-to-ast");
const { get, find } = require("lodash");
const path = require("path");
const pretty = require("pretty")

const findTitleForMarkdown = (content) => {
  const ast = parse(content);
  const titles = get(ast, "children", [])
  const firstTitle = find(titles, { type: "Header", depth: 1 })
  const firstTitleName = get(firstTitle, "children[0].value", "Unknown")
  return firstTitleName
};

const formatPresentationName = (s = "") => {
  return `${s.substring(4, s.length - 3)}.html`
};


const generateIndexHtml = (f) => `
<!DOCTYPE html>
<html>

<head>
  <title>Presentation List</title>
  <script 
    id="sap-ui-bootstrap" 
    src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
    data-sap-ui-theme="sap_belize" 
    data-sap-ui-libs="sap.m" 
    data-sap-ui-resourceroots='{"index": "./"}'
    data-sap-ui-async="true"
    displayBlock="true"
  >
  </script>
</head>

<body class="sapUiBody" id="content">
</body>

<script>
  sap.ui.getCore().attachInit(function () {
    const navData = ${JSON.stringify(f, undefined, 2)}
    const list = new sap.m.SelectList({
      items: {
        path: "/",
        template: new sap.ui.core.ListItem({
          text: "{title}"
        })
      },
      itemPress: event => {
        const presentationPath = event.getParameter("item").getBindingContext().getObject("path")
        window.open(presentationPath)
      }
    })
    list.setModel(new sap.ui.model.json.JSONModel(navData))
    list.placeAt("content")
  });
</script>

</html>
`

const readFile = file => fs.readFile(file, { encoding: "UTF-8" });

(
  async () => {

    const files = await glob("src/**/*.md", {})
    const presentations = await Promise.all(files.map(async file => {
      const content = await readFile(file)
      return { title: findTitleForMarkdown(content), path: formatPresentationName(file), }
    }))

    await fs.writeFile(
      path.join(__dirname, "../dist/index.html"),
      pretty(generateIndexHtml(presentations)),
      { encoding: "UTF-8" }
    )

  }
)()


module.exports = {
  findTitleForMarkdown
}
