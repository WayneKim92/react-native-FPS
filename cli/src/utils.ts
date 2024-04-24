import { __DEV__ } from "./consts";

export const getScriptRunDirectoryPath = () => {
    let cwd = process.cwd();

    if (__DEV__) {
        cwd = cwd + '/example';
    }

    return cwd;
}
