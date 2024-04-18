var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require("multer")
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Multer middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });

// POST endpoint for file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Extract metadata from the uploaded file
  const fileMetadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  // Send the metadata as JSON response
  res.json(fileMetadata);
});


// GET endpoint for /api/fileanalyse
//app.get('/api/fileanalyse', (req, res) => {
  //res.send('Please use POST method to upload a file.);
//});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
