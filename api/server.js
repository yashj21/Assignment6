const express = require('express');
const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');
const { Kind } = require('graphql/language'); //not neededremove later

// const productsDB = [];



// function productList() {
//     return productsDB;
// }

// function productAdd(_, { product }) {
//     product.id = productsDB.length + 1;
//     productsDB.push(product);
//     return product;
// }


const app = express();
installHandler(app);
// app.use(express.static('public'));

const port = process.env.API_SERVER_PORT || 3000;
(async () => {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API Server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
// app.listen(4000, function () {
//     console.log('App started on port 3000');
// });
