const path = require('path');
const alias = require('./config/aliases');

const srcPath = './src';
const aliases = alias(srcPath);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ])
);

module.exports = {
  webpack: {
    alias: resolvedAliases,
  },
};
