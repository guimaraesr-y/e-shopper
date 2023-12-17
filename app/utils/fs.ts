import fs from 'fs';

export default class FileSystem {

    static deleteFile(path: string) {
        fs.unlinkSync(path);
    }

    static fileExists(path: string) {
        return fs.existsSync(path);
    }

}