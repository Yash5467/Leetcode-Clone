import { Problem } from "../models/problem.models.js";
import { Testcase } from "../models/testcase.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runner } from "../utils/runner.js";

export const codeRunner = asyncHandler(async (req, res) => {
  const { code, language, problemId } = req.body;
  // Checking fields
  if (!code || !language || !problemId)
    throw new ApiError(400, "Feilds Are Required");
 // Getting Problem From DB
  const problem = await Problem.findById(problemId);

  if (!problem) throw new ApiError(400, "Problem Not Found");
   // Extracting Testcases From Problem 
  const testCases = problem.testCases;
  // Checking Code On Testcases
  const promises = testCases.map(async (testId, index) => {
    const test = await Testcase.findById(testId);
    const output = await runner({
        code: code,
        input: test.input,
        language: language,
    });
    // Checking If Error Occured In Code
    if (output.error) {
        return Promise.reject(
            new ApiResponse(401, { output: output.error, test }, "Error While Compiling")
        );
    } // Matching Required Output With User Code Output
    else if (output.output !== test.output) {
        return Promise.reject(
            new ApiResponse(401, {
                output: output.output?output.output:"Time Limit Exceeded",
                testCaseNumber: index,
                input: test.input,
                requiredOutput: test.output
            }, output.message?output.message:"Incorrect Output")
        );
    }

    return Promise.resolve(); // Resolve the promise if the test case is successful
});
 
Promise.all(promises)
    .then(() => {
        res.status(201).json(new ApiResponse(201, {}, "Success"));
    })
    .catch(error => {
      res.status(error.statusCode?error.statusCode:401).json(error);
    });
});
