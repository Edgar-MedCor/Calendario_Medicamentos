// Importa las bibliotecas necesarias
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
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

// Ruta para registrar un nuevo usuario
app.post("/signup", (req, res) => {
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  const insertUserQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(checkEmailQuery, [req.body.email], (err, data) => {
    if (err) {
      return res.json("Error");
    }

    if (data.length > 0) {
      return res.json("EmailExists");
    } else {
      db.query(insertUserQuery, values, (err, result) => {
        if (err) {
          return res.json("Error");
        }
        return res.json("Success");
      });
    }
  });
});

// Ruta para iniciar sesión
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      const userId = data[0].id; // Assuming your user ID column is named 'id'
      return res.json({ status: "Success", userId: userId });
    } else {
      return res.json("Fail");
    }
  });
});

// Ruta para obtener la lista de medicamentos de un usuario
app.get("/listamedicamentos", (req, res) => {
  const userId = req.query.userId;
  const sql = "SELECT * FROM medicinas WHERE id_usuario = ?";
  db.query(sql, [userId], (error, resultado, campos) => {
    if (error) {
      return res.json({ Estatus: "Error en la consulta SQL" });
    }
    return res.json({ Estatus: "OK", listamedicamentos: resultado });
  });
});

// Ruta para agregar un medicamento
app.post("/addmedicine", (req, res) => {
  const {
    id_usuario,
    medicamento,
    dosis,
    tiempo,
    comentarios,
    cantidad_dosis
  } = req.body;

  const insertMedicineQuery = "INSERT INTO medicinas (id_usuario, medicamento, dosis, tiempo, comentarios, cantidad_dosis) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(insertMedicineQuery, [id_usuario, medicamento, dosis, tiempo, comentarios, cantidad_dosis], (err, result) => {
    if (err) {
      return res.json({ status: "Error", message: "Failed to add medicine" });
    }
    return res.json({ status: "Success", message: "Medicine added successfully" });
  });
});

// Ruta para editar un medicamento
app.put("/editmedicine/:medicineId", (req, res) => {
  const medicineId = req.params.medicineId;
  const {
    medicamento,
    dosis,
    tiempo,
    comentarios,
    cantidad_dosis
  } = req.body;

  const updateMedicineQuery = "UPDATE medicinas SET medicamento = ?, dosis = ?, tiempo = ?, comentarios = ?, cantidad_dosis = ? WHERE id = ?";

  db.query(updateMedicineQuery, [medicamento, dosis, tiempo, comentarios, cantidad_dosis, medicineId], (err, result) => {
    if (err) {
      return res.json({ status: "Error", message: "Failed to edit medicine" });
    }
    return res.json({ status: "Success", message: "Medicine edited successfully" });
  });
});

// Ruta para eliminar un medicamento
app.delete("/deletemedicine/:medicineId", (req, res) => {
  const medicineId = req.params.medicineId;

  const deleteMedicineQuery = "DELETE FROM medicinas WHERE id = ?";

  db.query(deleteMedicineQuery, [medicineId], (err, result) => {
    if (err) {
      return res.json({ status: "Error", message: "Failed to delete medicine" });
    }
    return res.json({ status: "Success", message: "Medicine deleted successfully" });
  });
});

// Ruta para obtener la lista de pastillas de un usuario
app.get("/listapastillas", (req, res) => {
  const userId = req.query.userId;

  // Ensure userId is provided
  if (!userId) {
    return res.json({ status: "Error", message: "User ID is required" });
  }

  const sql = "SELECT * FROM pastillas WHERE id_usuario = ?";
  db.query(sql, [userId], (error, resultado, campos) => {
    if (error) {
      return res.json({ status: "Error in SQL query" });
    }
    return res.json({ status: "OK", listapastillas: resultado });
  });
});

// Ruta para agregar una pastilla
app.post('/addpill', (req, res) => {
  const { id_usuario, nombre, dosis, tipo } = req.body;

  const insertPillQuery = 'INSERT INTO pastillas (id_usuario, nombre, dosis, tipo) VALUES (?, ?, ?, ?)';

  db.query(insertPillQuery, [id_usuario, nombre, dosis, tipo], (err, result) => {
    if (err) {
      return res.json({ status: 'Error', message: 'Failed to add pill' });
    }
    return res.json({ status: 'Success', message: 'Pill added successfully' });
  });
});


// Ruta para editar una pastilla
app.put('/editpill/:id', (req, res) => {
  console.log(req.body); // Verifica los datos que estás recibiendo desde el frontend
  const { nombre, dosis, tipo } = req.body;
  const { id } = req.params;

  console.log('Received data:', nombre, dosis, tipo, id);

  const updatePillQuery = 'UPDATE pastillas SET nombre = ?, dosis = ?, tipo = ? WHERE id = ?';

  db.query(
    updatePillQuery,
    [nombre, dosis, tipo, id],
    (err, result) => {
      if (err) {
        console.error(err); // Agrega logs para identificar errores
        return res.json({ status: 'Error', message: 'Failed to edit pill' });
      }
      return res.json({ status: 'Success', message: 'Pill edited successfully' });
    }
  );
});



// Ruta para eliminar una pastilla
app.delete('/deletepill/:pillId', (req, res) => {
  const pillId = req.params.pillId;

  const deletePillQuery = 'DELETE FROM pastillas WHERE id = ?';

  db.query(deletePillQuery, [pillId], (err, result) => {
    if (err) {
      return res.json({ status: 'Error', message: 'Failed to delete pill' });
    }
    return res.json({ status: 'Success', message: 'Pill deleted successfully' });
  });
});


app.post('/addpilltocalendar', (req, res) => {
  const { id_usuario, pastilla } = req.body;

  // Calcula la hora de la primera toma (por ejemplo, usando la hora actual)
  const now = new Date();
  const horaPrimeraToma = new Date(now.getTime() + pastilla.intervalo * 60 * 60 * 1000);

  // Inserta la pastilla en el calendario
  const insertPillToCalendarQuery = 'INSERT INTO medicinas (id_usuario, medicamento, dosis, intervalo, comentarios, cantidad_dosis, nextDoseTime) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(insertPillToCalendarQuery, [id_usuario, pastilla.nombre, pastilla.dosis, pastilla.intervalo, pastilla.comentarios, pastilla.cantidad_dosis, horaPrimeraToma], (err, result) => {
    if (err) {
      return res.json({ status: 'Error', message: 'Failed to add pill to calendar' });
    }

    res.json({ status: 'Success', message: 'Pill added to the calendar' });
  });
});




app.listen(3006, () => {
  console.log("Listening on port 3006");
});
