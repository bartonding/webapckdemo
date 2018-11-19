const WebpackCompilationHooks = require('./compilation.hooks')

class WebpackCompilerHooks {
  constructor(options) {
    this.iii = 1000;
    this.webpackCompilationHooks = new WebpackCompilationHooks()
  }
  // ================================================================
  beforeRun(compiler, callback) {
    console.log('...............................')
    callback()
  }
  // ================================================================
  apply(compiler) {
    this.tappingHoooks(compiler, [
      ['environment', 'tap'],
      ['afterEnvironment', 'tap'],
      ['entryOption', 'tap'],
      ['afterPlugins', 'tap'],
      ['afterResolvers', 'tap'],
      ['beforeRun', 'tapAsync'], // -w 模式下不触发
      ['run', 'tapAsync'], // -w 模式下不触发
      ['watchRun', 'tapAsync'], // 仅子啊 -w 模式下触发
      ['normalModuleFactory', 'tap'],
      ['contextModuleFactory', 'tap'],
      ['beforeCompile', 'tapAsync'],
      ['compile', 'tap'],
      ['thisCompilation', 'tap'],
      ['compilation', 'tap'],
      ['make', 'tapAsync'],
      ['afterCompile', 'tapAsync'],
      ['shouldEmit', 'tap'],
      ['emit', 'tapAsync'],
      ['afterEmit', 'tapAsync'],
      ['done', 'tapAsync'],

      ['additionalPass', 'tapAsync'],
      ['invalid', 'tap'],
      ['watchClose', 'tap'],
      ['failed', 'tap'],
    ])
    this.webpackCompilationHooks.apply(compiler)
  }
  tappingHoooks(compiler, taps) {
    const self = this
    taps.forEach(item => {
      const name = item[0], type = item[1], pluginName = `Compiler.Hooks.${name}`;
      // console.log(name, type)
      compiler.hooks[name][type](pluginName, function () {
        let args = [...arguments], lastArg;
        if (args.length > 0) lastArg = args[args.length - 1];

        console.log(`>>> ${++self.iii} ${pluginName}`, args.length)

        if (self[name]) { 
          self[name].call(null, ...args)
        } else if (type === 'tapAsync') {
          lastArg()
        }
      });
    });
  }
}

module.exports = WebpackCompilerHooks