let starry_night = (function () {
  let math = tf;
  function cockroach(mink) {
    return math.add(math.transpose(math.conv2dTranspose(math.transpose(mink, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[0], [2, 3, 1, 0], mink), [0, 1]), flux.ctOutSize(mink, model.weights[1], [1, 1], [1, 1], [1, 1], [0, 0]), [1, 1], 1, "floor"), [0, 3, 1, 2]), model.weights[2]);
  };
  function cobra(fly) {
    let cheetah = fly[String("shape")][String("length")];
    let grouse = [].fill.apply(Array(cheetah), [1]);
    let shrew = fly[String("shape")];
    grouse[cheetah - 2] = shrew[shrew[String("length")] - (cheetah - 1)];
    return math.relu(math.add(math.mul(math.reshape(model.weights[3], [grouse[3], grouse[2], grouse[1], grouse[0]]), math.div(math.sub(fly, math.reshape(model.weights[4], [grouse[3], grouse[2], grouse[1], grouse[0]])), math.reshape(model.weights[5], [grouse[3], grouse[2], grouse[1], grouse[0]]))), math.reshape(model.weights[6], [grouse[3], grouse[2], grouse[1], grouse[0]])));
  };
  function waterbuffalo(reindeer) {
    return math.add(math.transpose(math.conv2dTranspose(math.transpose(reindeer, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[7], [2, 3, 1, 0], reindeer), [0, 1]), flux.ctOutSize(reindeer, model.weights[8], [2, 2], [1, 1], [1, 1], [1, 1]), [2, 2], 1, "floor"), [0, 3, 1, 2]), model.weights[9]);
  };
  function dog(llama) {
    let dugong = llama[String("shape")][String("length")];
    let mole = [].fill.apply(Array(dugong), [1]);
    let leopard = llama[String("shape")];
    mole[dugong - 2] = leopard[leopard[String("length")] - (dugong - 1)];
    return math.relu(math.add(math.mul(math.reshape(model.weights[10], [mole[3], mole[2], mole[1], mole[0]]), math.div(math.sub(llama, math.reshape(model.weights[11], [mole[3], mole[2], mole[1], mole[0]])), math.reshape(model.weights[12], [mole[3], mole[2], mole[1], mole[0]]))), math.reshape(model.weights[13], [mole[3], mole[2], mole[1], mole[0]])));
  };
  function goat(gerbil) {
    return math.add(math.transpose(math.conv2dTranspose(math.transpose(gerbil, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[14], [2, 3, 1, 0], gerbil), [0, 1]), flux.ctOutSize(gerbil, model.weights[15], [2, 2], [1, 1], [1, 1], [1, 1]), [2, 2], 1, "floor"), [0, 3, 1, 2]), model.weights[16]);
  };
  function boar(chimpanzee) {
    let jellyfish = chimpanzee[String("shape")][String("length")];
    let otter = [].fill.apply(Array(jellyfish), [1]);
    let chough = chimpanzee[String("shape")];
    otter[jellyfish - 2] = chough[chough[String("length")] - (jellyfish - 1)];
    return math.add(math.mul(math.reshape(model.weights[17], [otter[3], otter[2], otter[1], otter[0]]), math.div(math.sub(chimpanzee, math.reshape(model.weights[18], [otter[3], otter[2], otter[1], otter[0]])), math.reshape(model.weights[19], [otter[3], otter[2], otter[1], otter[0]]))), math.reshape(model.weights[20], [otter[3], otter[2], otter[1], otter[0]]));
  };
  function dogfish(rat) {
    return math.add(math.transpose(math.conv2d(math.transpose(rat, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[21], [2, 3, 1, 0], rat), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[22]);
  };
  function flamingo(chinchilla) {
    let fish = chinchilla[String("shape")][String("length")];
    let ant = [].fill.apply(Array(fish), [1]);
    let owl = chinchilla[String("shape")];
    ant[fish - 2] = owl[owl[String("length")] - (fish - 1)];
    return math.add(math.mul(math.reshape(model.weights[23], [ant[3], ant[2], ant[1], ant[0]]), math.div(math.sub(chinchilla, math.reshape(model.weights[24], [ant[3], ant[2], ant[1], ant[0]])), math.reshape(model.weights[25], [ant[3], ant[2], ant[1], ant[0]]))), math.reshape(model.weights[26], [ant[3], ant[2], ant[1], ant[0]]));
  };
  function ibex(redpanda) {
    return math.add(math.transpose(math.conv2d(math.transpose(redpanda, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[27], [2, 3, 1, 0], redpanda), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[28]);
  };
  function lapwing(polarbear) {
    return math.add(polarbear, boar(dogfish(math.relu(flamingo(ibex(polarbear))))));
  };
  function gnat(okapi) {
    let monkey = okapi[String("shape")][String("length")];
    let moose = [].fill.apply(Array(monkey), [1]);
    let guineapig = okapi[String("shape")];
    moose[monkey - 2] = guineapig[guineapig[String("length")] - (monkey - 1)];
    return math.add(math.mul(math.reshape(model.weights[29], [moose[3], moose[2], moose[1], moose[0]]), math.div(math.sub(okapi, math.reshape(model.weights[30], [moose[3], moose[2], moose[1], moose[0]])), math.reshape(model.weights[31], [moose[3], moose[2], moose[1], moose[0]]))), math.reshape(model.weights[32], [moose[3], moose[2], moose[1], moose[0]]));
  };
  function camel(salamander) {
    return math.add(math.transpose(math.conv2d(math.transpose(salamander, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[33], [2, 3, 1, 0], salamander), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[34]);
  };
  function jay(dolphin) {
    let giraffe = dolphin[String("shape")][String("length")];
    let alpaca = [].fill.apply(Array(giraffe), [1]);
    let finch = dolphin[String("shape")];
    alpaca[giraffe - 2] = finch[finch[String("length")] - (giraffe - 1)];
    return math.add(math.mul(math.reshape(model.weights[35], [alpaca[3], alpaca[2], alpaca[1], alpaca[0]]), math.div(math.sub(dolphin, math.reshape(model.weights[36], [alpaca[3], alpaca[2], alpaca[1], alpaca[0]])), math.reshape(model.weights[37], [alpaca[3], alpaca[2], alpaca[1], alpaca[0]]))), math.reshape(model.weights[38], [alpaca[3], alpaca[2], alpaca[1], alpaca[0]]));
  };
  function cormorant(hyena) {
    return math.add(math.transpose(math.conv2d(math.transpose(hyena, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[39], [2, 3, 1, 0], hyena), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[40]);
  };
  function pigeon(skunk) {
    return math.add(skunk, gnat(camel(math.relu(jay(cormorant(skunk))))));
  };
  function gull(dinosaur) {
    let jackal = dinosaur[String("shape")][String("length")];
    let badger = [].fill.apply(Array(jackal), [1]);
    let ram = dinosaur[String("shape")];
    badger[jackal - 2] = ram[ram[String("length")] - (jackal - 1)];
    return math.add(math.mul(math.reshape(model.weights[41], [badger[3], badger[2], badger[1], badger[0]]), math.div(math.sub(dinosaur, math.reshape(model.weights[42], [badger[3], badger[2], badger[1], badger[0]])), math.reshape(model.weights[43], [badger[3], badger[2], badger[1], badger[0]]))), math.reshape(model.weights[44], [badger[3], badger[2], badger[1], badger[0]]));
  };
  function hare(bird) {
    return math.add(math.transpose(math.conv2d(math.transpose(bird, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[45], [2, 3, 1, 0], bird), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[46]);
  };
  function donkey(vicuña) {
    let lemur = vicuña[String("shape")][String("length")];
    let walrus = [].fill.apply(Array(lemur), [1]);
    let wolf = vicuña[String("shape")];
    walrus[lemur - 2] = wolf[wolf[String("length")] - (lemur - 1)];
    return math.add(math.mul(math.reshape(model.weights[47], [walrus[3], walrus[2], walrus[1], walrus[0]]), math.div(math.sub(vicuña, math.reshape(model.weights[48], [walrus[3], walrus[2], walrus[1], walrus[0]])), math.reshape(model.weights[49], [walrus[3], walrus[2], walrus[1], walrus[0]]))), math.reshape(model.weights[50], [walrus[3], walrus[2], walrus[1], walrus[0]]));
  };
  function peafowl(rhinoceros) {
    return math.add(math.transpose(math.conv2d(math.transpose(rhinoceros, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[51], [2, 3, 1, 0], rhinoceros), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[52]);
  };
  function wolverine(shark) {
    return math.add(shark, gull(hare(math.relu(donkey(peafowl(shark))))));
  };
  function starling(tiger) {
    let mosquito = tiger[String("shape")][String("length")];
    let echidna = [].fill.apply(Array(mosquito), [1]);
    let butterfly = tiger[String("shape")];
    echidna[mosquito - 2] = butterfly[butterfly[String("length")] - (mosquito - 1)];
    return math.add(math.mul(math.reshape(model.weights[53], [echidna[3], echidna[2], echidna[1], echidna[0]]), math.div(math.sub(tiger, math.reshape(model.weights[54], [echidna[3], echidna[2], echidna[1], echidna[0]])), math.reshape(model.weights[55], [echidna[3], echidna[2], echidna[1], echidna[0]]))), math.reshape(model.weights[56], [echidna[3], echidna[2], echidna[1], echidna[0]]));
  };
  function quelea(baboon) {
    return math.add(math.transpose(math.conv2d(math.transpose(baboon, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[57], [2, 3, 1, 0], baboon), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[58]);
  };
  function cod(bee) {
    let gaur = bee[String("shape")][String("length")];
    let seal = [].fill.apply(Array(gaur), [1]);
    let mammoth = bee[String("shape")];
    seal[gaur - 2] = mammoth[mammoth[String("length")] - (gaur - 1)];
    return math.add(math.mul(math.reshape(model.weights[59], [seal[3], seal[2], seal[1], seal[0]]), math.div(math.sub(bee, math.reshape(model.weights[60], [seal[3], seal[2], seal[1], seal[0]])), math.reshape(model.weights[61], [seal[3], seal[2], seal[1], seal[0]]))), math.reshape(model.weights[62], [seal[3], seal[2], seal[1], seal[0]]));
  };
  function guineafowl(elk) {
    return math.add(math.transpose(math.conv2d(math.transpose(elk, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[63], [2, 3, 1, 0], elk), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[64]);
  };
  function yak(sandpiper) {
    return math.add(sandpiper, starling(quelea(math.relu(cod(guineafowl(sandpiper))))));
  };
  function goshawk(weasel) {
    let grasshopper = weasel[String("shape")][String("length")];
    let parrot = [].fill.apply(Array(grasshopper), [1]);
    let curlew = weasel[String("shape")];
    parrot[grasshopper - 2] = curlew[curlew[String("length")] - (grasshopper - 1)];
    return math.add(math.mul(math.reshape(model.weights[65], [parrot[3], parrot[2], parrot[1], parrot[0]]), math.div(math.sub(weasel, math.reshape(model.weights[66], [parrot[3], parrot[2], parrot[1], parrot[0]])), math.reshape(model.weights[67], [parrot[3], parrot[2], parrot[1], parrot[0]]))), math.reshape(model.weights[68], [parrot[3], parrot[2], parrot[1], parrot[0]]));
  };
  function deer(zebra) {
    return math.add(math.transpose(math.conv2d(math.transpose(zebra, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[69], [2, 3, 1, 0], zebra), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[70]);
  };
  function dragonfly(magpie) {
    let panther = magpie[String("shape")][String("length")];
    let caribou = [].fill.apply(Array(panther), [1]);
    let penguin = magpie[String("shape")];
    caribou[panther - 2] = penguin[penguin[String("length")] - (panther - 1)];
    return math.add(math.mul(math.reshape(model.weights[71], [caribou[3], caribou[2], caribou[1], caribou[0]]), math.div(math.sub(magpie, math.reshape(model.weights[72], [caribou[3], caribou[2], caribou[1], caribou[0]])), math.reshape(model.weights[73], [caribou[3], caribou[2], caribou[1], caribou[0]]))), math.reshape(model.weights[74], [caribou[3], caribou[2], caribou[1], caribou[0]]));
  };
  function opossum(mallard) {
    return math.add(math.transpose(math.conv2d(math.transpose(mallard, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[75], [2, 3, 1, 0], mallard), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[76]);
  };
  function crab(alligator) {
    return math.add(alligator, goshawk(deer(math.relu(dragonfly(opossum(alligator))))));
  };
  function eel(tarsier) {
    let goosander = tarsier[String("shape")][String("length")];
    let raccoon = [].fill.apply(Array(goosander), [1]);
    let crow = tarsier[String("shape")];
    raccoon[goosander - 2] = crow[crow[String("length")] - (goosander - 1)];
    return math.relu(math.add(math.mul(math.reshape(model.weights[77], [raccoon[3], raccoon[2], raccoon[1], raccoon[0]]), math.div(math.sub(tarsier, math.reshape(model.weights[78], [raccoon[3], raccoon[2], raccoon[1], raccoon[0]])), math.reshape(model.weights[79], [raccoon[3], raccoon[2], raccoon[1], raccoon[0]]))), math.reshape(model.weights[80], [raccoon[3], raccoon[2], raccoon[1], raccoon[0]])));
  };
  function hawk(coyote) {
    return math.add(math.transpose(math.conv2d(math.transpose(coyote, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[81], [2, 3, 1, 0], coyote), [0, 1]), [2, 2], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[82]);
  };
  function turkey(ostrich) {
    let eland = ostrich[String("shape")][String("length")];
    let ibis = [].fill.apply(Array(eland), [1]);
    let antelope = ostrich[String("shape")];
    ibis[eland - 2] = antelope[antelope[String("length")] - (eland - 1)];
    return math.relu(math.add(math.mul(math.reshape(model.weights[83], [ibis[3], ibis[2], ibis[1], ibis[0]]), math.div(math.sub(ostrich, math.reshape(model.weights[84], [ibis[3], ibis[2], ibis[1], ibis[0]])), math.reshape(model.weights[85], [ibis[3], ibis[2], ibis[1], ibis[0]]))), math.reshape(model.weights[86], [ibis[3], ibis[2], ibis[1], ibis[0]])));
  };
  function swan(armadillo) {
    return math.add(math.transpose(math.conv2d(math.transpose(armadillo, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[87], [2, 3, 1, 0], armadillo), [0, 1]), [2, 2], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[88]);
  };
  function quail(prairiedog) {
    let koala = prairiedog[String("shape")][String("length")];
    let bat = [].fill.apply(Array(koala), [1]);
    let dotterel = prairiedog[String("shape")];
    bat[koala - 2] = dotterel[dotterel[String("length")] - (koala - 1)];
    return math.relu(math.add(math.mul(math.reshape(model.weights[89], [bat[3], bat[2], bat[1], bat[0]]), math.div(math.sub(prairiedog, math.reshape(model.weights[90], [bat[3], bat[2], bat[1], bat[0]])), math.reshape(model.weights[91], [bat[3], bat[2], bat[1], bat[0]]))), math.reshape(model.weights[92], [bat[3], bat[2], bat[1], bat[0]])));
  };
  function emu(anteater) {
    return math.add(math.transpose(math.conv2d(math.transpose(anteater, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[93], [2, 3, 1, 0], anteater), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[94]);
  };
  function model(buffalo) {
    return cockroach(cobra(waterbuffalo(dog(goat(lapwing(pigeon(wolverine(yak(crab(eel(hawk(turkey(swan(quail(emu(buffalo))))))))))))))));
  };
  model.weights = [];
  return model;
})();