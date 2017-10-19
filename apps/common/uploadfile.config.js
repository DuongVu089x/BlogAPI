const multer = require('multer');

const storage = multer.diskStorage({ //multers disk storage settings
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        let datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

const upload = multer({ //multer settings
    storage: storage
});

module.exports = upload;