import fs from 'fs';
import path from "path";

function readFile(filePatch: string): any {
    const data = fs.readFileSync(path.resolve(__dirname, `../../../public/${filePatch}`), 'utf8');
    return data;
}

export default readFile