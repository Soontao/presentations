
module.exports = ({ marp }) => {
  return marp
    .use(require('./plugins/kroki'))
    .use(require('./plugins/link'))
}