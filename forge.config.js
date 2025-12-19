const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    extraResource: [
      path.resolve(__dirname, './.env')
    ],
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   config: {
    //     name: 'AlterFilialLogistica',
    //     authors: 'Otávio Cardoso',
    //     setupExe: 'LauncherLogisticaSetup.exe',
    //     setupIcon: 'assets/icon.ico',
    //     iconUrl: 'https://servidor-imagens.vercel.app/icon.ico',
    //     loadingGif: 'assets/splash.gif'
    //   },
    // }, 
    {
      name: '@electron-forge/maker-nsis',
      config: {
        oneClick: false, // instalador passo-a-passo
        perMachine: true, // instala para todos os usuários
        allowToChangeInstallationDirectory: true,

        shortcutName: 'Gestão Logística',
        uninstallDisplayName: 'Gestão Logística',

        installerIcon: './assets/icon.ico',
        uninstallerIcon: './assets/icon.ico',

        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        startMenuFolderName: 'Gestão Logística',

        runAfterFinish: true, // opção "Executar ao finalizar"
      },
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
