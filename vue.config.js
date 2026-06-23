const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // COMENTAR O ELIMINAR ESTA LINEA:
  // outputDir: '../API/wwwroot',
  
  // USAR CONFIGURACION PARA PRODUCCION:
  outputDir: process.env.NODE_ENV === 'production' 
    ? 'dist'  // Para producción: genera en carpeta dist local
    : '../API/wwwroot',  // Para desarrollo: integra con API
  
  publicPath: '/',
  
   configureWebpack: {
    resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
              '@mod1': path.resolve(__dirname, './SIPRED-MOD001/src'),
              '@mod2': path.resolve(__dirname, './SIPRED-MOD002/src'),
              '@ue': path.resolve(__dirname, './UnidadEmpleo/src'),
      },
	  },
    devtool: 'source-map'
   },
	  
  devServer: {
    port: 8080,
    hot: true
  }
})