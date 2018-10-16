class WebpackCompilationHooks {
    constructor(options) {
      this.iii = 2000;
      this.mapcache = new Set()
    }
    counter(hookName) {
      if (!this.mapcache.has(hookName)) {
        this.mapcache.add(hookName)
        this.iii += 1;
        return true;
      }
      return false
    }
    // buildModule() {
    //   console.log('~~~~~~~~~~~~~~~~~~~~ buildModule')
    // }
    apply(compiler) {
      compiler.hooks.thisCompilation.tap('compilation.hooks.test', (compilation, params) => {
        // console.log('++++++++++++++ compilation.hooks.test')
        this.tappingHoooks(compilation, [
          ['buildModule', 'tap'],
          ['rebuildModule', 'tap'],
          ['failedModule', 'tap'],
          ['succeedModule', 'tap'],
          ['dependencyReference', 'tap'],
          ['finishModules', 'tap'],
          ['finishRebuildingModule', 'tap'],
          ['unseal', 'tap'],
          ['seal', 'tap'],
          ['beforeChunks', 'tap'],
          ['afterChunks', 'tap'],
          ['optimizeDependenciesBasic', 'tap'],
          ['optimizeDependencies', 'tap'],
          ['optimizeDependenciesAdvanced', 'tap'],
          ['afterOptimizeDependencies', 'tap'],
          ['optimize', 'tap'],
          ['optimizeModulesBasic', 'tap'],
          ['optimizeModules', 'tap'],
          ['optimizeModulesAdvanced', 'tap'],
          ['afterOptimizeModules', 'tap'],
          ['optimizeChunksBasic', 'tap'],
          ['optimizeChunks', 'tap'],
          ['optimizeChunksAdvanced', 'tap'],
          ['afterOptimizeChunks', 'tap'],
          ['optimizeTree', 'tapAsync'],
          ['afterOptimizeTree', 'tap'],
          ['optimizeChunkModulesBasic', 'tap'],
          ['optimizeChunkModules', 'tap'],
          ['optimizeChunkModulesAdvanced', 'tap'],
          ['afterOptimizeChunkModules', 'tap'],
          ['shouldRecord', 'tap'],
          ['reviveModules', 'tap'],
          ['optimizeModuleOrder', 'tap'],
          ['advancedOptimizeModuleOrder', 'tap'],
          ['beforeModuleIds', 'tap'],
          ['moduleIds', 'tap'],
          ['optimizeModuleIds', 'tap'],
          ['afterOptimizeModuleIds', 'tap'],
          ['reviveChunks', 'tap'],
          ['optimizeChunkOrder', 'tap'],
          ['beforeChunkIds', 'tap'],
          ['optimizeChunkIds', 'tap'],
          ['afterOptimizeChunkIds', 'tap'],
          ['recordModules', 'tap'],
          ['recordChunks', 'tap'],
          ['beforeHash', 'tap'],
          ['contentHash', 'tap'],
          ['afterHash', 'tap'],
          ['recordHash', 'tap'],
          ['record', 'tap'],
          ['beforeModuleAssets', 'tap'],
          ['shouldGenerateChunkAssets', 'tap'],
          ['beforeChunkAssets', 'tap'],
          ['additionalChunkAssets', 'tap'],
          ['additionalAssets', 'tapAsync'],
          ['optimizeChunkAssets', 'tapAsync'],
          ['afterOptimizeChunkAssets', 'tap'],
          ['optimizeAssets', 'tapAsync'],
          ['afterOptimizeAssets', 'tap'],
          ['needAdditionalSeal', 'tap'],
          ['afterSeal', 'tapAsync'],
          ['chunkHash', 'tap'],
          ['moduleAsset', 'tap'],
          ['chunkAsset', 'tap'],
          ['assetPath', 'tap'],
          ['needAdditionalPass', 'tap'],
          ['childCompiler', 'tap'],
          ['normalModuleLoader', 'tap'],
          ['optimizeExtractedChunksBasic', 'tap'],
          ['optimizeExtractedChunks', 'tap'],
          ['optimizeExtractedChunksAdvanced', 'tap'],
          ['afterOptimizeExtractedChunks', 'tap'],
        ])
      })
    }
    tappingHoooks(compilation, taps) {
      const self = this
      self.mapcache.clear()
      taps.forEach(item => {
        const name = item[0], type = item[1], pluginName = `Compilation.Hooks.${name}`;
        // console.log('--- ', name, type)
        compilation.hooks[name][type](pluginName, function () {
          let args = [...arguments], lastArg;
          if (args.length > 0) lastArg = args[args.length - 1];
          
          if (self.counter(name)) {
            console.log(`>>> ${self.iii} ${pluginName}`, args.length)
          }
  
          if (self[name]) { 
            self[name].call(null, ...args)
          } else if (type === 'tapAsync') {
            lastArg()
          }
        });
      });
    }
  }
  
  module.exports = WebpackCompilationHooks