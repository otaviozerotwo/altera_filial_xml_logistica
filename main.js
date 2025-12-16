const path = require('path');
const dotenv = require('dotenv');

const isProduction = process.env.NODE_ENV === 'production';

const envPath = isProduction
  ? path.join(process.resourcesPath, '.env')
  : path.join(__dirname, '.env');

dotenv.config({ path: envPath });

const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');

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
  createWindow();

  try {
    await dbService.testarConexao();
    console.log('Conexão com o banco de dados bem-sucedida.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
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