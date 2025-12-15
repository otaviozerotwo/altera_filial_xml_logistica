const { exec } = require('child_process');
const os = require('os');
const path = require('path');

const USERNAME = os.userInfo().username;
const SHORTCUT_PATH= path.join('C:', 'Users', USERNAME, 'Desktop', 'AnyDesk.exe'); // TODO: inserir atalho do Gestão Logistica

exports.executarPrograma = () => {
  exec(`"${SHORTCUT_PATH}"`);
};