const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "calendario"
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.message);
    return;
  }
  console.log('Connected to the database');
});

app.post("/signup", (req, res) => {
  const checkEmailQuery = "SELECT * FROM login WHERE email = ?";
  const insertUserQuery = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.password];

  // Primero, verifica si el correo electrónico ya está en uso
  db.query(checkEmailQuery, [req.body.email], (err, data) => {
    if (err) {
      return res.json("Error");
    }

    if (data.length > 0) {
      return res.json("EmailExists");
    } else {
      // Si el correo electrónico no existe, procede a insertar el nuevo usuario
      db.query(insertUserQuery, values, (err, result) => {
        if (err) {
          return res.json("Error");
        }
        return res.json("Success");
      });
    }
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

app.get("/listamedicamentos", (peticion, respuesta) => {
  const sql = "SELECT * FROM medicinas";
  db.query(sql, (error, resultado, campos) => {
    if (error) {
      return respuesta.json({ Estatus: "Error en la consulta sql" });
    }
    return respuesta.json({ Estatus: "OK", listamedicamentos: resultado });
  });
});

app.listen(3006, () => {
  console.log("Listening on port 3006");
});
