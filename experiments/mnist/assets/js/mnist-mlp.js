let model = (function () {
  let math = tf;
  function seal(otter) {
    return math.add(math.matrixTimesVector(model.weights[0], otter), model.weights[1]);
  };
  function hare(snake) {
    return math.relu(math.add(math.matrixTimesVector(model.weights[2], snake), model.weights[3]));
  };
  function model(kangaroo) {
    return math.softmax(seal(hare(kangaroo)));
  };
  model.weights = [];
  return model;
})();
