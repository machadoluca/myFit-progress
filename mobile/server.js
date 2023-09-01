const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('mydb.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

const SECRET_KEY = 'AINDA_NÃO_SEI';

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    db.get(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (err, row) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ message: 'Error' });
        } else if (!row) {
          res.status(401).json({ message: 'Usuario ou senha errada' });
        } else {
          const passwordMatch = bcrypt.compareSync(password, row.password);

          if (!passwordMatch) {
            res.status(401).json({ message: 'Usuario ou senha errada' });
          } else {
            const token = jwt.sign({ id: row.id }, SECRET_KEY, {
              expiresIn: '1h',
            });

            res.json({ token });
          }
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password, isTrainer, cpf, escolaridade, formacao, anosExperiencia } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      function (err) {
        if (err) {
          console.error(err.message);
          res.status(500).json({ message: 'Error' });
          return;
        }

        if (isTrainer) {
          const userId = this.lastID;
          db.run(
            'INSERT INTO trainers (user_id, cpf, escolaridade, formacao, anos_experiencia) VALUES (?, ?, ?, ?, ?)',
            [userId, cpf, escolaridade, formacao, anosExperiencia],
            (err) => {
              if (err) {
                console.error(err.message);
                res.status(500).json({ message: 'Error' });
              } else {
                res.json({ message: 'Usuario registrado com sucesso' });
              }
            }
          );
        } else {
          res.json({ message: 'Usuario registrado com sucesso' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
});

app.listen(5000, () => {
  console.log('Servidor aberto no port 5000');
});
