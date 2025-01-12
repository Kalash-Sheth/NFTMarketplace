require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const nftRoutes = require('./src/routes/nftRoutes');


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json());
app.use('/api', nftRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});