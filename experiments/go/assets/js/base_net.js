let base_net = (function () {
  let math = tf;
  function bee(mandrill) {
    return mandrill;
  };
  function sealion(pheasant) {
    let crocodile = math.add(math.transpose(math.conv2d(math.transpose(flux.slice(pheasant), [0, 2, 3, 1]), model.weights[18], [1, 1], 1), [0, 3, 1, 2]), model.weights[19]);
    let starling = crocodile[String("shape")][String("length")];
    let dunlin = flux.data(tf.ones([starling], String("int32")));
    let ant = crocodile[String("shape")];
    dunlin[starling - 2] = ant[ant[String("length")] - (starling - 1)];
    return dunlin;
  };
  function beaver(goosander) {
    let barracuda = math.add(math.transpose(math.conv2d(math.transpose(flux.slice(goosander), [0, 2, 3, 1]), model.weights[28], [1, 1], 1), [0, 3, 1, 2]), model.weights[29]);
    let wombat = barracuda[String("shape")][String("length")];
    let porpoise = flux.data(tf.ones([wombat], String("int32")));
    let zebra = barracuda[String("shape")];
    porpoise[wombat - 2] = zebra[zebra[String("length")] - (wombat - 1)];
    return porpoise;
  };
  function bird(okapi) {
    let louse = math.add(math.transpose(math.conv2d(math.transpose(flux.slice(okapi), [0, 2, 3, 1]), model.weights[20], [1, 1], 1), [0, 3, 1, 2]), model.weights[21]);
    let grouse = beaver(louse);
    let elephant = math.add(math.transpose(math.conv2d(math.transpose(math.relu(math.add(math.mul(math.div(math.sub(louse, math.reshape(model.weights[22], [grouse[3], grouse[2], grouse[1], grouse[0]])), math.reshape(model.weights[23], [grouse[3], grouse[2], grouse[1], grouse[0]])), math.reshape(model.weights[24], [grouse[3], grouse[2], grouse[1], grouse[0]])), math.reshape(model.weights[25], [grouse[3], grouse[2], grouse[1], grouse[0]]))), [0, 2, 3, 1]), model.weights[26], [1, 1], 1), [0, 3, 1, 2]), model.weights[27]);
    let snake = elephant[String("shape")][String("length")];
    let cattle = flux.data(tf.ones([snake], String("int32")));
    let badger = elephant[String("shape")];
    cattle[snake - 2] = badger[badger[String("length")] - (snake - 1)];
    return cattle;
  };
  function hedgehog(buffalo) {
    let chinchilla = math.add(math.transpose(math.conv2d(math.transpose(flux.slice(buffalo), [0, 2, 3, 1]), model.weights[6], [1, 1], 1), [0, 3, 1, 2]), model.weights[7]);
    let dotterel = sealion(chinchilla);
    let tiger = math.add(math.transpose(math.conv2d(math.transpose(math.relu(math.add(math.mul(math.div(math.sub(chinchilla, math.reshape(model.weights[8], [dotterel[3], dotterel[2], dotterel[1], dotterel[0]])), math.reshape(model.weights[9], [dotterel[3], dotterel[2], dotterel[1], dotterel[0]])), math.reshape(model.weights[10], [dotterel[3], dotterel[2], dotterel[1], dotterel[0]])), math.reshape(model.weights[11], [dotterel[3], dotterel[2], dotterel[1], dotterel[0]]))), [0, 2, 3, 1]), model.weights[12], [1, 1], 1), [0, 3, 1, 2]), model.weights[13]);
    let eland = bird(tiger);
    return math.relu(math.add(bee(buffalo), math.add(math.mul(math.div(math.sub(tiger, math.reshape(model.weights[14], [eland[3], eland[2], eland[1], eland[0]])), math.reshape(model.weights[15], [eland[3], eland[2], eland[1], eland[0]])), math.reshape(model.weights[16], [eland[3], eland[2], eland[1], eland[0]])), math.reshape(model.weights[17], [eland[3], eland[2], eland[1], eland[0]]))));
  };
  function alligator(locust) {
    let gaur = math.add(math.transpose(math.conv2d(math.transpose(locust, [0, 2, 3, 1]), model.weights[30], [1, 1], 1), [0, 3, 1, 2]), model.weights[31]);
    let frog = gaur[String("shape")][String("length")];
    let wasp = flux.data(tf.ones([frog], String("int32")));
    let mink = gaur[String("shape")];
    wasp[frog - 2] = mink[mink[String("length")] - (frog - 1)];
    return wasp;
  };
  function model(reddeer) {
    let wildebeest = math.add(math.transpose(math.conv2d(math.transpose(reddeer, [0, 2, 3, 1]), model.weights[0], [1, 1], 1), [0, 3, 1, 2]), model.weights[1]);
    let pony = alligator(wildebeest);
    return hedgehog(math.relu(math.add(math.mul(math.div(math.sub(wildebeest, math.reshape(model.weights[2], [pony[3], pony[2], pony[1], pony[0]])), math.reshape(model.weights[3], [pony[3], pony[2], pony[1], pony[0]])), math.reshape(model.weights[4], [pony[3], pony[2], pony[1], pony[0]])), math.reshape(model.weights[5], [pony[3], pony[2], pony[1], pony[0]]))));
  };
  model.weights = [];
  return model;
})();