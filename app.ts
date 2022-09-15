import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import csvToJson from "convert-csv-to-json";

var app = express();
var port = process.env.PORT;

type DataTypes = {
  ID: number;
  Nazwa: string;
  Zyczenie: string;
}

const jsonData: Array<DataTypes> = [];

let json = csvToJson.getJsonFromCsv(__dirname + "/data/zyczenia.csv");
for (let i = 0; i < json.length; i++) {
  jsonData.push(json[i]);
}

app.get("/", (req, res) => {
  return res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Aplikacja działa na porcie :${port}. Baw się dobrze z danymi! \n
  localhost:${port} http://localhost:${port}`);
});
