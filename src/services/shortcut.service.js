const { spawn } = require('child_process');
const javaService = require('./java.service');

exports.executarPrograma = () => {
  const javaws = javaService.getJavaWsPath();
  const URL_TELEVENDAS = process.env.URL_TELEVENDAS;

  spawn(javaws, [
    `${URL_TELEVENDAS}/app/logistica-client.jnlp`
  ], {
    detached: true,
    stdio: 'ignore'
  }).unref();
};

