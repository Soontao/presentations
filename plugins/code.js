const { deflateSync } = require('zlib')

const diagramLangs = [
  "d2",
  'actdiag',
  'blockdiag',
  'bpmn',
  'bytefield',
  'c4plantuml',
  'ditaa',
  'dot',
  'erd',
  'excalidraw',
  'graphviz',
  'mermaid',
  'nomnoml',
  'nwdiag',
  'packetdiag',
  'pikchr',
  'plantuml',
  'rackdiag',
  'seqdiag',
  'svgbob',
  'umlet',
  'vega',
  'vegalite',
  'wavedrom',
]

const monacoLanguageMapping = {
  "js": "javascript",
  "ts": "typescript",
  "json5": "json",
  "jsonc": "json",
}

const entrypoint = 'https://kroki.io/'

/**
 * @type {import("markdown-it").PluginSimple} md 
 */
const codeBlockPlugin = (md) => {
  // each time render will create a new plugin
  const { fence } = md.renderer.rules
  let monacoCDNAdded = false
  const baseCDNUrl = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0'
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const info = md.utils.unescapeAll(tokens[idx].info).trim()

    if (info) {
      const lang = String(info?.split(/(\s+)/g)?.[0]).toLowerCase()

      if (diagramLangs.includes(lang)) {
        const data = deflateSync(tokens[idx].content).toString('base64url')
        return `<p><img style="max-height: 400px; max-width: 100%" src="${entrypoint}${lang}/svg/${data}"/></p>`
      }
      else {
        const containerId = `monaco-container-${Math.random().toString(36).substring(2, 15)}`

        let content = `<div id="${containerId}" class="monaco-preview-editor"></div>`
        if (monacoCDNAdded) {
          // do nothing
        }
        else {
          monacoCDNAdded = true
          content += `
          <script src="${baseCDNUrl}/min/vs/loader.js"></script>
          <script>
            require.config({ paths: { vs: '${baseCDNUrl}/min/vs' } });
          </script>
          `
        }
        content += `
          <script>
            require(['vs/editor/editor.main'], async function () {
              const editor = monaco.editor.create(document.getElementById('${containerId}'), {
                value: ${JSON.stringify(tokens[idx].content)},
                language: '${monacoLanguageMapping[lang] ?? lang}',
                fontSize: 22,
                tabSize: 2,
                insertSpaces: true,
                scrollBeyondLastLine: false,
                lineNumbers: 'off',
                wordWrap: 'on',
                minimap: { enabled: false },
                theme: 'vs-dark',
              });
            });
          </script>
        `
        return content
      }
    }

    return fence.call(self, tokens, idx, options, env, self)
  }
}

module.exports = codeBlockPlugin