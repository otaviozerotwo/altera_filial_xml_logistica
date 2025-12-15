const { execSync } = require('child_process');
const path = require('path');

function lerRegistro(regPath) {
  try {
    return execSync(`reg query "${regPath}" /v JavaHome`, { encoding: 'utf8' });
  } catch (error) {
    return null;
  }
}

exports.getJavaWsPath = () => {
  const bases = [
    'HKLM\\SOFTWARE\\JavaSoft\\Java Runtime Environment',
    'HKLM\\SOFTWARE\\WOW6432Node\\JavaSoft\\Java Runtime Environment'
  ];

  for (const base of bases) {
    try {
      const versionOut = execSync(
        `reg query "${base}" /v CurrentVersion`,
        { encoding: 'utf8' }
      );

      const version = versionOut.split('REG_SZ')[1].trim();

      const javaHomeOut = lerRegistro(`${base}\\${version}`);
      if (!javaHomeOut) continue;

      const javaHome = javaHomeOut.split('REG_SZ')[1].trim();

      return path.join(javaHome, 'bin', 'javaws.exe');
    } catch {
      continue;
    }
  }

  throw new Error('Java não encontrado no sistema.');
};