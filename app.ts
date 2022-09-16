import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import chokidar from "chokidar";
import csvToJson from "convert-csv-to-json";
import { writeFileSync } from "fs";

var app = express();
var port = process.env.PORT;

var watcher = chokidar.watch(__dirname + "/data/zyczenia.csv", {
  ignored: /^\./,
  persistent: true,
});

type DataTypes = {
  ID: string;
  Nazwa: string;
  Zyczenie: string;
};

function parseCsvData() {
  const getJson = csvToJson.getJsonFromCsv(__dirname + "/data/zyczenia.csv");
  const jsonData = <Array<DataTypes>>[];

  for (const data of getJson) {
    jsonData.push(data);
  }

  writeFileSync(__dirname + "/data/data.json", JSON.stringify(jsonData));
}

watcher
  .on("add", () => parseCsvData())
  .on("change", () => parseCsvData());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/data/data.json");
});

app.listen(port, () => {
  console.log(
    `\x1b[0mAplikacja działa na porcie :${port}. Baw się dobrze z danymi!`,
    `\x1b[34m\nlocalhost:${port} http://localhost:${port}\x1b[0m`
  );
});
