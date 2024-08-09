
const process = require("process")
const path = require("path").posix
const fs = require("fs").promises

async function copyFile(source, target) {
  await fs.writeFile(
    target,
    await fs.readFile(source),
  )
}

function build(workspace = process.cwd(), outputDirectory = "dist") {

  require("colors")
  const os = require("os")

  const { trimPrefix } = require("@newdash/newdash/trimPrefix");
  const { concurrency } = require("@newdash/newdash/concurrency");
  const { findTitleForMarkdown } = require("./utils")
  const formats = (process.env.FORMATS || "html").split(",")
  const fileTypes = (process.env.FILE_TYPES || "marp").split(",")
  const git = require('git-rev-sync');

  const glob = require("fast-glob");
  const mkdirp = require("mkdirp");

  const toFileType = () => 'marp';

  (
    async () => {
      const presentationsFiles = await glob([
        "src/**/*.md",
        "!src/**/node_modules/**",
        "!src/**/node_modules/**",
        "!src/**/*example*/**"
      ], { cwd: workspace })
      // src/sap/cpi/cpi-sftp.md

      const marpCommand = require("@marp-team/marp-cli")
      const sourceBasePath = path.join(workspace, "./src")
      const targetBasePath = path.join(workspace, outputDirectory)

      const renderFile = concurrency.limit(
        async (presentationFile) => {

          const fileType = toFileType(presentationFile)

          // without 'src/' and 'dist/' prefix
          /**
           * sap/cf/xsuaa-and-multitenacy.md
           */
          const fileRelPath = trimPrefix(presentationFile, "src")
          /**
           * /sap/cf
           */
          const fileRelBaseDir = path.dirname(fileRelPath)

          // create -p ../dist/sap/cf
          await mkdirp.mkdirp(path.join(targetBasePath, fileRelBaseDir))

          const source = path.join(sourceBasePath, fileRelPath);

          let target = ''

          switch (fileType) {
            case 'marp':
              const targetBase = path.join(targetBasePath, fileRelPath)

              await Promise.all(
                formats.map(
                  format =>
                    marpCommand.marpCli([
                      source,
                      `--${format}`,
                      '-o',
                      `${targetBase}.${format}`
                    ]
                    )
                )
              )

              target = `${fileRelPath}.html`
              break;
            default:
              break;
          }

          const content = await fs.readFile(source, { encoding: "utf-8" })
          const title = findTitleForMarkdown(content)
          return {
            title, fileType, path: target
          }
        },
        os.cpus().length - 1
      )

      const navigation = await Promise.all(
        presentationsFiles
          .filter(filename => fileTypes.includes(toFileType(filename)))
          .map(renderFile)
      )

      await fs.writeFile(
        path.join(workspace, outputDirectory, "presentations.json"),
        JSON.stringify(navigation),
        { encoding: "utf-8" }
      )

      console.log("navigation file generated, total presentations: %s", navigation.length)

      await copyFile(
        path.join(sourceBasePath, "icon.png"),
        path.join(outputDirectory, "icon.png")
      )

      await copyFile(
        path.join(sourceBasePath, "index.html"),
        path.join(outputDirectory, "index.html")
      )

      const content = await fs.readFile(path.join(sourceBasePath, "sw.js"), 'utf-8')

      await fs.writeFile(
        path.join(workspace, outputDirectory, "sw.js"),
        content
          .replace(
            "DEFAULT_CACHE",
            `CACHE_REV_${git.short()}`
          )
          .replace(
            /CACHE_REV_.{7}/,
            `CACHE_REV_${git.short()}`,
          ),
        { encoding: "utf-8" }
      )

      process.exit()

    }
  )()
}

if (require.main === module) {
  build(path.join(__dirname, ".."))
}

module.exports = build