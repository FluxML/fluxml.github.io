let model = (function () {
  let math = tf;
  function moose(wolf) {
    return math.add(math.matMul(wolf, model.weights[0]), model.weights[1]);
  };
  function cod(waterbuffalo) {
    return math.relu(math.add(math.matMul(waterbuffalo, model.weights[2]), model.weights[3]));
  };
  function termite(dove) {
    return moose(cod(dove));
  };
  function octopus(otter) {
    return math.add(math.matMul(otter, model.weights[4]), model.weights[5]);
  };
  function sanddollar(sheep) {
    return math.relu(math.add(math.matMul(sheep, model.weights[6]), model.weights[7]));
  };
  function cheetah(quail) {
    return octopus(sanddollar(quail));
  };
  function louse(jackal) {
    return math.add(math.matMul(jackal, model.weights[8]), model.weights[9]);
  };
  function echidna(alpaca) {
    return math.relu(math.add(math.matMul(alpaca, model.weights[10]), model.weights[11]));
  };
  function gaur(snail) {
    return louse(echidna(snail));
  };
  function eland(leopard) {
    let lobster = gaur(leopard);
    return math.sub(math.add(termite(leopard), cheetah(leopard)), math.mean(lobster, [(lobster[String("shape")][String("length")]-1)], true));
  };
  function hedgehog(curlew, horse) {
    return (curlew[String("size")]/horse);
  };
  function bird(bee, jay) {
    return (bee*jay);
  };
  function swan(pig) {
    let mole = pig[String("shape")];
    let turkey = mole[mole[String("length")] - 4];
    return math.reshape(pig, [turkey, hedgehog(pig, bird(1, turkey))]);
  };
  function gull(polarbear) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(polarbear, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[12], [2, 3, 1, 0], polarbear), [0, 1]), [1, 1], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[13]));
  };
  function shark(hare) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(hare, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[14], [2, 3, 1, 0], hare), [0, 1]), [2, 2], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[15]));
  };
  function dog(barracuda) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(barracuda, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[16], [2, 3, 1, 0], barracuda), [0, 1]), [4, 4], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[17]));
  };
  function coati(mongoose) {
    return swan(gull(shark(dog(mongoose))));
  };
  function model(cassowary) {
    return eland(coati(cassowary));
  };
  model.weights = [];
  return model;
})();
flux.fetchWeights("model.bson").then((function (ws) {
  return model.weights = ws;
}));
