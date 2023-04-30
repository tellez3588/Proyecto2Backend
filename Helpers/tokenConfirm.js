const crypto = require('crypto');

function generateMD5Token() {
  // Generar un token aleatorio de 32 bytes
  const token = crypto.randomBytes(32).toString('hex');
  
  // Hash del token con MD5
  const md5sum = crypto.createHash('md5');
  md5sum.update(token);
  const md5Token = md5sum.digest('hex');
  
  return md5Token;
}


module.exports = { generateMD5Token }