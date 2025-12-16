const path = require('path');
const getUserName = require('../utils/getUserName');

const USER_NAME = getUserName.getUserName();

exports.generateXmlPath = () => {
  const xmlPath = path.join('C:', 'Users', USER_NAME, 'Itecbrazil', 'logistica.xml');

  return xmlPath;
};