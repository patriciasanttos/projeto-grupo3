import path from "path";

export default function genFileName(name: string) {
    const timestamp = Date.now();
    const ext = path.extname(name);
    const newFileName = `${timestamp}${ext}`;

    return newFileName;
}