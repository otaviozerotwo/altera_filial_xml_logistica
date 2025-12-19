const fs = require('fs');
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
    roundedCorners: false,
    titleBarStyle: 'hidden',
    titleBarOverlay : {
      color: '#78BEE2',
      symbolColor: '#000',
    },
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
    console.log('Conexão com o banco de dados bem-sucedida.');
    
    createWindow();
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
    const XML_PATH = require('./src/utils/generateXmlPath').generateXmlPath();

    if (!fs.existsSync(XML_PATH)) {
      const resposta = await dialog.showMessageBox(mainWindow, {
        type: 'warning',
        title: 'Arquivo não encontrado',
        message: 'Arquivo de configuração não encontrado. Deseja criá-lo?',
        buttons: ['Sim', 'Não'],
        defaultId: 0,
        cancelId: 1
      });

      if (resposta.response === 0) {
        await xmlService.criarXml({
          cdFilial: dados.cdFilial,
          cnpj: dados.cnpj,
          rzFilial: dados.rzFilial
        });
      } else {
        app.quit();
        return { sucesso: false, message: 'Operação cancelada pelo usuário.' };
      }
    } else {
      await xmlService.editarXml({
        cdFilial: dados.cdFilial,
        cnpj: dados.cnpj,
        rzFilial: dados.rzFilial
      });
    }
  
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