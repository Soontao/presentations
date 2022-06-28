
// plugin to make the hyper-link to open page in new tab

/**
 * @type {import("markdown-it").PluginSimple} md 
 */
function linkPlugin(md) {
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(['target', '_blank'])
    // pass token to default renderer.
    return self.renderToken(tokens, idx, options, env, self);
  };
}

module.exports = linkPlugin