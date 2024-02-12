const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputArr = async function () {
  return new Promise((resolve) => {
    reader.question("", (amount) => {
      const inputArr = amount.split(" ").map(Number);
      resolve(inputArr);
    });
  });
};

async function main() {
  //input:
  let [t] = await inputArr();
  while (t--) {
    let arr = [];

    for (let i = 0; i < 4; i++) {
      arr[i] = [];
      arr[i] = await inputArr();
    }

    //logic:
    let x1 = Math.pow(arr[0][0] - arr[1][0], 2);
    let x2 = Math.pow(arr[0][1] - arr[1][1], 2);
    let side = Math.trim(Math.sqrt(x1 + x2));

    console.log(side * side);
  }
  reader.close();
}

main();
