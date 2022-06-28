
module.exports = ({ marp }) => {
  return marp
    .use(require('./plugins/code'))
    .use(require('./plugins/link'))
}