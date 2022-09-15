import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { writeFileSync, watch } from "fs";
import csvToJson from "convert-csv-to-json";

var app = express();
var port = process.env.PORT;

watch(__dirname + "/data/zyczenia.csv", (event, filename) => {
  const getJson = csvToJson.getJsonFromCsv(__dirname + "/data/" + filename);

  type DataTypes = {
    ID: string;
    Nazwa: string;
    Zyczenie: string;
  };

  const jsonData = <Array<DataTypes>>[];

  for (let i = 0; i < getJson.length; i++) {
    jsonData.push(getJson[i]);
  }

  writeFileSync(__dirname + "/data/data.json", JSON.stringify(jsonData));
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/data/data.json");
});

app.listen(port, () => {
  console.log(`Aplikacja działa na porcie :${port}. Baw się dobrze z danymi! \n
  localhost:${port} http://localhost:${port}`);
});
