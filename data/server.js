const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;
require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: "https://dacityexplorer.netlify.app"
  })
);

app.use(express.static(__dirname));

require('./Weather');
require('./Movies');



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
