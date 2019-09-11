module.exports = function(api) {
  api.cache(true);
  const presets = [
    [
      "@babel/env",
      {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    "@babel/react"
  ];
  const plugins = [
    "react-hot-loader/babel",
    "@babel/plugin-proposal-class-properties"
  ];
  return {
    presets,
    plugins,

    // 解决编译react-hot-loader的编译问题：https://github.com/babel/babel/issues/9187
    sourceType: "unambiguous"
  }
}