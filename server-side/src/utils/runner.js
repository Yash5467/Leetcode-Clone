import { runJava } from "../execution-engine/JavaEngine.js";
import { runCpp } from "../execution-engine/CppEngine.js";
import { runPython } from "../execution-engine/PythonEngine.js";

export const runner = ({ code, language, input = false }) => {
  // Running C & CPP File
  if ((language === "c" || language === "cpp") && input) {
    return new Promise((resolve, reject) => {
      runCpp(code, input, (output) => {
        resolve(output);
      });
    });
  } // Running Java File
   else if (language === "java" && input) {
    return new Promise((resolve, reject) => {
      runJava(input, code, (output) => {
        resolve(output);
      });
    });
  } // Running Python File
   else if (language === "python" && input) {
    return new Promise((resolve, reject) => {
      runPython(code, input, (output) => {
        resolve(output);
      });
    });
  }
};
