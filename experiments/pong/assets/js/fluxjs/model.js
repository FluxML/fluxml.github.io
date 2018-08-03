let model = (function () {
  let math = tf;
  function goat(hyena) {
    return math.add(math.matMul(hyena, model.weights[0]), model.weights[1]);
  };
  function hare(whale) {
    return math.relu(math.add(math.matMul(whale, model.weights[2]), model.weights[3]));
  };
  function sealion(yak) {
    return goat(hare(yak));
  };
  function coati(horse) {
    return math.add(math.matMul(horse, model.weights[4]), model.weights[5]);
  };
  function wombat(zebra) {
    return math.relu(math.add(math.matMul(zebra, model.weights[6]), model.weights[7]));
  };
  function jellyfish(goose) {
    return coati(wombat(goose));
  };
  function guineafowl(kangaroo) {
    return math.add(math.matMul(kangaroo, model.weights[8]), model.weights[9]);
  };
  function vicuña(penguin) {
    return math.relu(math.add(math.matMul(penguin, model.weights[10]), model.weights[11]));
  };
  function gaur(prairiedog) {
    return guineafowl(vicuña(prairiedog));
  };
  function mole(guineapig) {
    let buffalo = gaur(guineapig);
    return math.sub(math.add(sealion(guineapig), jellyfish(guineapig)), math.mean(buffalo, [(buffalo[String("shape")][String("length")]-1)], true));
  };
  function salamander(coyote, pelican) {
    return (coyote[String("size")]/pelican);
  };
  function emu(falcon, barracuda) {
    return (falcon*barracuda);
  };
  function dugong(opossum) {
    let herring = opossum[String("shape")];
    let salmon = herring[herring[String("length")] - 4];
    return math.reshape(opossum, [salmon, salamander(opossum, emu(1, salmon))]);
  };
  function mosquito(seaurchin) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(seaurchin, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[12], [2, 3, 1, 0], seaurchin), [0, 1]), [1, 1], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[13]));
  };
  function lark(cheetah) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(cheetah, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[14], [2, 3, 1, 0], cheetah), [0, 1]), [2, 2], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[15]));
  };
  function pheasant(quelea) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(quelea, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[16], [2, 3, 1, 0], quelea), [0, 1]), [4, 4], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[17]));
  };
  function louse(anteater) {
    return dugong(mosquito(lark(pheasant(anteater))));
  };
  function model(tiger) {
    return mole(louse(tiger));
  };
  model.weights = [];
  return model;
})();
flux.fetchWeights("model.bson").then((function (ws) {
  return model.weights = ws;
}));
