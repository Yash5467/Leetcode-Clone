import fs from "fs";
import cuid from "cuid";
import { exec } from "child_process";
import Path from "path";
import { deleteFilesInDirectory } from "../utils/deleteFiles.js";

export const runJava = (input, code, callback) => {
  // Generating File Name
  const filename = cuid.slug();
  const path = `public/code/${filename}`;
  // Creating Directory 
  fs.mkdir(path, () => {
    // Creating Main.java File
    fs.writeFile(path + "/Main.java", code, () => {
      // Creting input.txt file
      fs.writeFile(path + "/input.txt", input, () => {
        const command = ` cd ${Path.resolve(path)} &  javac Main.java`;
        // Compiling Main.java File
        exec(command, (error, stdout, stderr) => {
          // Checking if Compile Time Error occured 
          if (error) {
            const output = { error: stderr };
            // executing callback function with  CompileTime error
            callback(output);
          } else {
            // Running Main.class File with Input from input.txt
            const command = `cd ${Path.resolve(path)} & java Main < input.txt`;
            exec(command, (error, stdout, stderr) => {
              // Deleting Directory 
              deleteFilesInDirectory(path);
              // Checking if Rumtime error occured 
              if (error) {
                const output = { error: stderr };
              // Executing callback with RunTime Error
                callback(output);
              } else {
                // Executing callback wuth Output
                const output = { output: stdout };
                callback(output);
              }
            });
            // Task Killing Command if File is Running More Than Timeout
            setTimeout(()=>{
              const command=`cd ${path} & taskkill /F /IM output.exe`
               exec(command,()=>{})
             },timeout);
          }
        });
      });
    });
  });
};
