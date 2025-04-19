import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prepareFolders = async () => {
    const publicDir = path.join(__dirname, '../', 'public');
    const avatarsDir = path.join(publicDir, 'avatars');
    const tempDir = path.join(__dirname, '../', 'temp');

    await fs.ensureDir(publicDir);
    await fs.ensureDir(avatarsDir);
    await fs.ensureDir(tempDir);
};

export default prepareFolders;