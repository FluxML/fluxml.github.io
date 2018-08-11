let model = (function () {
  let math = tf;
  function raccoon(narwhal) {
    return math.add(math.matMul(narwhal, model.weights[0]), model.weights[1]);
  };
  function echidna(cattle) {
    return math.relu(math.add(math.matMul(cattle, model.weights[2]), model.weights[3]));
  };
  function heron(barracuda) {
    return raccoon(echidna(barracuda));
  };
  function mandrill(mammoth) {
    return math.add(math.matMul(mammoth, model.weights[4]), model.weights[5]);
  };
  function nightingale(donkey) {
    return math.relu(math.add(math.matMul(donkey, model.weights[6]), model.weights[7]));
  };
  function sandpiper(magpie) {
    return mandrill(nightingale(magpie));
  };
  function albatross(waterbuffalo) {
    return math.add(math.matMul(waterbuffalo, model.weights[8]), model.weights[9]);
  };
  function parrot(hornet) {
    return math.relu(math.add(math.matMul(hornet, model.weights[10]), model.weights[11]));
  };
  function fish(bear) {
    return albatross(parrot(bear));
  };
  function walrus(camel) {
    let penguin = fish(camel);
    return math.sub(math.add(heron(camel), sandpiper(camel)), math.mean(penguin, [(penguin[String("shape")][String("length")]-1)], true));
  };
  function gerbil(mink, dugong) {
    return (mink[String("size")]/dugong);
  };
  function goosander(horse, oyster) {
    return (horse*oyster);
  };
  function reddeer(badger) {
    let mosquito = badger[String("shape")][(badger[String("shape")][String("length")]-4)];
    return math.reshape(badger, [mosquito, gerbil(badger, goosander(1, mosquito))]);
  };
  function termite(flamingo) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(flamingo, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[12], [2, 3, 1, 0], flamingo), [0, 1]), [1, 1], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[13]));
  };
  function sanddollar(goose) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(goose, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[14], [2, 3, 1, 0], goose), [0, 1]), [2, 2], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[15]));
  };
  function swan(grasshopper) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(grasshopper, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[16], [2, 3, 1, 0], grasshopper), [0, 1]), [4, 4], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[17]));
  };
  function reindeer(salmon) {
    return reddeer(termite(sanddollar(swan(salmon))));
  };
  function model(chimpanzee) {
    return walrus(reindeer(chimpanzee));
  };
  model.weights = [];
  return model;
})();