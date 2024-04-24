import fs from "fs";

export const __DEV__ = fs.existsSync('./in-development-environment');
