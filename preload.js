const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  buscarOpcoes: () => ipcRenderer.invoke('buscar-opcoes'),
  processarOpcao: (dados) => ipcRenderer.invoke('processar-opcao', dados),
  fecharJanelaPrincipal: () => ipcRenderer.send('fechar-app')
});