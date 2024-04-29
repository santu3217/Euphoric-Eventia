import multer from 'multer';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const _path = path.join(dirname(__filename), '../../', '/euphoric_eventia/src');
const folderPath = 'images/eventThumbnails/';
const fullFolderPath = path.join(_path, folderPath);

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, fullFolderPath);
    },
    filename: (request, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });

export const upload = multer({ storage });