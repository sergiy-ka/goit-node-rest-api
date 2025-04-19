import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        const uniqueId = uuidv4();
        const extension = path.extname(file.originalname) || '';
        const filename = uniqueId + extension;
        cb(null, filename);
    },
});

const upload = multer({
    storage: multerConfig,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export default upload;