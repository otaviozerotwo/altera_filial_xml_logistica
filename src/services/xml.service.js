const fs = require('fs');
const xml2js = require('xml2js');
const os = require('os');
const path = require('path');

const USERNAME = os.userInfo().username;
const XML_PATH = path.join('C:', 'Users', USERNAME, 'Itecbrazil', 'logistica.xml');

exports.editarXml = async ({ cdFilial, cnpj, rzFilial }) => {
  console.log('Dados recebidos no XML:', { cdFilial, cnpj, rzFilial }); // TODO: tratar CNPJ (retirar pontos e barra)
  
  const xml = fs.readFileSync(XML_PATH);
  const json = await xml2js.parseStringPromise(xml);

  const root = json['br.itecbrazil.core.config.ArquivoConfiguracao'];

  if (!root || !root.filialTelevendas || !root.filialTelevendas[0]) {
    throw new Error('Estrutura do XML inválida');
  }

  const filial = root.filialTelevendas[0];

  filial.cdFilial[0] = String(cdFilial);
  filial.cnpj[0] = String(cnpj);
  filial.rzFilial[0] = String(rzFilial);

  const builder = new xml2js.Builder();
  const newXml = builder.buildObject(json);

  fs.writeFileSync(XML_PATH, newXml);
};