const os = require('os');

exports.getUserName = () => {
  const username = os.userInfo().username;

  return username;
};