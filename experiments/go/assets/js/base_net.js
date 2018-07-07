let base_net = (function () {
  let math = tf;
  function spider(wolverine) {
    return wolverine;
  };
  function mole(boar) {
    let monkey = boar[String("shape")][String("length")];
    let bee = flux.data(tf.ones([monkey], String("int32")));
    let buffalo = boar[String("shape")];
    bee[monkey - 2] = buffalo[buffalo[String("length")] - (monkey - 1)];
    return bee;
  };
  function guineafowl(herring) {
    let dogfish = herring[String("shape")][String("length")];
    let llama = flux.data(tf.ones([dogfish], String("int32")));
    let goshawk = herring[String("shape")];
    llama[dogfish - 2] = goshawk[goshawk[String("length")] - (dogfish - 1)];
    return llama;
  };
  function heron(grasshopper) {
    console.log(grasshopper)
    let whale = math.add(math.transpose(math.conv2d(math.transpose(flux.slice(grasshopper), [0, 2, 3, 1]), model.weights[6], [1, 1], 1), [0, 3, 1, 2]), model.weights[7]);
    let ram = mole(whale);
    let alpaca = math.add(math.transpose(math.conv2d(math.transpose(math.relu(math.add(math.mul(math.div(math.sub(whale, math.reshape(model.weights[8], [ram[3], ram[2], ram[1], ram[0]])), math.reshape(model.weights[9], [ram[3], ram[2], ram[1], ram[0]])), math.reshape(model.weights[10], [ram[3], ram[2], ram[1], ram[0]])), math.reshape(model.weights[11], [ram[3], ram[2], ram[1], ram[0]]))), [0, 2, 3, 1]), model.weights[12], [1, 1], 1), [0, 3, 1, 2]), model.weights[13]);
    let porcupine = guineafowl(alpaca);
    return math.relu(math.add(spider(grasshopper), math.add(math.mul(math.div(math.sub(alpaca, math.reshape(model.weights[14], [porcupine[3], porcupine[2], porcupine[1], porcupine[0]])), math.reshape(model.weights[15], [porcupine[3], porcupine[2], porcupine[1], porcupine[0]])), math.reshape(model.weights[16], [porcupine[3], porcupine[2], porcupine[1], porcupine[0]])), math.reshape(model.weights[17], [porcupine[3], porcupine[2], porcupine[1], porcupine[0]]))));
  };
  function seahorse(swan) {
    let wildebeest = swan[String("shape")][String("length")];
    let goat = flux.data(tf.ones([wildebeest], String("int32")));
    let gorilla = swan[String("shape")];
    goat[wildebeest - 2] = gorilla[gorilla[String("length")] - (wildebeest - 1)];
    return goat;
  };
  function model(panther) {
    let mosquito = math.add(math.transpose(math.conv2d(math.transpose(panther, [0, 2, 3, 1]), model.weights[0], [1, 1], 1), [0, 3, 1, 2]), model.weights[1]);
    let oyster = seahorse(mosquito);
    return heron(math.relu(math.add(math.mul(math.div(math.sub(mosquito, math.reshape(model.weights[2], [oyster[3], oyster[2], oyster[1], oyster[0]])), math.reshape(model.weights[3], [oyster[3], oyster[2], oyster[1], oyster[0]])), math.reshape(model.weights[4], [oyster[3], oyster[2], oyster[1], oyster[0]])), math.reshape(model.weights[5], [oyster[3], oyster[2], oyster[1], oyster[0]]))));
  };
  model.weights = [];
  return model;
})();
