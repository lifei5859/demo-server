const fs=require('fs');
const {KEY_LEN, KEY_COUNT} = require('../config')

const CHARS='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>?,./;[]{}!@#$%^&*()_+';

let arr=[];
for(let i=0;i<KEY_COUNT;i++){
  let key='';

  for(let j=0;j<KEY_LEN;j++){
    key+=CHARS[Math.floor(Math.random()*CHARS.length)];
  }

  arr.push(key);
}

fs.writeFileSync('.keys', arr.join('\n'));
console.log(`generated ${KEY_COUNT} keys`);