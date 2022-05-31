"use strict";
require("env2")(".env");
const Hapi = require("hapi");
const axios = require("axios");
const convert = require("xml-js");
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: true,
    },
  });
  server.route({
    method: "GET",
    path: "/",
    handler: async (request, h) => {
      //get data from xml api
      let url = `http://api.elevenia.co.id/rest/prodservices/product/listing`;
      // fetch data from url as xml
      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/xml",
          openapikey: process.env.API_KEY,
        },
      });
      let data = convert.xml2json(response.data, { compact: true, spaces: 4 });
      let products = JSON.parse(data).Products.product;
      //   iterate through array of products
      let array = [];
      products.map((product) => {
        array.push({
          name: product.prdNm._text,
          sku: product.sellerPrdCd._text,
          price: product.selPrc._text,
          description: product.htmlDetail
            ? product.htmlDetail._text
            : product.htmlDetail,
          image: product.prdImage01
            ? product.prdImage01._text
            : product.prdImage01,
        });
      });
      //   insert data into database if sku doesn't exist
      for (let i = 0; i < array.length; i++) {
        let select = `SELECT * FROM product WHERE sku = '${array[i].sku}'`;
        let result = await request.pg.client.query(select);
        if (result.rowCount === 0) {
          let insert = `INSERT INTO product (name, sku, price, description, image) VALUES ('${array[i].name}', '${array[i].sku}', '${array[i].price}', '${array[i].description}', '${array[i].image}')`;
          await request.pg.client.query(insert);
        }
      }
      let selectAll = `SELECT * FROM product`;
      let result = await request.pg.client.query(selectAll);
      // delete undefined keys from result
      let arrayResult = [];
      result.rows.map((row) => {
        // remove undefined keys
        let obj = {};
        Object.keys(row).map((key) => {
          if (row[key] !== 'undefined') {
            obj[key] = row[key];
          }
        });
        arrayResult.push(obj);
      });

      return h.response(arrayResult);
    },
  });
  await server.register(require("hapi-postgres-connection"));
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
