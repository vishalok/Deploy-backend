
require('dotenv').config();
module.exports={
    DB_Name:"bookstore",  
    DB_URL: process.env.Dblocal,
    DB_PROD_URL: process.env.DbUrl
}

//console.log('DB Production URL:', process.env.DbUrl);
