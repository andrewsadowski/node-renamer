const fs = require("fs");
const argv = require("yargs")
  .alias("p", "path")
  .usage("Usage: add path with the -p flag")
  .example('node renamer.js -p "./pathToFilesToRename"')
  .help("h").argv;

let PATH;

if (argv === "p") {
  PATH = argv.p;
} else {
  PATH = "./files/";
}

const START_INDEX = 1;

fs.readdir(PATH, (err, files) => {
  files.forEach((file, index) => {
    const oldName = file;
    const newName =
      formatNumber(START_INDEX + index) + ".txt";
    fs.rename(PATH + oldName, PATH + newName, err => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(
          "Renamed " + oldName + " to " + newName
        );
      }
    });
  });
});

function formatNumber(n) {
  if (n < 10) {
    return "00" + n;
  } else if (n < 100) {
    return "0" + n;
  }
  return n;
}
