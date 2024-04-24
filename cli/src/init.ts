import chalk from "chalk";
import { getScriptRunDirectoryPath } from "./utils";

export const init = async () => {
    getScriptRunDirectoryPath();
    // react-native-fps 폴더 유무 확인 없으면 생성

    // 폴더가 없으면 폴더를 생성한다.

    // react-native-fps/config.json 파일이 있으면, 이미 초기화된 상태이므로, 초기화를 중단한다.

    // config.json이 없다면 만들어보자.
}
