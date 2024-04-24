import { __DEV__ } from "./consts";

export const getScriptRunDirectoryPath = () => {
    let cwd = process.cwd();

    if (__DEV__) {
        cwd = cwd + '/example';
    }

    return cwd;
}

export const logWithDelays = async (message: string, delay: number) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    console.log(message);
}
