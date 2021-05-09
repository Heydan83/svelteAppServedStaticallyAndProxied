const express = require('express');
const fetch = require('cross-fetch');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
  }
);

app.post('/countries/:country', async (req, res) => {
  try {
    console.log('req.params: ', req.params);
    const { country } = req.params;
    const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    const data = await response.json();

    res.send({ data })
  } catch (err) {
    res.send({ error: err.message })
  }
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});