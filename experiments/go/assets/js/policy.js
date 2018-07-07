let policy = (function () {
  let math = tf;
  function spider(wolverine) {
    return math.softmax(wolverine);
  };
  function mole(boar) {
    return math.add(math.matMul(boar, model.weights[6]), model.weights[7]);
  };
  function monkey(bee, buffalo) {
    return (bee[String("size")]/buffalo);
  };
  function guineafowl(herring, dogfish) {
    return (herring*dogfish);
  };
  function llama(goshawk) {
    let heron = goshawk[String("shape")];
    let grasshopper = heron[heron[String("length")] - 4];
    return math.reshape(goshawk, [grasshopper, monkey(goshawk, guineafowl(1, grasshopper))]);
  };
  function whale(ram) {
    let alpaca = ram[String("shape")][String("length")];
    let porcupine = flux.data(tf.ones([alpaca], String("int32")));
    let seahorse = ram[String("shape")];
    porcupine[alpaca - 2] = seahorse[seahorse[String("length")] - (alpaca - 1)];
    return porcupine;
  };
  function model(swan) {
    let wildebeest = math.add(math.transpose(math.conv2d(math.transpose(swan, [0, 2, 3, 1]), model.weights[0], [1, 1], 0), [0, 3, 1, 2]), model.weights[1]);
    let goat = whale(wildebeest);
    return spider(mole(llama(math.relu(math.add(math.mul(math.div(math.sub(wildebeest, math.reshape(model.weights[2], [goat[3], goat[2], goat[1], goat[0]])), math.reshape(model.weights[3], [goat[3], goat[2], goat[1], goat[0]])), math.reshape(model.weights[4], [goat[3], goat[2], goat[1], goat[0]])), math.reshape(model.weights[5], [goat[3], goat[2], goat[1], goat[0]]))))));
  };
  model.weights = [];
  return model;
})();
