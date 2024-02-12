const fs = require("fs");
const path = require("path");
const {
  runCode,
  getCodeInFile,
  findCorrectSubmissionId,
} = require("./TestUtils.jsx");

// const contestId = "1921";
// const problemId = "A";
// const submissionId = "241764488";

async function processSubmission(contestId, problemId, submissionId) {
  const generator_path = path.resolve(
    "Generators",
    contestId + problemId + ".jsx"
  );
  const submission_path = path.resolve("Submissions");

  if (!fs.existsSync(generator_path)) {
    console.log("No generator for this question :(\n");
    return "No generator for this question :(\n";
  }
  try {
    const result = await getCodeInFile(contestId, submissionId);
    // console.log(result.code, result.language);
    const fileExtension = getFileExtension(result.language);
    if (fileExtension) {
      fs.writeFileSync(
        submission_path + "/userSolution" + fileExtension,
        result.code
      );
      const correctSubmissionId = await findCorrectSubmissionId(
        contestId,
        problemId
      );
      const correctResult = await getCodeInFile(contestId, correctSubmissionId);
      fs.writeFileSync(
        submission_path + "/correctSolution" + ".cpp",
        correctResult.code
      );
      const answer = await runComparison(
        fileExtension,
        generator_path,
        submission_path
      );
      return answer;
    } else {
      console.log(result.language + " Language is not supported :(\n");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function runComparison(fileExtension, generator_path, submission_path) {
  let answer;
  let found = false;
  let iteration = 1000;
  const { generate_test } = require(generator_path);

  while (!found && iteration > 0) {
    try {
      const input = generate_test();
      const checkOutput = await runCode(
        submission_path + "/userSolution",
        fileExtension,
        input
      );
      const correctOutput = await runCode(
        submission_path + "/correctSolution",
        ".cpp",
        input
      );
      if (
        checkOutput[1] !== undefined &&
        correctOutput[1] !== undefined &&
        checkOutput[1] !== correctOutput[1]
      ) {
        found = true;
        answer = input;
      }
      iteration--;
    } catch (error) {
      console.error("Error during comparison:", error);
    }
  }

  if (!found) {
    answer = "No input can be found :(\n";
  }
  return answer;
}

function getFileExtension(language) {
  if (language.toLowerCase().includes("gnu c++")) {
    return ".cpp";
  } else if (
    language.toLowerCase().includes("python") ||
    language.toLowerCase().includes("pypy")
  ) {
    return ".py";
  } else if (language.toLowerCase().includes("node.js")) {
    return ".js";
  }

  return null;
}

module.exports = {
  FindTest: processSubmission,
};
