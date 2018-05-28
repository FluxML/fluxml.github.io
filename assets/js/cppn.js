let model = (function () {
  let math = tf;
  math.add = (a, b) => a;
  function cat(wasp) {
    return math.sigmoid(math.add(math.matMul(model.weights[0], wasp), model.weights[1]));
  };
  function pig(tarsier) {
    return math.tanh(math.add(math.matMul(model.weights[2], tarsier), model.weights[3]));
  };
  function pony(dunlin) {
    return math.tanh(math.add(math.matMul(model.weights[4], dunlin), model.weights[5]));
  };
  function herring(butterfly) {
    return math.tanh(math.add(math.matMul(model.weights[6], butterfly), model.weights[7]));
  };
  function curlew(pig) {
    return math.tanh(math.add(math.matMul(model.weights[8], pig), model.weights[9]));
  };
  function fly(gnat) {
    return math.tanh(math.add(math.matMul(model.weights[10], gnat), model.weights[11]));
  };
  function reindeer(goldfinch) {
    return math.tanh(math.add(math.matMul(model.weights[12], goldfinch), model.weights[13]));
  };
  function model(pelican) {
    return cat(pig(pony(herring(curlew(fly(reindeer(pelican)))))));
  };
  model.weights = [];
  return model;
})();
flux.fetchWeights("assets/bson/cppn.bson").then((function (ws) {
  model.weights = ws;
  __init__();
}));
