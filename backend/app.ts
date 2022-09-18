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
  id: number;
  nazwa: string;
  zyczenie: string;
};

function parseCsvData() {
  const getJson = csvToJson.getJsonFromCsv(__dirname + "/data/zyczenia.csv");
  const jsonData = <Array<DataTypes>>[];

  for (const data of getJson) {
    const parsedData = {
      "id": parseInt(data.ID),
      "nazwa": data.Nazwa,
      "zyczenie": data.Zyczenie
    }

    jsonData.push(parsedData);
  }

  writeFileSync(__dirname + "/data/data.json", JSON.stringify(jsonData));
}

watcher.on("add", () => parseCsvData()).on("change", () => parseCsvData());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', Boolean(true).toString());
  next();
});

app.get("/api/", (req, res) => {
  res.sendFile(__dirname + "/data/data.json");
});

app.listen(port, () => {
  console.log(
    `\x1b[0mAplikacja działa na porcie :${port}. Baw się dobrze z danymi!`,
    `\x1b[34m\nlocalhost:${port} http://localhost:${port}\x1b[0m`
  );
});
