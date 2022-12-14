import { dotenv, express, cors, chokidar, csvToJson, fs } from "./lib";
dotenv.config();

const app = express();
const port = process.env.PORT;
const watcher = chokidar.watch(__dirname + "/data/zyczenia.csv", {
  ignored: /^\./,
  persistent: true,
});

app
  .use(cors())
  .get("/api/", (req, res) => {
    const resultData = JSON.parse(
      fs.readFileSync(__dirname + "/data/data.json", "utf8")
    );
    const randomData = Math.floor(Math.random() * resultData.length);

    res.send([resultData[randomData]]);
  })

  .listen(port, () => {
    console.log(
      `\x1b[0mAplikacja działa na porcie :${port}. Baw się dobrze z danymi!\n`,
      `\x1b[34m\nlocalhost:${port} http://localhost:${port}/api/\x1b[0m\n`
    );
  });

watcher
  .on("add", () => {
    parseCsv();
    console.info(`Plik zyczenia.csv został pomyślnie wykryty!`);
  })
  .on("change", () => {
    parseCsv();
    console.info(`Nastąpiła modyfikacja pliku zyczenia.csv - parsuję...`);
  });

const parseCsv = () => {
  const jsonData = <Array<DataTypes>>[];
  const getJson = csvToJson.getJsonFromCsv(__dirname + "/data/zyczenia.csv");

  for (const data of getJson) {
    jsonData.push({
      id: parseInt(data.ID),
      nazwa: data.Nazwa,
      zyczenie: data.Zyczenie,
    });

    fs.writeFileSync(__dirname + "/data/data.json", JSON.stringify(jsonData));
  }
};

type DataTypes = {
  id: number;
  nazwa: string;
  zyczenie: string;
};
