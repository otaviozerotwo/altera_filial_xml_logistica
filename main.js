const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
require('dotenv').config();

const dbService = require('./src/services/db.service');
const xmlService = require('./src/services/xml.service');
const shortcutService = require('./src/services/shortcut.service');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 528,
    height: 250,
    resizable: false,
    minimizable: false,
    titleBarStyle: 'hidden',
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    webPreferences: {
      preload: __dirname + '/preload.js'
    }
  });

  mainWindow.loadFile('./src/renderer/index.html');

  Menu.setApplicationMenu(null);
}

app.whenReady().then(async () => {
  try {
    await dbService.testarConexao();

    createWindow();
  } catch (error) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Erro de conexão',
      message: error.message,
      buttons: ['OK']
    });

    app.quit();
  }
});

ipcMain.handle('buscar-opcoes', async () => {
  try {
    return await dbService.buscarOpcoes();
  } catch (error) {
    return {
      sucesso: false,
      mensagem: error.message,
    };
  }
});

ipcMain.handle('processar-opcao', async (event, dados) => {
  console.log('Dados recebidos no main:', dados);
  
  try {
    await xmlService.editarXml({
      cdFilial: dados.cdFilial,
      cnpj: dados.cnpj,
      rzFilial: dados.rzFilial
    });
  
    shortcutService.executarPrograma();
  
    if (mainWindow) mainWindow.close();
    
    return { sucesso: true }
  } catch (error) {
    console.error('Erro ao processar opção:', error);
    return {
      sucesso: false,
      message: error.message
    };
  }
});

ipcMain.on('fechar-app', () => {
  app.quit();
})