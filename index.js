const fetch = require("node-fetch");
const express = require("express");
const url = "https://www.iwillfearnoevil.com/screen/string.txt";

function findThreeLowestInts(text) {
  let set = new Set();
  let textArray = text.split(/\r?\n/);
  textArray.forEach(element => {
      num = parseInt(element);
      if (num || num === 0) { set.add(parseInt(num)); }
  });
  let numArray = Array.from(set).sort((a,b) => { return a - b });
  let smallestInts = (numArray.length > 3) ? numArray.slice(0,3) : numArray;
  return smallestInts;
}

async function getData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const result = findThreeLowestInts(data);
        resolve(result);
      })
      .catch(err => reject(err));
  })
}

const app = express();
const port = process.env.PORT || 8080;
app.get('/',async (req, res) => {
  try {
    const result = await getData(url);
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
