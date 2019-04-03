const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const util = require('util');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Upload image
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000000},
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    }
}).single('myImg');

//Validate file type
function checkFileType(file, cb){
    const filetypes = /png|jpeg|jpg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null, true);
    } else {
      cb('Please upload images only!');
    }
}

const app =  express();
const router = express.Router();
app.use(bodyParser());  
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


router.route('/upload').post((req, res) => {
    upload(req, res, (error) => {
      if (error) {
        return res.json({error: `${error}`});
      }
      console.log(util.inspect(req.body, false, null, true));
      return res.json({success: 'Upload Success!'});
    });
});

app.use('/', router);
app.listen(4000, () => console.log(`Server is running on 4000`));
