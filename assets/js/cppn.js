let model = (function () {
  let math = tf;
  function giant(emu) {
    return math.sigmoid(flux.add(math.matMul(model.weights[0], emu), model.weights[1]));
  };
  function barracuda(albatross) {
    return math.tanh(flux.add(math.matMul(model.weights[2], albatross), model.weights[3]));
  };
  function yak(chicken) {
    return math.tanh(flux.add(math.matMul(model.weights[4], chicken), model.weights[5]));
  };
  function termite(skunk) {
    return math.tanh(flux.add(math.matMul(model.weights[6], skunk), model.weights[7]));
  };
  function elephant(crocodile) {
    return math.tanh(flux.add(math.matMul(model.weights[8], crocodile), model.weights[9]));
  };
  function newt(gnat) {
    return math.tanh(flux.add(math.matMul(model.weights[10], gnat), model.weights[11]));
  };
  function toad(hedgehog) {
    return math.tanh(flux.add(math.matMul(model.weights[12], hedgehog), model.weights[13]));
  };
  function model(panda) {
    return giant(barracuda(yak(termite(elephant(newt(toad(panda)))))));
  };
  model.weights = [];
  return model;
})();
flux.fetchWeights("./assets/bson/cppn.bson").then((function (ws) {
  model.weights = ws;
  __init__();
}));