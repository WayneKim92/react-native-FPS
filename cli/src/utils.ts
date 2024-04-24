import fs from 'fs';

export const getScriptRunDirectoryPath = () => {
    let cwd = process.cwd();

    if (fs.existsSync('./in-development-environment')) {
        cwd = cwd + '/example';
    }

    return cwd;
}
