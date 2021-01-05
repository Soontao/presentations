const glob = require("fast-glob");
const fs = require("fs").promises;
const { parse } = require("@textlint/markdown-to-ast");
const { get, find } = require("@newdash/newdash-node");
const path = require("path");

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

const readFile = file => fs.readFile(file, { encoding: "UTF-8" });

(
  async () => {

    const files = await glob(["src/**/*.md", "!src/**/node_modules/**"], {})
    const presentations = await Promise.all(files.map(async file => {
      const content = await readFile(file)
      return { title: findTitleForMarkdown(content), path: formatPresentationName(file), }
    }))

    await fs.writeFile(
      path.join(__dirname, "../dist/presentations.json"),
      JSON.stringify(presentations, undefined, 2),
      { encoding: "UTF-8" }
    )

  }
)()


module.exports = {
  findTitleForMarkdown
}
