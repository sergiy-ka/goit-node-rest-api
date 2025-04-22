import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { fileTypeFromFile } from 'file-type';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

export const updateAvatar = async (userId, tempUploadPath) => {
    try {
        const fileType = await fileTypeFromFile(tempUploadPath);

        if (!fileType || !['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp'].includes(fileType.mime)) {
            await fs.unlink(tempUploadPath);
            throw new Error('Unsupported file type. Only JPEG, PNG, BMP, GIF and WebP are allowed.');
        }

        const extension = `.${fileType.ext}`;
        const filename = `${userId}_${uuidv4()}${extension}`;
        const newPath = path.join(avatarsDir, filename);

        const User = (await import('../models/user.js')).default;
        const user = await User.findByPk(userId);

        if (user && user.avatarURL) {
            const oldAvatarPath = path.join(__dirname, '../', 'public', user.avatarURL);
            try {
                await fs.access(oldAvatarPath);
                await fs.unlink(oldAvatarPath);
            } catch (error) {
                console.log(`Could not delete previous avatar: ${error.message}`);
            }
        }

        await fs.copyFile(tempUploadPath, newPath);
        await fs.unlink(tempUploadPath);

        return `/avatars/${filename}`;
    } catch (error) {
        try {
            await fs.access(tempUploadPath);
            await fs.unlink(tempUploadPath);
        } catch (fsError) {
        }

        console.error('Error updating avatar:', error.message);
        throw error;
    }
};