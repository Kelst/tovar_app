const express = require('express');
const app = express();
const http = require('http');
const axios=require("axios")
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const config = require('./config.js'); 
const cors = require('cors'); // Подключаем пакет cors



async function queryDatabase1(sql){
    return new Promise((resolve, reject) => {
      connection.query(sql, function(err, results) {
        if (err) {
          reject(err);
        } else 
        { 
             resolve(results);
        }
      });
    });
  }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  const port = 4001; 

  const dbConfig = {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.db
  };

  const connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
    } else {
      console.log('Connected to database Billing');
    }
  });