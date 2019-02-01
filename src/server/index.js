const express = require('express');
const path = require('path');
const os = require('os');
const fileUpload = require('express-fileupload');

const app = express();
const basePath = path.join(`${__dirname}/../../public/uploaded-file/`);
// default options
app.use(fileUpload());

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.post('/api/upload', (req, res) => {
  const uploadFile = req.files.file;
  const fileName = req.files.file.name;

  uploadFile.mv(
    `${basePath}${fileName}`,
    (err) => {
      if (err) {
        res.status(500).send(JSON.stringify({ msg: `file ${fileName} could not uploaded`, errorMsg: err }));
      }
    }
  );

  res.status(200).send(JSON.stringify({ msg: `file ${fileName} uploaded successfully` }));
});
app.listen(1111, () => console.log('Listening on port 8080!'));
