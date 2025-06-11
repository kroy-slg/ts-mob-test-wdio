const exesSync:any = require("child_process").execSync;

class DeviceUtils {

    runCommandLine(command: string):string {
        console.log(`running : ${command}`);
        try {
            return exesSync(command).toString().trim();
        } catch (e) {
            return e.message;
        }
    }

}

export const deviceUtils = new DeviceUtils();