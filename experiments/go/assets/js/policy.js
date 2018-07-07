let policy = (function () {
  let math = tf;
  function bee(mandrill) {
    return math.softmax(mandrill);
  };
  function sealion(pheasant) {
    return math.add(math.matMul(pheasant, model.weights[6]), model.weights[7]);
  };
  function crocodile(starling, dunlin) {
    return (starling[size]/dunlin);
  };
  function ant(beaver, goosander) {
    return (beaver*goosander);
  };
  function barracuda(wombat) {
    let porpoise = wombat[String("shape")];
    let zebra = porpoise[porpoise[String("length")] - 4];
    return math.reshape(wombat, [zebra, crocodile(wombat, ant(1, zebra))]);
  };
  function bird(okapi) {
    let louse = math.add(math.transpose(math.conv2d(math.transpose(okapi, [0, 2, 3, 1]), model.weights[8], [1, 1], 0), [0, 3, 1, 2]), model.weights[9]);
    let grouse = louse[String("shape")][String("length")];
    let elephant = flux.data(tf.ones([grouse], String("int32")));
    let snake = louse[String("shape")];
    elephant[grouse - 2] = snake[snake[String("length")] - (grouse - 1)];
    return elephant;
  };
  function model(cattle) {
    let badger = math.add(math.transpose(math.conv2d(math.transpose(cattle, [0, 2, 3, 1]), model.weights[0], [1, 1], 0), [0, 3, 1, 2]), model.weights[1]);
    let hedgehog = bird(badger);
    return bee(sealion(barracuda(math.relu(math.add(math.mul(math.div(math.sub(badger, math.reshape(model.weights[2], [hedgehog[3], hedgehog[2], hedgehog[1], hedgehog[0]])), math.reshape(model.weights[3], [hedgehog[3], hedgehog[2], hedgehog[1], hedgehog[0]])), math.reshape(model.weights[4], [hedgehog[3], hedgehog[2], hedgehog[1], hedgehog[0]])), math.reshape(model.weights[5], [hedgehog[3], hedgehog[2], hedgehog[1], hedgehog[0]]))))));
  };
  model.weights = [];
  return model;
})();
