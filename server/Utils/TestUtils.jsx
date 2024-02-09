const axios = require("axios");
const cheerio = require("cheerio");
const { spawnSync } = require("child_process");

function runCode(file_name, fileExtension, input) {
  return new Promise((resolve, reject) => {
    const fileName = file_name + fileExtension;

    if (fileExtension === ".cpp") {
      const compileProcess = spawnSync("g++", [fileName, "-o", file_name]);

      if (compileProcess.status === 0) {
        const runProcess = spawnSync(file_name, {
          input: input,
          encoding: "utf-8",
        });
        if (runProcess.error) {
          reject("Error: ", runProcess.error.message);
        } else {
          resolve(runProcess.output);
        }
      } else {
        reject("Compilation failed");
      }
    } else if (fileExtension === ".py") {
      const runProcess = spawnSync("python3", [fileName], {
        input: input,
        encoding: "utf-8",
      });
      if (runProcess.error) {
        reject("Error: ", runProcess.error.message);
      } else {
        resolve(runProcess.output);
      }
    } else if (fileExtension === ".js") {
      const runProcess = spawnSync("node", [fileName], {
        input: input,
        encoding: "utf-8",
      });
      if (runProcess.error) {
        reject("Error: ", runProcess.error.message);
      } else {
        resolve(runProcess.output);
      }
    } else {
      reject("Unsupported file extension");
    }
  });
}

async function getCodeInFile(contestId, submissionId) {
  let submissionUrl =
    "https://codeforces.com/contest/" +
    contestId +
    "/submission/" +
    submissionId;
  try {
    const response = await axios.get(submissionUrl);
    const html = cheerio.load(response.data);
    const code = html("#program-source-text").text();
    const table = html(".datatable");
    let language = await new Promise((resolve) => {
      table.find("tr").each((index, row) => {
        if (index === 0) return true;
        const cells = html(row).find("td");
        resolve(cells.eq(3).text().trim());
      });
    });
    // console.log(language);
    return { code, language };
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

async function findCorrectSubmissionId(contestId, problemId) {
  let page_num = 1;
  let found = false;
  let submissionId;

  while (!found) {
    const statusPageUrl =
      "https://codeforces.com/contest/" +
      contestId +
      "/status/" +
      problemId +
      "/page/" +
      String(page_num);

    try {
      const response = await axios.get(statusPageUrl);
      const content = cheerio.load(response.data);
      const table = content(".status-frame-datatable");
      table.find("tr").each((index, row) => {
        if (index === 0) return true; // continue
        const cells = content(row).find("td");
        const currentSubmissionId = cells.eq(0).text().trim();
        const language = cells.eq(4).text().trim();
        const verdict = cells.eq(5).text().trim();
        if (verdict === "Accepted" && language === "GNU C++20 (64)") {
          found = true;
          submissionId = currentSubmissionId;
          return false; // break
        }
      });
      if (found) return submissionId;
    } catch (error) {
      console.log("Error: ", error.message);
    }
    page_num++;
  }
  return contestId;
}

module.exports = {
  runCode: runCode,
  getCodeInFile: getCodeInFile,
  findCorrectSubmissionId: findCorrectSubmissionId,
};
