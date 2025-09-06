import { Injectable } from '@nestjs/common';
import {CustomError} from "../components/error-handler/custom-error.class"
import {execSync} from 'child_process';



@Injectable()
export class ServerService {
            
    private _rebootServer():void {
        execSync("reboot")
    }    
    
    public async reboot() {
        this._rebootServer()   
    }
}
