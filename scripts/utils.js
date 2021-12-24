const { parse } = require("@textlint/markdown-to-ast");
const { get, find } = require("@newdash/newdash");

const findTitleForMarkdown = (content) => {
  const ast = parse(content);
  const titles = get(ast, "children", [])
  const firstTitle = find(titles, { type: "Header", depth: 1 })
  const firstTitleName = get(firstTitle, "children[0].value", "Unknown")
  return firstTitleName
};


module.exports = {
  findTitleForMarkdown
}
