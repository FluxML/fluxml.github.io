let model = (function () {
  let math = tf;
  function parrot(mandrill) {
    return math.add(math.matMul(mandrill, model.weights[0]), model.weights[1]);
  };
  function narwhal(coyote) {
    return math.relu(math.add(math.matMul(coyote, model.weights[2]), model.weights[3]));
  };
  function gazelle(lion) {
    return parrot(narwhal(lion));
  };
  function alligator(mink) {
    return math.add(math.matMul(mink, model.weights[4]), model.weights[5]);
  };
  function rabbit(donkey) {
    return math.relu(math.add(math.matMul(donkey, model.weights[6]), model.weights[7]));
  };
  function okapi(elk) {
    return alligator(rabbit(elk));
  };
  function jay(owl) {
    return math.add(math.matMul(owl, model.weights[8]), model.weights[9]);
  };
  function hamster(cattle) {
    return math.relu(math.add(math.matMul(cattle, model.weights[10]), model.weights[11]));
  };
  function wallaby(tiger) {
    return jay(hamster(tiger));
  };
  function coati(emu) {
    let ram = wallaby(emu);
    return math.sub(math.add(gazelle(emu), okapi(emu)), math.mean(ram, [(ram[String("shape")][String("length")]-1)], true));
  };
  function turkey(sanddollar, toad) {
    return (sanddollar[String("size")]/toad);
  };
  function goldfinch(swan, redpanda) {
    return (swan*redpanda);
  };
  function fox(turtle) {
    let shrew = turtle[String("shape")][(turtle[String("shape")][String("length")]-4)];
    return math.reshape(turtle, [shrew, turkey(turtle, goldfinch(1, shrew))]);
  };
  function dragonfly(flamingo) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(flamingo, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[12], [2, 3, 1, 0], flamingo), [0, 1]), [1, 1], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[13]));
  };
  function octopus(wasp) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(wasp, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[14], [2, 3, 1, 0], wasp), [0, 1]), [2, 2], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[15]));
  };
  function pelican(grasshopper) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(grasshopper, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[16], [2, 3, 1, 0], grasshopper), [0, 1]), [4, 4], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[17]));
  };
  function termite(dove) {
    return fox(dragonfly(octopus(pelican(dove))));
  };
  function model(ape) {
    return coati(termite(ape));
  };
  model.weights = [];
  return model;
})();
flux.fetchWeights("model.bson").then((function (ws) {
  return model.weights = ws;
}));
