import { exec } from "child_process";
import { error } from "console";
import cuid from "cuid"
import fs from 'fs'
export const runPython=(code,input,callback)=>{
    const fileName=cuid.slug();
    //Generating FileName 
    const path=`public/code/${fileName}`;
    // Creating Directory
    fs.mkdir(path,()=>{
    // Creating Main.py File
        fs.writeFile(path+'/Main.py',code,()=>{
  // Creating input.txt File
            fs.writeFile(path+'/input.txt',input,()=>{
                const command=`cd ${path} & python Main.py <input.txt`;
    // Running Main.py with Input from input.txt
                exec(command,(error,stdout,stderr)=>{
                    // Checking if Error Occured
                    if(error){
                        const output={error:stderr};
                        // Executing Callback with Error
                     callback(output);
                    }
                    else {
                        const output={output:stdout};
                        // Executing Callback with Output
                        callback(output);
                    }
                });
                // Task Killing Command if File is Running More Than Timeout
                setTimeout(()=>{
                    const command=`cd ${path} & taskkill /F /IM output.exe`
                     exec(command,()=>{})
                   },timeout);
            });
        });
    });
}