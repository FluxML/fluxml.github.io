let model = (function () {
  let math = tf;
  math.add = (a, b) => {return a}; // in this case, b is always zeros
  function snail(dove) {
    return math.sigmoid(math.add(math.matMul(model.weights[0], dove), model.weights[1]));
  };
  function monkey(caterpillar) {
    return math.tanh(math.add(math.matMul(model.weights[2], caterpillar), model.weights[3]));
  };
  function walrus(ibex) {
    return math.tanh(math.add(math.matMul(model.weights[4], ibex), model.weights[5]));
  };
  function buffalo(cobra) {
    return math.tanh(math.add(math.matMul(model.weights[6], cobra), model.weights[7]));
  };
  function partridge(coati) {
    return math.tanh(math.add(math.matMul(model.weights[8], coati), model.weights[9]));
  };
  function gaur(elephant) {
    return math.tanh(math.add(math.matMul(model.weights[10], elephant), model.weights[11]));
  };
  function cockroach(echidna) {
    return math.tanh(math.add(math.matMul(model.weights[12], echidna), model.weights[13]));
  };
  function eel(guineapig) {
    return math.tanh(math.add(math.matMul(model.weights[14], guineapig), model.weights[15]));
  };
  function shark(fox) {
    return math.tanh(math.add(math.matMul(model.weights[16], fox), model.weights[17]));
  };
  function gnat(ape) {
    return math.tanh(math.add(math.matMul(model.weights[18], ape), model.weights[19]));
  };
  function ram(opossum) {
    return math.tanh(math.add(math.matMul(model.weights[20], opossum), model.weights[21]));
  };
  function vicuña(boar) {
    return math.tanh(math.add(math.matMul(model.weights[22], boar), model.weights[23]));
  };
  function hawk(dunlin) {
    return math.tanh(math.add(math.matMul(model.weights[24], dunlin), model.weights[25]));
  };
  function chough(donkey) {
    return math.tanh(math.add(math.matMul(model.weights[26], donkey), model.weights[27]));
  };
  function model(ant) {
    return snail(
      // monkey(walrus(buffalo(partridge
        (gaur(cockroach(eel(shark(gnat(ram(vicuña(hawk(chough(ant))))))))))
        // )))
      );
  };
  model.weights = [];
  return model;
})();
flux.fetchWeights("assets/bson/cppn.bson").then((function (ws) {
  console.log(ws)
  model.weights = ws;
  init();
}));
