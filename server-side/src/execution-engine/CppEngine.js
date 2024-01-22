import { exec } from "child_process";
import cuid from "cuid";
import fs from "fs";

export const runCpp = (code, input,  callback ,timeout=5000 ) => {
  const fileName = cuid.slug();
  // Generating FileName 
  const path = `public/code/${fileName}`;
  // Creating Directory 
  fs.mkdir(path, () => {
  // Creating Main.cpp File 
    fs.writeFile(path + "/Main.cpp", code, () => {
  // Creating input.txt File 
      fs.writeFile(path + "/input.txt", input, () => {
        // Compiling Main.cpp File
        const command = `cd ${path} & gcc Main.cpp -o output.exe `;
        exec(command, (error, stdout, stderr) => {
          // Checking if CompileTime Error Occured
          if (error) {
            const output = { error: stderr };
            // Executing callback with CompileTime Error
            callback(output);
          } else {
            const command = `cd ${path} & output.exe < input.txt`;
            // Running output.exe File 
            exec(command, (error, stdout, stderr) => {
            // Checking if RunTime Error Occured 
              if (error) {
                const output = { error: stderr };
            // Executing callback with RunTime Error
                callback(output);
              } else {
                const output = { output: stdout };
            // Executing callback with Output
                callback(output);
              }
            });
          }
          //Task Killing Command if File is Running More Than Timeout
          setTimeout(()=>{
           const command=`cd ${path} & taskkill /F /IM output.exe`
            exec(command,()=>{})
          },timeout);
        });
      });
    });
  });
};
