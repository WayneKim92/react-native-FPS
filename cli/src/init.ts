import fs from "fs";
import path from "path";
import { getScriptRunDirectoryPath } from "./utils";

export const init = async () => {
    const rootPath = getScriptRunDirectoryPath();
    const reactNativeFpsFolderPath = path.join(rootPath, 'react-native-fps');

    if (!fs.existsSync(reactNativeFpsFolderPath)) {
        fs.mkdirSync(reactNativeFpsFolderPath);
    }

    // react-native-fps/config.json 파일이 있으면, 이미 초기화된 상태이므로, 초기화를 중단한다.

    // config.json이 없다면 만들어보자.
}
