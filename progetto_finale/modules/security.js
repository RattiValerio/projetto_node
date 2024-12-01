const bcrypt = require('bcrypt');
let hashPassword = async function(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

let compareHash = async function(p1, p2) {
    if(await bcrypt.compare(p1, p2)){
        return true
    }else{
        return false;
    }
}

exports.hashPassword = hashPassword;
exports.compareHash = compareHash;