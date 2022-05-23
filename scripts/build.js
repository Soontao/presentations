
const process = require("process")
const path = require("path").posix

function build(cwdPath = process.cwd()) {

  require("colors")
  const fs = require("fs").promises
  const { trimPrefix } = require("@newdash/newdash/trimPrefix");
  const { findTitleForMarkdown } = require("./utils")
  const formats = (process.env.FORMATS || "html").split(",")
  const fileTypes = (process.env.FILE_TYPES || "marp").split(",")

  const child_process = require("child_process")

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
      ], { cwd: cwdPath })
      // src/sap/cpi/cpi-sftp.md

      const marpCommand = path.join(
        __dirname,
        "..",
        "./node_modules/@marp-team/marp-cli/marp-cli.js"
      )
      const sourceBasePath = path.join(__dirname, "../src")
      const targetBasePath = path.join(__dirname, "../dist")

      const navigation = await Promise.all(
        presentationsFiles
          .filter(filename => fileTypes.includes(toFileType(filename)))
          .map(async (presentationFile) => {

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
            await mkdirp(path.join(targetBasePath, fileRelBaseDir))

            const source = path.join(sourceBasePath, fileRelPath);

            let target = ''

            switch (fileType) {
              case 'marp':
                const targetBase = path.join(targetBasePath, fileRelPath)
                const marpCmd = (format) => [
                  'node',
                  marpCommand,
                  source,
                  `--${format}`,
                  '-o',
                  `${targetBase}.${format}`
                ].join(" ");

                formats.forEach(format => {
                  child_process.execSync(marpCmd(format), { cwd: cwdPath })
                })

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
          })
      )

      await fs.writeFile(
        path.join(cwdPath, "dist/presentations.json"),
        JSON.stringify(navigation),
        { encoding: "utf-8" }
      )

      console.log("navigation file generated, total presentations: %s", navigation.length)

      process.exit()


    }
  )()
}

if (require.main === module) {
  build(path.join(__dirname, ".."))
}

module.exports = build