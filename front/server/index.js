const express = require('express');
const path = require('path');
const cors = require('cors'); // Додайте цей рядок

const app = express();
const port = 4003;

// Додайте налаштування CORS
app.use(cors(
  
));

// Статичні файли зі скомпільованого Vite проекту
app.use(express.static(path.join(__dirname, '../dist')));

// Всі запити повертатимуть індексний HTML-файл
app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
})

// Запускаємо сервер
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});