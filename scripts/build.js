

if (require.main == module) {

  require("colors")
  const path = require("path").posix
  const fs = require("fs").promises
  const { trimPrefix } = require("@newdash/newdash/trimPrefix");
  const { trimSuffix } = require("@newdash/newdash/trimSuffix");
  const { findTitleForMarkdown } = require("./utils")

  const formats = (process.env.FORMATS || "html,pdf,pptx").split(",")
  const fileTypes = (process.env.FILE_TYPES || "marp,slidev").split(",")

  const child_process = require("child_process")
  const cwdPath = path.join(__dirname, "..")

  const glob = require("fast-glob");
  const mkdirp = require("mkdirp");

  const toFileType = (filename) => filename.endsWith(".slidev.md") ? 'slidev' : 'marp';

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
      const slidevCommand = path.join(
        __dirname,
        "..",
        "./node_modules/@slidev/cli/bin/slidev.js"
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
              case "slidev":
                const fileName = path.basename(presentationFile, ".slidev.md")
                const localFsTargetBase = path.join(
                  targetBasePath,
                  fileRelBaseDir,
                  fileName
                )
                await mkdirp(localFsTargetBase)
                const cmdParts = [
                  "node",
                  slidevCommand,
                  "build",
                  "--base",
                  "''",
                  source,
                  "-o",
                  localFsTargetBase
                ];
                const localFsTargetIndexHtml = path.join(localFsTargetBase, "index.html")
                target = path.join(fileRelBaseDir, fileName, "index.html")
                child_process.execSync(cmdParts.join(" "), { cwd: cwdPath })
                const indexPage = await fs.readFile(
                  localFsTargetIndexHtml,
                  { encoding: "utf-8" }
                )
                // overwrite base dir
                await fs.writeFile(
                  localFsTargetIndexHtml,
                  indexPage
                    .replace(
                      /src=\"assets/g,
                      `src="${fileRelBaseDir}/${fileName}/assets`,
                      -1
                    )
                    .replace(
                      /href=\"assets/g,
                      `href="${fileRelBaseDir}/${fileName}/assets`,
                      -1
                    ),
                  { encoding: "utf-8" }
                )
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