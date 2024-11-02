import log4js from "log4js";
import path from "path";

// ログ出力先は、サーバー内の絶対パスを動的に取得して出力先を設定したい
const APP_ROOT = process.cwd()

const logLevel = process.env.IS_DEVELOP?.toLowerCase()??'true' === "true" ? "ALL" : "INFO"

const categoryConfig = {
    appenders: ["systemLog", "consoleLog"],
    level: logLevel
}

const loggerConfig = {
    appenders: {
        consoleLog: {
            type: "console"
        },
        // ADD
        systemLog: {
            type: "file",
            filename: path.join(APP_ROOT, "./log/system/system.log"),
            maxLogSize: 5000000, // 5MB
            backups: 5, // 世代管理は5ファイルまで、古いやつgzで圧縮されていく
            compress: true
        }
    },
    categories: {
        default: {
            appenders: ["consoleLog"],
            level: logLevel
        },
    }
};

log4js.configure(loggerConfig);

export const logger = Object.freeze({
    default: log4js.getLogger("default"),
})