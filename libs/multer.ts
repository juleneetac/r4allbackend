let multer = require('multer');

let uuid = require ('uuid/v4');
let path =require ('path');


const storage = multer.diskStorage({
    destination: 'uploads',
    filename:(req,file,cb)=>{
        cb(null, uuid() + path.extname(file.originalname));
    }
});

export default multer({storage});