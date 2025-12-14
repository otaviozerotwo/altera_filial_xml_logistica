const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: process.env.DB_ENCRYPT ? process.env.DB_ENCRYPT === 'true' : false,
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERT ? process.env.DB_TRUST_SERVER_CERT === 'true' : true
  }
};

exports.testarConexao = async () => {
  try {
    await sql.connect(config);
    await sql.close();
    return true;
  } catch (error) {
    throw new Error('Falha na conexão com o banco de dados.');
  }
};

exports.buscarOpcoes = async () => {
  try {
    await sql.connect(config);
  
    const result = await sql.query(
      `SELECT 
        cd_filial,
        cgc, 
        nm_fant 
      FROM 
        prc_filial
      WHERE
        cd_filial < 999`
    );
  
    return result.recordset;
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
    throw new Error('Não foi possível conectar ao banco de dados.');
  }
};