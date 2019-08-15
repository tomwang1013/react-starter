const path = require('path');
const ipv4 = require('node-local-ipv4');
const projectCtx = path.resolve(__dirname, '..');

function resolve(dir) {
  return path.resolve(projectCtx, dir);
}

function normalizeUrl(url) {
  return url.replace(/[\\]/g, '/');
}

function normalizeExpr(source) {
  if (path.sep !== '/') {
    source = source.replace(/\//g, '\\\\');
  }
  return RegExp(source);
}

function localIp() {
  return ipv4();
}

module.exports = {
  projectCtx,
  releaseCtx: resolve('dist'),
  sourceCtx: resolve('src'),
  localIp,
  resolve,
  normalizeUrl,
  normalizeExpr
};
