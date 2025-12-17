const fs = require('fs');
const xml2js = require('xml2js');
const generateXmlPath = require('../utils/generateXmlPath');

const XML_PATH = generateXmlPath.generateXmlPath();

exports.criarXml = async ({ cdFilial, cnpj, rzFilial }) => {
  console.log('Criando novo arquivo XML com os dados:', { cdFilial, cnpj, rzFilial });

  const estruturaInicial = {
    'br.itecbrazil.core.config.ArquivoConfiguracao': {
      filialTelevendas: [
        {
          cdEmp: ['1'],
          cdFilial: [String(cdFilial)],
          cnpj: [String(cnpj)],
          ie: ['INSC_EST'],
          rzFilial: [String(rzFilial)],
          flagDescVlr: ['false'],
          vlrVendDesc: ['0.0'],
          percDescVenda: ['0.0'],
          blqDescPgtoPrazo: ['0'],
          senhaUsuPharmaLink: ['1166941951'],
          uf: ['MG'],
          numero: ['S/N'],
          cdRota: [''],
          dsRota: [''],
          telefone: [''],
          filialPolo: ['true'],
          centralizadora: ['true'],
          lojaCentralizadora: ['1'],
          filialControlaLote: ['false'],
        },
      ],
      timeOut: ['30000'],
      connectTimeout: ['15000'],
      readTimeout: ['60000'],
      servidorInicalizacao: ['192.0.1.11:8081'], // TODO: pegar da variável URL_TELEVENDAS
      cdEmp: ['1'],
      checkOut: ['false'],
      quantidadeVias: ['1'],
      ramal: ['0'],
      impressaoAutomaticaBalcao: ['false'],
      balcaoLoja: ['false'],
      gestaoOrcamento: ['false'],
      televendas: ['false'],
      hosts: [
        {
          string: ['192.0.1.11:8081'], // TODO: pegar da variável URL_TELEVENDAS
        },
      ],
      timeZone: ['America/Sao_Paulo'],
      impressaoAutomaticaEtiqueta: ['false'],
      impressoraAutomaticaEtiqueta: [''],
      impressoraAutomaticaDanfe: [''],
    },
  };

  const builder = new xml2js.Builder();
  const newXml = builder.buildObject(estruturaInicial);

  fs.writeFileSync(XML_PATH, newXml);
  console.log('Arquivo XML criado com sucesso:', XML_PATH);
};

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