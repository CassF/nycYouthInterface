require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require("cors");
const express = require("express");
const app = express();
const nycApiTrackerRoutes = require('./routes/nycRoutes');
const routes = require("./routes/routes");
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/nyc', nycApiTrackerRoutes);
app.use(routes);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server listening on port ${process.env.PORT || 3001}`);
});
