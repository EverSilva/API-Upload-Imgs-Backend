const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
    storage: multer.diskStorage({
        destination: (res, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'));
        },
        filename: (res, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];
        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    }
};