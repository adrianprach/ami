const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro'); 

const config = getDefaultConfig(__dirname);

// your metro modifications

module.exports = withUniwindConfig(config, {
  cssEntryFile: './app/global.css',
  dtsFile: './app/uniwind-types.d.ts',
  /** Registered with Uniwind so `jane:` / `oscar:` variants and `setTheme()` work */
  extraThemes: ['jane', 'oscar'],
});