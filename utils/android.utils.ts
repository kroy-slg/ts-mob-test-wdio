import {deviceUtils} from "./device.utils";

class AndroidUtils {

    private cmd_turn_on_wifi = 'shell svc wifi enable';
    private cmd_turn_off_wifi = 'shell svc wifi disable';

    public async runAdbCommandLine(cmd: string) {
        let adbCommand = "adb" + " -s " + driver.capabilities["udid"] + " " + cmd;
        return deviceUtils.runCommandLine(adbCommand)
    }

    /********************************
     * Method to turn on Wi-Fi
     * ******************************
     */
    public async turnOnWifi(){
        await this.runAdbCommandLine(this.cmd_turn_on_wifi);
    }

    /********************************
     * Method to turn off Wi-Fi
     * ******************************
     */
    public async turnOffWifi(){
        await this.runAdbCommandLine(this.cmd_turn_off_wifi);
    }

}

export const androidUtils = new AndroidUtils();