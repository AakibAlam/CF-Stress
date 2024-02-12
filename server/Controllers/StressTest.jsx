const { FindTest } = require("../Utils/TestMain.jsx");

module.exports.StressTest = async (req, res) => {
  try {
    const { contestId, problemId, submissionId } = req.body;
    testCase = await FindTest(contestId, problemId, submissionId);
    return res.status(200).json({ status: true, testCase: testCase });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res
      .status(400)
      .json({ success: false, message: "Failed to generate test cases." });
  }
};
