let base_net = (function () {
  let math = tf;
  function weasel(newt) {
    return newt;
  };
  function donkey(lark) {
    let flamingo = lark[String("shape")][String("length")];
    let guanaco = flux.data(tf.ones([flamingo], String("int32")));
    let lobster = lark[String("shape")];
    guanaco[flamingo - 2] = lobster[lobster[String("length")] - (flamingo - 1)];
    return guanaco;
  };
  function guineafowl(lyrebird) {
    let wombat = lyrebird[String("shape")][String("length")];
    let fish = flux.data(tf.ones([wombat], String("int32")));
    let porcupine = lyrebird[String("shape")];
    fish[wombat - 2] = porcupine[porcupine[String("length")] - (wombat - 1)];
    return fish;
  };
  function ibex(heron) {
    let mandrill = math.add(math.transpose(math.conv2d(math.transpose(flux.slice(heron), [0, 2, 3, 1]), model.weights[6], [1, 1], 1), [0, 3, 1, 2]), model.weights[7]);
    let salamander = donkey(mandrill);
    let sanddollar = math.add(math.transpose(math.conv2d(math.transpose(math.relu(math.add(math.mul(math.div(math.sub(mandrill, math.reshape(model.weights[8], [salamander[3], salamander[2], salamander[1], salamander[0]])), math.reshape(model.weights[9], [salamander[3], salamander[2], salamander[1], salamander[0]])), math.reshape(model.weights[10], [salamander[3], salamander[2], salamander[1], salamander[0]])), math.reshape(model.weights[11], [salamander[3], salamander[2], salamander[1], salamander[0]]))), [0, 2, 3, 1]), model.weights[12], [1, 1], 1), [0, 3, 1, 2]), model.weights[13]);
    let coyote = guineafowl(sanddollar);
    return math.relu(math.add(weasel(heron), math.add(math.mul(math.div(math.sub(sanddollar, math.reshape(model.weights[14], [coyote[3], coyote[2], coyote[1], coyote[0]])), math.reshape(model.weights[15], [coyote[3], coyote[2], coyote[1], coyote[0]])), math.reshape(model.weights[16], [coyote[3], coyote[2], coyote[1], coyote[0]])), math.reshape(model.weights[17], [coyote[3], coyote[2], coyote[1], coyote[0]]))));
  };
  function gnat(reindeer) {
    return reindeer;
  };
  function yak(barracuda) {
    let gorilla = barracuda[String("shape")][String("length")];
    let horse = flux.data(tf.ones([gorilla], String("int32")));
    let sheep = barracuda[String("shape")];
    horse[gorilla - 2] = sheep[sheep[String("length")] - (gorilla - 1)];
    return horse;
  };
  function otter(goosander) {
    let cormorant = goosander[String("shape")][String("length")];
    let ape = flux.data(tf.ones([cormorant], String("int32")));
    let deer = goosander[String("shape")];
    ape[cormorant - 2] = deer[deer[String("length")] - (cormorant - 1)];
    return ape;
  };
  function partridge(jay) {
    let reddeer = math.add(math.transpose(math.conv2d(math.transpose(flux.slice(jay), [0, 2, 3, 1]), model.weights[18], [1, 1], 1), [0, 3, 1, 2]), model.weights[19]);
    let peafowl = yak(reddeer);
    let chamois = math.add(math.transpose(math.conv2d(math.transpose(math.relu(math.add(math.mul(math.div(math.sub(reddeer, math.reshape(model.weights[20], [peafowl[3], peafowl[2], peafowl[1], peafowl[0]])), math.reshape(model.weights[21], [peafowl[3], peafowl[2], peafowl[1], peafowl[0]])), math.reshape(model.weights[22], [peafowl[3], peafowl[2], peafowl[1], peafowl[0]])), math.reshape(model.weights[23], [peafowl[3], peafowl[2], peafowl[1], peafowl[0]]))), [0, 2, 3, 1]), model.weights[24], [1, 1], 1), [0, 3, 1, 2]), model.weights[25]);
    let alligator = otter(chamois);
    return math.relu(math.add(gnat(jay), math.add(math.mul(math.div(math.sub(chamois, math.reshape(model.weights[26], [alligator[3], alligator[2], alligator[1], alligator[0]])), math.reshape(model.weights[27], [alligator[3], alligator[2], alligator[1], alligator[0]])), math.reshape(model.weights[28], [alligator[3], alligator[2], alligator[1], alligator[0]])), math.reshape(model.weights[29], [alligator[3], alligator[2], alligator[1], alligator[0]]))));
  };
  function eland(dotterel) {
    return dotterel;
  };
  function panther(ostrich) {
    let dog = ostrich[String("shape")][String("length")];
    let wolverine = flux.data(tf.ones([dog], String("int32")));
    let louse = ostrich[String("shape")];
    wolverine[dog - 2] = louse[louse[String("length")] - (dog - 1)];
    return wolverine;
  };
  function raven(eel) {
    let butterfly = eel[String("shape")][String("length")];
    let gazelle = flux.data(tf.ones([butterfly], String("int32")));
    let camel = eel[String("shape")];
    gazelle[butterfly - 2] = camel[camel[String("length")] - (butterfly - 1)];
    return gazelle;
  };
  function panda(badger) {
    let owl = math.add(math.transpose(math.conv2d(math.transpose(flux.slice(badger), [0, 2, 3, 1]), model.weights[30], [1, 1], 1), [0, 3, 1, 2]), model.weights[31]);
    let mongoose = panther(owl);
    let snail = math.add(math.transpose(math.conv2d(math.transpose(math.relu(math.add(math.mul(math.div(math.sub(owl, math.reshape(model.weights[32], [mongoose[3], mongoose[2], mongoose[1], mongoose[0]])), math.reshape(model.weights[33], [mongoose[3], mongoose[2], mongoose[1], mongoose[0]])), math.reshape(model.weights[34], [mongoose[3], mongoose[2], mongoose[1], mongoose[0]])), math.reshape(model.weights[35], [mongoose[3], mongoose[2], mongoose[1], mongoose[0]]))), [0, 2, 3, 1]), model.weights[36], [1, 1], 1), [0, 3, 1, 2]), model.weights[37]);
    let rat = raven(snail);
    return math.relu(math.add(eland(badger), math.add(math.mul(math.div(math.sub(snail, math.reshape(model.weights[38], [rat[3], rat[2], rat[1], rat[0]])), math.reshape(model.weights[39], [rat[3], rat[2], rat[1], rat[0]])), math.reshape(model.weights[40], [rat[3], rat[2], rat[1], rat[0]])), math.reshape(model.weights[41], [rat[3], rat[2], rat[1], rat[0]]))));
  };
  function emu(koala) {
    return koala;
  };
  function jellyfish(locust) {
    let bison = locust[String("shape")][String("length")];
    let lapwing = flux.data(tf.ones([bison], String("int32")));
    let baboon = locust[String("shape")];
    lapwing[bison - 2] = baboon[baboon[String("length")] - (bison - 1)];
    return lapwing;
  };
  function grouse(wasp) {
    let quetzal = wasp[String("shape")][String("length")];
    let magpie = flux.data(tf.ones([quetzal], String("int32")));
    let komodo = wasp[String("shape")];
    magpie[quetzal - 2] = komodo[komodo[String("length")] - (quetzal - 1)];
    return magpie;
  };
  function cheetah(raccoon) {
    let monkey = math.add(math.transpose(math.conv2d(math.transpose(flux.slice(raccoon), [0, 2, 3, 1]), model.weights[42], [1, 1], 1), [0, 3, 1, 2]), model.weights[43]);
    let cat = jellyfish(monkey);
    let rook = math.add(math.transpose(math.conv2d(math.transpose(math.relu(math.add(math.mul(math.div(math.sub(monkey, math.reshape(model.weights[44], [cat[3], cat[2], cat[1], cat[0]])), math.reshape(model.weights[45], [cat[3], cat[2], cat[1], cat[0]])), math.reshape(model.weights[46], [cat[3], cat[2], cat[1], cat[0]])), math.reshape(model.weights[47], [cat[3], cat[2], cat[1], cat[0]]))), [0, 2, 3, 1]), model.weights[48], [1, 1], 1), [0, 3, 1, 2]), model.weights[49]);
    let tarsier = grouse(rook);
    return math.relu(math.add(emu(raccoon), math.add(math.mul(math.div(math.sub(rook, math.reshape(model.weights[50], [tarsier[3], tarsier[2], tarsier[1], tarsier[0]])), math.reshape(model.weights[51], [tarsier[3], tarsier[2], tarsier[1], tarsier[0]])), math.reshape(model.weights[52], [tarsier[3], tarsier[2], tarsier[1], tarsier[0]])), math.reshape(model.weights[53], [tarsier[3], tarsier[2], tarsier[1], tarsier[0]]))));
  };
  function wildebeest(vicuña) {
    return vicuña;
  };
  function mole(chinchilla) {
    let squirrel = chinchilla[String("shape")][String("length")];
    let goose = flux.data(tf.ones([squirrel], String("int32")));
    let shrew = chinchilla[String("shape")];
    goose[squirrel - 2] = shrew[shrew[String("length")] - (squirrel - 1)];
    return goose;
  };
  function sloth(ferret) {
    let wren = ferret[String("shape")][String("length")];
    let kangaroo = flux.data(tf.ones([wren], String("int32")));
    let prairiedog = ferret[String("shape")];
    kangaroo[wren - 2] = prairiedog[prairiedog[String("length")] - (wren - 1)];
    return kangaroo;
  };
  function seahorse(hedgehog) {
    let ibis = math.add(math.transpose(math.conv2d(math.transpose(flux.slice(hedgehog), [0, 2, 3, 1]), model.weights[54], [1, 1], 1), [0, 3, 1, 2]), model.weights[55]);
    let armadillo = mole(ibis);
    let falcon = math.add(math.transpose(math.conv2d(math.transpose(math.relu(math.add(math.mul(math.div(math.sub(ibis, math.reshape(model.weights[56], [armadillo[3], armadillo[2], armadillo[1], armadillo[0]])), math.reshape(model.weights[57], [armadillo[3], armadillo[2], armadillo[1], armadillo[0]])), math.reshape(model.weights[58], [armadillo[3], armadillo[2], armadillo[1], armadillo[0]])), math.reshape(model.weights[59], [armadillo[3], armadillo[2], armadillo[1], armadillo[0]]))), [0, 2, 3, 1]), model.weights[60], [1, 1], 1), [0, 3, 1, 2]), model.weights[61]);
    let donkey = sloth(falcon);
    return math.relu(math.add(wildebeest(hedgehog), math.add(math.mul(math.div(math.sub(falcon, math.reshape(model.weights[62], [donkey[3], donkey[2], donkey[1], donkey[0]])), math.reshape(model.weights[63], [donkey[3], donkey[2], donkey[1], donkey[0]])), math.reshape(model.weights[64], [donkey[3], donkey[2], donkey[1], donkey[0]])), math.reshape(model.weights[65], [donkey[3], donkey[2], donkey[1], donkey[0]]))));
  };
  function fly(swan) {
    let caterpillar = swan[String("shape")][String("length")];
    let lion = flux.data(tf.ones([caterpillar], String("int32")));
    let snake = swan[String("shape")];
    lion[caterpillar - 2] = snake[snake[String("length")] - (caterpillar - 1)];
    return lion;
  };
  function model(duck) {
    let bee = math.add(math.transpose(math.conv2d(math.transpose(duck, [0, 2, 3, 1]), model.weights[0], [1, 1], 1), [0, 3, 1, 2]), model.weights[1]);
    let dragonfly = fly(bee);
    return ibex(partridge(panda(cheetah(seahorse(math.relu(math.add(math.mul(math.div(math.sub(bee, math.reshape(model.weights[2], [dragonfly[3], dragonfly[2], dragonfly[1], dragonfly[0]])), math.reshape(model.weights[3], [dragonfly[3], dragonfly[2], dragonfly[1], dragonfly[0]])), math.reshape(model.weights[4], [dragonfly[3], dragonfly[2], dragonfly[1], dragonfly[0]])), math.reshape(model.weights[5], [dragonfly[3], dragonfly[2], dragonfly[1], dragonfly[0]]))))))));
  };
  model.weights = [];
  return model;
})();
