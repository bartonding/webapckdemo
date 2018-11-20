const path = require('path')
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

class ChildCompilationPlugin {
  constructor() {
    // Define compilation name and output name
    this.childCompilerName = 'child-compilation-plugin';
    this.outputFileName = 'custom-file.html';
    // To make child compiler work, you have to have a entry in the file system
    this.compilationEntry = './src/pages/index.html';
  }
  
  getFullPath(context) {
    let entry = this.compilationEntry;
    return 'file-loader?name=[name].[ext]'
      + '!' + path.resolve(context, entry)
  }

  apply(compiler) {
    let self = this;
    this.compilationEntry = this.getFullPath(compiler.context);
    // Listen to `make` event
    compiler.hooks.make.tapAsync(self.childCompilerName, (compilation, callback) => {
      // Creating child compiler with params
      const childCompiler = compilation.createChildCompiler(
        this.childCompilerName, 
        {
          filename: this.outputFileName
        }
      );

      // Everyone plugin does this, I don't know why
      childCompiler.context = compiler.context;

      // Add SingleEntryPlugin to make all this work
      // childCompiler.apply(new SingleEntryPlugin(
      //   compiler.context, 
      //   this.compilationEntry, 
      //   this.outputFileName
      // ));
      new SingleEntryPlugin(
        compiler.context, 
        this.compilationEntry, 
        this.outputFileName
      ).apply(childCompiler);

      // Needed for HMR. Even if your plugin don't support HMR,
      // this code seems to be always needed just in case to prevent possible errors
      childCompiler.hooks.compilation.tap(self.childCompilerName, (compilation) => {
        let name = self.childCompilerName;
        if (compilation.cache) {
          if (!compilation.cache[name]) {
            compilation.cache[name] = {};
          }

          compilation.cache = compilation.cache[name];
        }
      });

      // Run child compilation
      childCompiler.runAsChild((err, entries, childCompilation) => {
        callback(err);
      });
    });
  }
}

module.exports = ChildCompilationPlugin;
