let base_net = (function () {
  let math = tf;
  function porcupine(hummingbird) {
    return hummingbird;
  };
  function okapi(cod) {
    let monkey = cod[String("shape")][String("length")];
    let mink = flux.data(tf.ones([monkey], String("int32")));
    let mammoth = cod[String("shape")];
    mink[monkey - 2] = mammoth[mammoth[String("length")] - (monkey - 1)];
    return math.add(math.mul(math.div(math.sub(cod, math.reshape(model.weights[0], [mink[3], mink[2], mink[1], mink[0]])), math.reshape(model.weights[1], [mink[3], mink[2], mink[1], mink[0]])), math.reshape(model.weights[2], [mink[3], mink[2], mink[1], mink[0]])), math.reshape(model.weights[3], [mink[3], mink[2], mink[1], mink[0]]));
  };
  function kinkajou(porpoise) {
    return math.add(math.transpose(math.conv2d(math.transpose(porpoise, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[4], [2, 3, 1, 0], porpoise), [0, 1]), [1, 1], 1), [0, 3, 1, 2]), model.weights[5]);
  };
  function snake(caterpillar) {
    let camel = caterpillar[String("shape")][String("length")];
    let raven = flux.data(tf.ones([camel], String("int32")));
    let snail = caterpillar[String("shape")];
    raven[camel - 2] = snail[snail[String("length")] - (camel - 1)];
    return math.add(math.mul(math.div(math.sub(caterpillar, math.reshape(model.weights[6], [raven[3], raven[2], raven[1], raven[0]])), math.reshape(model.weights[7], [raven[3], raven[2], raven[1], raven[0]])), math.reshape(model.weights[8], [raven[3], raven[2], raven[1], raven[0]])), math.reshape(model.weights[9], [raven[3], raven[2], raven[1], raven[0]]));
  };
  function crab(pig) {
    return math.add(math.transpose(math.conv2d(math.transpose(pig, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[10], [2, 3, 1, 0], pig), [0, 1]), [1, 1], 1), [0, 3, 1, 2]), model.weights[11]);
  };
  function cattle(sealion) {
    return math.relu(math.add(porcupine(sealion), okapi(kinkajou(math.relu(snake(crab(flux.slice(sealion))))))));
  };
  function ape(eagle) {
    return eagle;
  };
  function bison(jellyfish) {
    let mandrill = jellyfish[String("shape")][String("length")];
    let ferret = flux.data(tf.ones([mandrill], String("int32")));
    let shrew = jellyfish[String("shape")];
    ferret[mandrill - 2] = shrew[shrew[String("length")] - (mandrill - 1)];
    return math.add(math.mul(math.div(math.sub(jellyfish, math.reshape(model.weights[12], [ferret[3], ferret[2], ferret[1], ferret[0]])), math.reshape(model.weights[13], [ferret[3], ferret[2], ferret[1], ferret[0]])), math.reshape(model.weights[14], [ferret[3], ferret[2], ferret[1], ferret[0]])), math.reshape(model.weights[15], [ferret[3], ferret[2], ferret[1], ferret[0]]));
  };
  function dogfish(redpanda) {
    return math.add(math.transpose(math.conv2d(math.transpose(redpanda, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[16], [2, 3, 1, 0], redpanda), [0, 1]), [1, 1], 1), [0, 3, 1, 2]), model.weights[17]);
  };
  function toad(aardvark) {
    let badger = aardvark[String("shape")][String("length")];
    let gnat = flux.data(tf.ones([badger], String("int32")));
    let sandpiper = aardvark[String("shape")];
    gnat[badger - 2] = sandpiper[sandpiper[String("length")] - (badger - 1)];
    return math.add(math.mul(math.div(math.sub(aardvark, math.reshape(model.weights[18], [gnat[3], gnat[2], gnat[1], gnat[0]])), math.reshape(model.weights[19], [gnat[3], gnat[2], gnat[1], gnat[0]])), math.reshape(model.weights[20], [gnat[3], gnat[2], gnat[1], gnat[0]])), math.reshape(model.weights[21], [gnat[3], gnat[2], gnat[1], gnat[0]]));
  };
  function beaver(dunlin) {
    return math.add(math.transpose(math.conv2d(math.transpose(dunlin, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[22], [2, 3, 1, 0], dunlin), [0, 1]), [1, 1], 1), [0, 3, 1, 2]), model.weights[23]);
  };
  function kouprey(tapir) {
    return math.relu(math.add(ape(tapir), bison(dogfish(math.relu(toad(beaver(flux.slice(tapir))))))));
  };
  function oyster(yak) {
    return yak;
  };
  function dog(reddeer) {
    let ibex = reddeer[String("shape")][String("length")];
    let wombat = flux.data(tf.ones([ibex], String("int32")));
    let dragonfly = reddeer[String("shape")];
    wombat[ibex - 2] = dragonfly[dragonfly[String("length")] - (ibex - 1)];
    return math.add(math.mul(math.div(math.sub(reddeer, math.reshape(model.weights[24], [wombat[3], wombat[2], wombat[1], wombat[0]])), math.reshape(model.weights[25], [wombat[3], wombat[2], wombat[1], wombat[0]])), math.reshape(model.weights[26], [wombat[3], wombat[2], wombat[1], wombat[0]])), math.reshape(model.weights[27], [wombat[3], wombat[2], wombat[1], wombat[0]]));
  };
  function cockroach(tarsier) {
    return math.add(math.transpose(math.conv2d(math.transpose(tarsier, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[28], [2, 3, 1, 0], tarsier), [0, 1]), [1, 1], 1), [0, 3, 1, 2]), model.weights[29]);
  };
  function alpaca(kudu) {
    let komodo = kudu[String("shape")][String("length")];
    let narwhal = flux.data(tf.ones([komodo], String("int32")));
    let crow = kudu[String("shape")];
    narwhal[komodo - 2] = crow[crow[String("length")] - (komodo - 1)];
    return math.add(math.mul(math.div(math.sub(kudu, math.reshape(model.weights[30], [narwhal[3], narwhal[2], narwhal[1], narwhal[0]])), math.reshape(model.weights[31], [narwhal[3], narwhal[2], narwhal[1], narwhal[0]])), math.reshape(model.weights[32], [narwhal[3], narwhal[2], narwhal[1], narwhal[0]])), math.reshape(model.weights[33], [narwhal[3], narwhal[2], narwhal[1], narwhal[0]]));
  };
  function guineapig(grouse) {
    return math.add(math.transpose(math.conv2d(math.transpose(grouse, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[34], [2, 3, 1, 0], grouse), [0, 1]), [1, 1], 1), [0, 3, 1, 2]), model.weights[35]);
  };
  function chinchilla(lark) {
    return math.relu(math.add(oyster(lark), dog(cockroach(math.relu(alpaca(guineapig(flux.slice(lark))))))));
  };
  function spider(albatross) {
    return albatross;
  };
  function cobra(lion) {
    let panther = lion[String("shape")][String("length")];
    let partridge = flux.data(tf.ones([panther], String("int32")));
    let chamois = lion[String("shape")];
    partridge[panther - 2] = chamois[chamois[String("length")] - (panther - 1)];
    return math.add(math.mul(math.div(math.sub(lion, math.reshape(model.weights[36], [partridge[3], partridge[2], partridge[1], partridge[0]])), math.reshape(model.weights[37], [partridge[3], partridge[2], partridge[1], partridge[0]])), math.reshape(model.weights[38], [partridge[3], partridge[2], partridge[1], partridge[0]])), math.reshape(model.weights[39], [partridge[3], partridge[2], partridge[1], partridge[0]]));
  };
  function pony(chough) {
    return math.add(math.transpose(math.conv2d(math.transpose(chough, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[40], [2, 3, 1, 0], chough), [0, 1]), [1, 1], 1), [0, 3, 1, 2]), model.weights[41]);
  };
  function lemur(wren) {
    let rhinoceros = wren[String("shape")][String("length")];
    let cheetah = flux.data(tf.ones([rhinoceros], String("int32")));
    let wildebeest = wren[String("shape")];
    cheetah[rhinoceros - 2] = wildebeest[wildebeest[String("length")] - (rhinoceros - 1)];
    return math.add(math.mul(math.div(math.sub(wren, math.reshape(model.weights[42], [cheetah[3], cheetah[2], cheetah[1], cheetah[0]])), math.reshape(model.weights[43], [cheetah[3], cheetah[2], cheetah[1], cheetah[0]])), math.reshape(model.weights[44], [cheetah[3], cheetah[2], cheetah[1], cheetah[0]])), math.reshape(model.weights[45], [cheetah[3], cheetah[2], cheetah[1], cheetah[0]]));
  };
  function magpie(dove) {
    return math.add(math.transpose(math.conv2d(math.transpose(dove, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[46], [2, 3, 1, 0], dove), [0, 1]), [1, 1], 1), [0, 3, 1, 2]), model.weights[47]);
  };
  function hare(antelope) {
    return math.relu(math.add(spider(antelope), cobra(pony(math.relu(lemur(magpie(flux.slice(antelope))))))));
  };
  function elk(moose) {
    return moose;
  };
  function gaur(curlew) {
    let anteater = curlew[String("shape")][String("length")];
    let cassowary = flux.data(tf.ones([anteater], String("int32")));
    let swan = curlew[String("shape")];
    cassowary[anteater - 2] = swan[swan[String("length")] - (anteater - 1)];
    return math.add(math.mul(math.div(math.sub(curlew, math.reshape(model.weights[48], [cassowary[3], cassowary[2], cassowary[1], cassowary[0]])), math.reshape(model.weights[49], [cassowary[3], cassowary[2], cassowary[1], cassowary[0]])), math.reshape(model.weights[50], [cassowary[3], cassowary[2], cassowary[1], cassowary[0]])), math.reshape(model.weights[51], [cassowary[3], cassowary[2], cassowary[1], cassowary[0]]));
  };
  function lapwing(goosander) {
    return math.add(math.transpose(math.conv2d(math.transpose(goosander, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[52], [2, 3, 1, 0], goosander), [0, 1]), [1, 1], 1), [0, 3, 1, 2]), model.weights[53]);
  };
  function jaguar(rook) {
    let emu = rook[String("shape")][String("length")];
    let wolverine = flux.data(tf.ones([emu], String("int32")));
    let locust = rook[String("shape")];
    wolverine[emu - 2] = locust[locust[String("length")] - (emu - 1)];
    return math.add(math.mul(math.div(math.sub(rook, math.reshape(model.weights[54], [wolverine[3], wolverine[2], wolverine[1], wolverine[0]])), math.reshape(model.weights[55], [wolverine[3], wolverine[2], wolverine[1], wolverine[0]])), math.reshape(model.weights[56], [wolverine[3], wolverine[2], wolverine[1], wolverine[0]])), math.reshape(model.weights[57], [wolverine[3], wolverine[2], wolverine[1], wolverine[0]]));
  };
  function ibis(hippopotamus) {
    return math.add(math.transpose(math.conv2d(math.transpose(hippopotamus, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[58], [2, 3, 1, 0], hippopotamus), [0, 1]), [1, 1], 1), [0, 3, 1, 2]), model.weights[59]);
  };
  function pelican(crane) {
    return math.relu(math.add(elk(crane), gaur(lapwing(math.relu(jaguar(ibis(flux.slice(crane))))))));
  };
  function guanaco(barracuda) {
    let dotterel = barracuda[String("shape")][String("length")];
    let goldfinch = flux.data(tf.ones([dotterel], String("int32")));
    let reindeer = barracuda[String("shape")];
    goldfinch[dotterel - 2] = reindeer[reindeer[String("length")] - (dotterel - 1)];
    return math.relu(math.add(math.mul(math.div(math.sub(barracuda, math.reshape(model.weights[60], [goldfinch[3], goldfinch[2], goldfinch[1], goldfinch[0]])), math.reshape(model.weights[61], [goldfinch[3], goldfinch[2], goldfinch[1], goldfinch[0]])), math.reshape(model.weights[62], [goldfinch[3], goldfinch[2], goldfinch[1], goldfinch[0]])), math.reshape(model.weights[63], [goldfinch[3], goldfinch[2], goldfinch[1], goldfinch[0]])));
  };
  function rabbit(whale) {
    return math.add(math.transpose(math.conv2d(math.transpose(whale, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[64], [2, 3, 1, 0], whale), [0, 1]), [1, 1], 1), [0, 3, 1, 2]), model.weights[65]);
  };
  function model(falcon) {
    return cattle(kouprey(chinchilla(hare(pelican(guanaco(rabbit(falcon)))))));
  };
  model.weights = [];
  return model;
})();
