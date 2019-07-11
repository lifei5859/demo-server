const crypto = require('crypto');
const fs = require('fs');

module.exports={
  md5 (buffer) {
    let obj=crypto.createHash('md5');
    obj.update(buffer);

    return obj.digest('hex');
  },
  resJson (status, data) {
    return {status, data}
  },
  remove (path) {
    return new Promise((resolve, reject)=>{
      fs.unlink(path, (err)=>{
        if(err){
          reject(err);
        }else{
          resolve();
        }
      });
    });
  }
};