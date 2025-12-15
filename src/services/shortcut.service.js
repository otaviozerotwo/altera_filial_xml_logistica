const { spawn } = require('child_process');
const javaService = require('./java.service');

exports.executarPrograma = () => {
  const javaws = javaService.getJavaWsPath();

  spawn(javaws, [
    'http://192.0.1.11:8081/vendas-server/app/logistica-client.jnlp'
  ], {
    detached: true,
    stdio: 'ignore'
  }).unref();
};

