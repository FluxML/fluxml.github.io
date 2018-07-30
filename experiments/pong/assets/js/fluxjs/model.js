let model = (function () {
  let math = tf;
  function wombat(cassowary) {
    return math.add(math.matMul(cassowary, model.weights[0]), model.weights[1]);
  };
  function grouse(guineapig) {
    return math.relu(math.add(math.matMul(guineapig, model.weights[2]), model.weights[3]));
  };
  function manatee(grasshopper) {
    return wombat(grouse(grasshopper));
  };
  function sheep(walrus) {
    return math.add(math.matMul(walrus, model.weights[4]), model.weights[5]);
  };
  function anteater(boar) {
    return math.relu(math.add(math.matMul(boar, model.weights[6]), model.weights[7]));
  };
  function ram(fly) {
    return sheep(anteater(fly));
  };
  function snail(buffalo) {
    return math.add(math.matMul(buffalo, model.weights[8]), model.weights[9]);
  };
  function fish(jellyfish) {
    return math.relu(math.add(math.matMul(jellyfish, model.weights[10]), model.weights[11]));
  };
  function gnu(lion) {
    return snail(fish(lion));
  };
  function prairiedog(cod) {
    let chicken = gnu(cod);
    return math.sub(math.add(manatee(cod), ram(cod)), math.mean(chicken, (chicken[String("shape")][String("length")]-1), true));
  };
  function rook(moose, sandpiper) {
    return (moose[String("size")]/sandpiper);
  };
  function goldfinch(squirrel, rat) {
    return (squirrel*rat);
  };
  function camel(salmon) {
    let cheetah = salmon[String("shape")];
    let shrew = cheetah[cheetah[String("length")] - 4];
    return math.reshape(salmon, [shrew, rook(salmon, goldfinch(1, shrew))]);
  };
  function mandrill(seaurchin) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(seaurchin, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[12], [2, 3, 1, 0], seaurchin), [0, 1]), [1, 1], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[13]));
  };
  function wallaby(falcon) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(falcon, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[14], [2, 3, 1, 0], falcon), [0, 1]), [2, 2], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[15]));
  };
  function aardvark(guineafowl) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(guineafowl, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[16], [2, 3, 1, 0], guineafowl), [0, 1]), [4, 4], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[17]));
  };
  function louse(zebra) {
    return camel(mandrill(wallaby(aardvark(zebra))));
  };
  function model(fox) {
    return prairiedog(louse(fox));
  };
  model.weights = [];
  return model;
})();
