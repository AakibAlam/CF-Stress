function randomNumber(L, R) {
  let num = Math.random();
  num *= R - L + 1;
  num = Math.floor(num);
  num += L;
  return num;
}

function generate_test() {
  let test = "1\n";
  test += String(randomNumber(-1000, 1000));
  test += " ";
  test += String(randomNumber(-1000, 1000));
  test += "\n";
  test += String(randomNumber(-1000, 1000));
  test += " ";
  test += String(randomNumber(-1000, 1000));
  test += "\n";
  test += String(randomNumber(-1000, 1000));
  test += " ";
  test += String(randomNumber(-1000, 1000));
  test += "\n";
  test += String(randomNumber(-1000, 1000));
  test += " ";
  test += String(randomNumber(-1000, 1000));
  test += "\n";
  return test;
}

module.exports = {
  generate_test: generate_test,
};
