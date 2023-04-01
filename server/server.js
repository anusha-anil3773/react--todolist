const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const pgp = require('pg-promise')()
const db = pgp('postgresql://postgres:1997@localhost:5432/todoDB')


//midddleware
app.use(cors());
app.use(express.json()); //access to get body as json data
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

//Routes


// Read 
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM todos');
    res.send(result);

  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// Create 
app.post('/add', async (req, res) => {
  const { text } = req.body;
  try {
    const result = await db.query('INSERT INTO todos( text) VALUES ($1) RETURNING *', [text]);
    res.send(result);

  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// Update 
app.put('/update/:_id', async (req, res) => {
  const _id = req.params._id;
  const { text} = req.body;
  try {
    const result = await db.query('UPDATE todos SET   text = $1 WHERE _id = $2 RETURNING *', [ text, _id]);
    res.send(result);

  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// Delete 
app.delete('/delete/:_id', async (req, res) => {
  const _id = req.params._id;
  try {
    const result = await db.query('DELETE FROM todos WHERE _id = $1 RETURNING *', [_id]);
    res.send(result);
   
  } catch (err) {
    console.error(err);
    res.send("Error " +err);
  }
});


app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});