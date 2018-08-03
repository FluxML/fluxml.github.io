let abstract_art = (function () {
  let math = tf;
  function rhinoceros(koala) {
    return math.add(math.transpose(math.conv2dTranspose(math.transpose(koala, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[0], [2, 3, 1, 0], koala), [0, 1]), flux.ctOutSize(koala, model.weights[1], [1, 1], [1, 1], [1, 1], [0, 0]), [1, 1], 1, "floor"), [0, 3, 1, 2]), model.weights[2]);
  };
  let walrus = math.tensor(1.0e-5);
  function turkey(porcupine) {
    let guineafowl = porcupine[String("shape")][String("length")];
    let bison = [].fill.apply(Array(guineafowl), [1]);
    let squirrel = [].concat.call(flux.range(1, (guineafowl-2)), guineafowl);
    let eland = math.mean(porcupine, [(porcupine[String("shape")][String("length")]-squirrel[0]), (porcupine[String("shape")][String("length")]-squirrel[1]), (porcupine[String("shape")][String("length")]-squirrel[2])], true);
    let flamingo = math.pow(math.sub(porcupine, eland), model.weights[4]);
    bison[(guineafowl-2)] = porcupine[String("shape")][(porcupine[String("shape")][String("length")]-(guineafowl-1))];
    return math.relu(math.add(math.mul(math.reshape(model.weights[3], [bison[3], bison[2], bison[1], bison[0]]), math.div(math.sub(porcupine, eland), tf.sqrt(math.add(math.mean(flamingo, [(flamingo[String("shape")][String("length")]-squirrel[0]), (flamingo[String("shape")][String("length")]-squirrel[1]), (flamingo[String("shape")][String("length")]-squirrel[2])], true), walrus)))), math.reshape(model.weights[5], [bison[3], bison[2], bison[1], bison[0]])));
  };
  function tapir(donkey) {
    return math.add(math.transpose(math.conv2dTranspose(math.transpose(donkey, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[6], [2, 3, 1, 0], donkey), [0, 1]), flux.ctOutSize(donkey, model.weights[7], [2, 2], [1, 1], [1, 1], [1, 1]), [2, 2], 1, "floor"), [0, 3, 1, 2]), model.weights[8]);
  };
  let shrew = math.tensor(1.0e-5);
  function yak(dog) {
    let butterfly = dog[String("shape")][String("length")];
    let gnu = [].fill.apply(Array(butterfly), [1]);
    let quetzal = [].concat.call(flux.range(1, (butterfly-2)), butterfly);
    let skunk = math.mean(dog, [(dog[String("shape")][String("length")]-quetzal[0]), (dog[String("shape")][String("length")]-quetzal[1]), (dog[String("shape")][String("length")]-quetzal[2])], true);
    let cassowary = math.pow(math.sub(dog, skunk), model.weights[10]);
    gnu[(butterfly-2)] = dog[String("shape")][(dog[String("shape")][String("length")]-(butterfly-1))];
    return math.relu(math.add(math.mul(math.reshape(model.weights[9], [gnu[3], gnu[2], gnu[1], gnu[0]]), math.div(math.sub(dog, skunk), tf.sqrt(math.add(math.mean(cassowary, [(cassowary[String("shape")][String("length")]-quetzal[0]), (cassowary[String("shape")][String("length")]-quetzal[1]), (cassowary[String("shape")][String("length")]-quetzal[2])], true), shrew)))), math.reshape(model.weights[11], [gnu[3], gnu[2], gnu[1], gnu[0]])));
  };
  function waterbuffalo(nightingale) {
    return math.add(math.transpose(math.conv2dTranspose(math.transpose(nightingale, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[12], [2, 3, 1, 0], nightingale), [0, 1]), flux.ctOutSize(nightingale, model.weights[13], [2, 2], [1, 1], [1, 1], [1, 1]), [2, 2], 1, "floor"), [0, 3, 1, 2]), model.weights[14]);
  };
  let penguin = math.tensor(1.0e-5);
  function lobster(curlew) {
    let mandrill = curlew[String("shape")][String("length")];
    let toad = [].fill.apply(Array(mandrill), [1]);
    let polarbear = [].concat.call(flux.range(1, (mandrill-2)), mandrill);
    let lion = math.mean(curlew, [(curlew[String("shape")][String("length")]-polarbear[0]), (curlew[String("shape")][String("length")]-polarbear[1]), (curlew[String("shape")][String("length")]-polarbear[2])], true);
    let moose = math.pow(math.sub(curlew, lion), model.weights[16]);
    toad[(mandrill-2)] = curlew[String("shape")][(curlew[String("shape")][String("length")]-(mandrill-1))];
    return math.add(math.mul(math.reshape(model.weights[15], [toad[3], toad[2], toad[1], toad[0]]), math.div(math.sub(curlew, lion), tf.sqrt(math.add(math.mean(moose, [(moose[String("shape")][String("length")]-polarbear[0]), (moose[String("shape")][String("length")]-polarbear[1]), (moose[String("shape")][String("length")]-polarbear[2])], true), penguin)))), math.reshape(model.weights[17], [toad[3], toad[2], toad[1], toad[0]]));
  };
  function raven(starling) {
    return math.add(math.transpose(math.conv2d(math.transpose(starling, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[18], [2, 3, 1, 0], starling), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[19]);
  };
  let gull = math.tensor(1.0e-5);
  function zebra(crane) {
    let crocodile = crane[String("shape")][String("length")];
    let mosquito = [].fill.apply(Array(crocodile), [1]);
    let ape = [].concat.call(flux.range(1, (crocodile-2)), crocodile);
    let lapwing = math.mean(crane, [(crane[String("shape")][String("length")]-ape[0]), (crane[String("shape")][String("length")]-ape[1]), (crane[String("shape")][String("length")]-ape[2])], true);
    let goosander = math.pow(math.sub(crane, lapwing), model.weights[21]);
    mosquito[(crocodile-2)] = crane[String("shape")][(crane[String("shape")][String("length")]-(crocodile-1))];
    return math.add(math.mul(math.reshape(model.weights[20], [mosquito[3], mosquito[2], mosquito[1], mosquito[0]]), math.div(math.sub(crane, lapwing), tf.sqrt(math.add(math.mean(goosander, [(goosander[String("shape")][String("length")]-ape[0]), (goosander[String("shape")][String("length")]-ape[1]), (goosander[String("shape")][String("length")]-ape[2])], true), gull)))), math.reshape(model.weights[22], [mosquito[3], mosquito[2], mosquito[1], mosquito[0]]));
  };
  function goldfinch(dogfish) {
    return math.add(math.transpose(math.conv2d(math.transpose(dogfish, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[23], [2, 3, 1, 0], dogfish), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[24]);
  };
  function giraffe(komodo) {
    return math.add(komodo, lobster(raven(math.relu(zebra(goldfinch(komodo))))));
  };
  let chamois = math.tensor(1.0e-5);
  function tiger(sardine) {
    let hare = sardine[String("shape")][String("length")];
    let caribou = [].fill.apply(Array(hare), [1]);
    let ram = [].concat.call(flux.range(1, (hare-2)), hare);
    let sheep = math.mean(sardine, [(sardine[String("shape")][String("length")]-ram[0]), (sardine[String("shape")][String("length")]-ram[1]), (sardine[String("shape")][String("length")]-ram[2])], true);
    let snail = math.pow(math.sub(sardine, sheep), model.weights[26]);
    caribou[(hare-2)] = sardine[String("shape")][(sardine[String("shape")][String("length")]-(hare-1))];
    return math.add(math.mul(math.reshape(model.weights[25], [caribou[3], caribou[2], caribou[1], caribou[0]]), math.div(math.sub(sardine, sheep), tf.sqrt(math.add(math.mean(snail, [(snail[String("shape")][String("length")]-ram[0]), (snail[String("shape")][String("length")]-ram[1]), (snail[String("shape")][String("length")]-ram[2])], true), chamois)))), math.reshape(model.weights[27], [caribou[3], caribou[2], caribou[1], caribou[0]]));
  };
  function sandpiper(lyrebird) {
    return math.add(math.transpose(math.conv2d(math.transpose(lyrebird, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[28], [2, 3, 1, 0], lyrebird), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[29]);
  };
  let wildebeest = math.tensor(1.0e-5);
  function emu(pheasant) {
    let guanaco = pheasant[String("shape")][String("length")];
    let anteater = [].fill.apply(Array(guanaco), [1]);
    let salmon = [].concat.call(flux.range(1, (guanaco-2)), guanaco);
    let mouse = math.mean(pheasant, [(pheasant[String("shape")][String("length")]-salmon[0]), (pheasant[String("shape")][String("length")]-salmon[1]), (pheasant[String("shape")][String("length")]-salmon[2])], true);
    let manatee = math.pow(math.sub(pheasant, mouse), model.weights[31]);
    anteater[(guanaco-2)] = pheasant[String("shape")][(pheasant[String("shape")][String("length")]-(guanaco-1))];
    return math.add(math.mul(math.reshape(model.weights[30], [anteater[3], anteater[2], anteater[1], anteater[0]]), math.div(math.sub(pheasant, mouse), tf.sqrt(math.add(math.mean(manatee, [(manatee[String("shape")][String("length")]-salmon[0]), (manatee[String("shape")][String("length")]-salmon[1]), (manatee[String("shape")][String("length")]-salmon[2])], true), wildebeest)))), math.reshape(model.weights[32], [anteater[3], anteater[2], anteater[1], anteater[0]]));
  };
  function jay(quail) {
    return math.add(math.transpose(math.conv2d(math.transpose(quail, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[33], [2, 3, 1, 0], quail), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[34]);
  };
  function dragonfly(sealion) {
    return math.add(sealion, tiger(sandpiper(math.relu(emu(jay(sealion))))));
  };
  let raccoon = math.tensor(1.0e-5);
  function okapi(swan) {
    let mink = swan[String("shape")][String("length")];
    let duck = [].fill.apply(Array(mink), [1]);
    let heron = [].concat.call(flux.range(1, (mink-2)), mink);
    let chough = math.mean(swan, [(swan[String("shape")][String("length")]-heron[0]), (swan[String("shape")][String("length")]-heron[1]), (swan[String("shape")][String("length")]-heron[2])], true);
    let jaguar = math.pow(math.sub(swan, chough), model.weights[36]);
    duck[(mink-2)] = swan[String("shape")][(swan[String("shape")][String("length")]-(mink-1))];
    return math.add(math.mul(math.reshape(model.weights[35], [duck[3], duck[2], duck[1], duck[0]]), math.div(math.sub(swan, chough), tf.sqrt(math.add(math.mean(jaguar, [(jaguar[String("shape")][String("length")]-heron[0]), (jaguar[String("shape")][String("length")]-heron[1]), (jaguar[String("shape")][String("length")]-heron[2])], true), raccoon)))), math.reshape(model.weights[37], [duck[3], duck[2], duck[1], duck[0]]));
  };
  function monkey(chimpanzee) {
    return math.add(math.transpose(math.conv2d(math.transpose(chimpanzee, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[38], [2, 3, 1, 0], chimpanzee), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[39]);
  };
  let octopus = math.tensor(1.0e-5);
  function wasp(oyster) {
    let locust = oyster[String("shape")][String("length")];
    let ibis = [].fill.apply(Array(locust), [1]);
    let wallaby = [].concat.call(flux.range(1, (locust-2)), locust);
    let jackal = math.mean(oyster, [(oyster[String("shape")][String("length")]-wallaby[0]), (oyster[String("shape")][String("length")]-wallaby[1]), (oyster[String("shape")][String("length")]-wallaby[2])], true);
    let gnat = math.pow(math.sub(oyster, jackal), model.weights[41]);
    ibis[(locust-2)] = oyster[String("shape")][(oyster[String("shape")][String("length")]-(locust-1))];
    return math.add(math.mul(math.reshape(model.weights[40], [ibis[3], ibis[2], ibis[1], ibis[0]]), math.div(math.sub(oyster, jackal), tf.sqrt(math.add(math.mean(gnat, [(gnat[String("shape")][String("length")]-wallaby[0]), (gnat[String("shape")][String("length")]-wallaby[1]), (gnat[String("shape")][String("length")]-wallaby[2])], true), octopus)))), math.reshape(model.weights[42], [ibis[3], ibis[2], ibis[1], ibis[0]]));
  };
  function kouprey(hummingbird) {
    return math.add(math.transpose(math.conv2d(math.transpose(hummingbird, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[43], [2, 3, 1, 0], hummingbird), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[44]);
  };
  function termite(otter) {
    return math.add(otter, okapi(monkey(math.relu(wasp(kouprey(otter))))));
  };
  let fish = math.tensor(1.0e-5);
  function cat(goshawk) {
    let seal = goshawk[String("shape")][String("length")];
    let louse = [].fill.apply(Array(seal), [1]);
    let ibex = [].concat.call(flux.range(1, (seal-2)), seal);
    let cockroach = math.mean(goshawk, [(goshawk[String("shape")][String("length")]-ibex[0]), (goshawk[String("shape")][String("length")]-ibex[1]), (goshawk[String("shape")][String("length")]-ibex[2])], true);
    let eel = math.pow(math.sub(goshawk, cockroach), model.weights[46]);
    louse[(seal-2)] = goshawk[String("shape")][(goshawk[String("shape")][String("length")]-(seal-1))];
    return math.add(math.mul(math.reshape(model.weights[45], [louse[3], louse[2], louse[1], louse[0]]), math.div(math.sub(goshawk, cockroach), tf.sqrt(math.add(math.mean(eel, [(eel[String("shape")][String("length")]-ibex[0]), (eel[String("shape")][String("length")]-ibex[1]), (eel[String("shape")][String("length")]-ibex[2])], true), fish)))), math.reshape(model.weights[47], [louse[3], louse[2], louse[1], louse[0]]));
  };
  function prairiedog(dolphin) {
    return math.add(math.transpose(math.conv2d(math.transpose(dolphin, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[48], [2, 3, 1, 0], dolphin), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[49]);
  };
  let kangaroo = math.tensor(1.0e-5);
  function elk(falcon) {
    let alpaca = falcon[String("shape")][String("length")];
    let caterpillar = [].fill.apply(Array(alpaca), [1]);
    let panda = [].concat.call(flux.range(1, (alpaca-2)), alpaca);
    let beaver = math.mean(falcon, [(falcon[String("shape")][String("length")]-panda[0]), (falcon[String("shape")][String("length")]-panda[1]), (falcon[String("shape")][String("length")]-panda[2])], true);
    let boar = math.pow(math.sub(falcon, beaver), model.weights[51]);
    caterpillar[(alpaca-2)] = falcon[String("shape")][(falcon[String("shape")][String("length")]-(alpaca-1))];
    return math.add(math.mul(math.reshape(model.weights[50], [caterpillar[3], caterpillar[2], caterpillar[1], caterpillar[0]]), math.div(math.sub(falcon, beaver), tf.sqrt(math.add(math.mean(boar, [(boar[String("shape")][String("length")]-panda[0]), (boar[String("shape")][String("length")]-panda[1]), (boar[String("shape")][String("length")]-panda[2])], true), kangaroo)))), math.reshape(model.weights[52], [caterpillar[3], caterpillar[2], caterpillar[1], caterpillar[0]]));
  };
  function peafowl(cod) {
    return math.add(math.transpose(math.conv2d(math.transpose(cod, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[53], [2, 3, 1, 0], cod), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[54]);
  };
  function ferret(wombat) {
    return math.add(wombat, cat(prairiedog(math.relu(elk(peafowl(wombat))))));
  };
  let dunlin = math.tensor(1.0e-5);
  function donkey(kudu) {
    let aardvark = kudu[String("shape")][String("length")];
    let elephant = [].fill.apply(Array(aardvark), [1]);
    let bat = [].concat.call(flux.range(1, (aardvark-2)), aardvark);
    let magpie = math.mean(kudu, [(kudu[String("shape")][String("length")]-bat[0]), (kudu[String("shape")][String("length")]-bat[1]), (kudu[String("shape")][String("length")]-bat[2])], true);
    let pelican = math.pow(math.sub(kudu, magpie), model.weights[56]);
    elephant[(aardvark-2)] = kudu[String("shape")][(kudu[String("shape")][String("length")]-(aardvark-1))];
    return math.add(math.mul(math.reshape(model.weights[55], [elephant[3], elephant[2], elephant[1], elephant[0]]), math.div(math.sub(kudu, magpie), tf.sqrt(math.add(math.mean(pelican, [(pelican[String("shape")][String("length")]-bat[0]), (pelican[String("shape")][String("length")]-bat[1]), (pelican[String("shape")][String("length")]-bat[2])], true), dunlin)))), math.reshape(model.weights[57], [elephant[3], elephant[2], elephant[1], elephant[0]]));
  };
  function bee(seahorse) {
    return math.add(math.transpose(math.conv2d(math.transpose(seahorse, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[58], [2, 3, 1, 0], seahorse), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[59]);
  };
  let loris = math.tensor(1.0e-5);
  function tarsier(fox) {
    let salamander = fox[String("shape")][String("length")];
    let hedgehog = [].fill.apply(Array(salamander), [1]);
    let mammoth = [].concat.call(flux.range(1, (salamander-2)), salamander);
    let crab = math.mean(fox, [(fox[String("shape")][String("length")]-mammoth[0]), (fox[String("shape")][String("length")]-mammoth[1]), (fox[String("shape")][String("length")]-mammoth[2])], true);
    let ant = math.pow(math.sub(fox, crab), model.weights[61]);
    hedgehog[(salamander-2)] = fox[String("shape")][(fox[String("shape")][String("length")]-(salamander-1))];
    return math.add(math.mul(math.reshape(model.weights[60], [hedgehog[3], hedgehog[2], hedgehog[1], hedgehog[0]]), math.div(math.sub(fox, crab), tf.sqrt(math.add(math.mean(ant, [(ant[String("shape")][String("length")]-mammoth[0]), (ant[String("shape")][String("length")]-mammoth[1]), (ant[String("shape")][String("length")]-mammoth[2])], true), loris)))), math.reshape(model.weights[62], [hedgehog[3], hedgehog[2], hedgehog[1], hedgehog[0]]));
  };
  function eagle(horse) {
    return math.add(math.transpose(math.conv2d(math.transpose(horse, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[63], [2, 3, 1, 0], horse), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[64]);
  };
  function goose(partridge) {
    return math.add(partridge, donkey(bee(math.relu(tarsier(eagle(partridge))))));
  };
  let gerbil = math.tensor(1.0e-5);
  function chinchilla(rook) {
    let lark = rook[String("shape")][String("length")];
    let barracuda = [].fill.apply(Array(lark), [1]);
    let herring = [].concat.call(flux.range(1, (lark-2)), lark);
    let antelope = math.mean(rook, [(rook[String("shape")][String("length")]-herring[0]), (rook[String("shape")][String("length")]-herring[1]), (rook[String("shape")][String("length")]-herring[2])], true);
    let mongoose = math.pow(math.sub(rook, antelope), model.weights[66]);
    barracuda[(lark-2)] = rook[String("shape")][(rook[String("shape")][String("length")]-(lark-1))];
    return math.relu(math.add(math.mul(math.reshape(model.weights[65], [barracuda[3], barracuda[2], barracuda[1], barracuda[0]]), math.div(math.sub(rook, antelope), tf.sqrt(math.add(math.mean(mongoose, [(mongoose[String("shape")][String("length")]-herring[0]), (mongoose[String("shape")][String("length")]-herring[1]), (mongoose[String("shape")][String("length")]-herring[2])], true), gerbil)))), math.reshape(model.weights[67], [barracuda[3], barracuda[2], barracuda[1], barracuda[0]])));
  };
  function narwhal(chicken) {
    return math.add(math.transpose(math.conv2d(math.transpose(chicken, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[68], [2, 3, 1, 0], chicken), [0, 1]), [2, 2], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[69]);
  };
  let hippopotamus = math.tensor(1.0e-5);
  function coyote(finch) {
    let reddeer = finch[String("shape")][String("length")];
    let cobra = [].fill.apply(Array(reddeer), [1]);
    let pigeon = [].concat.call(flux.range(1, (reddeer-2)), reddeer);
    let reindeer = math.mean(finch, [(finch[String("shape")][String("length")]-pigeon[0]), (finch[String("shape")][String("length")]-pigeon[1]), (finch[String("shape")][String("length")]-pigeon[2])], true);
    let cormorant = math.pow(math.sub(finch, reindeer), model.weights[71]);
    cobra[(reddeer-2)] = finch[String("shape")][(finch[String("shape")][String("length")]-(reddeer-1))];
    return math.relu(math.add(math.mul(math.reshape(model.weights[70], [cobra[3], cobra[2], cobra[1], cobra[0]]), math.div(math.sub(finch, reindeer), tf.sqrt(math.add(math.mean(cormorant, [(cormorant[String("shape")][String("length")]-pigeon[0]), (cormorant[String("shape")][String("length")]-pigeon[1]), (cormorant[String("shape")][String("length")]-pigeon[2])], true), hippopotamus)))), math.reshape(model.weights[72], [cobra[3], cobra[2], cobra[1], cobra[0]])));
  };
  function gaur(weasel) {
    return math.add(math.transpose(math.conv2d(math.transpose(weasel, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[73], [2, 3, 1, 0], weasel), [0, 1]), [2, 2], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[74]);
  };
  let opossum = math.tensor(1.0e-5);
  function fly(sloth) {
    let whale = sloth[String("shape")][String("length")];
    let leopard = [].fill.apply(Array(whale), [1]);
    let camel = [].concat.call(flux.range(1, (whale-2)), whale);
    let cheetah = math.mean(sloth, [(sloth[String("shape")][String("length")]-camel[0]), (sloth[String("shape")][String("length")]-camel[1]), (sloth[String("shape")][String("length")]-camel[2])], true);
    let pony = math.pow(math.sub(sloth, cheetah), model.weights[76]);
    leopard[(whale-2)] = sloth[String("shape")][(sloth[String("shape")][String("length")]-(whale-1))];
    return math.relu(math.add(math.mul(math.reshape(model.weights[75], [leopard[3], leopard[2], leopard[1], leopard[0]]), math.div(math.sub(sloth, cheetah), tf.sqrt(math.add(math.mean(pony, [(pony[String("shape")][String("length")]-camel[0]), (pony[String("shape")][String("length")]-camel[1]), (pony[String("shape")][String("length")]-camel[2])], true), opossum)))), math.reshape(model.weights[77], [leopard[3], leopard[2], leopard[1], leopard[0]])));
  };
  function frog(goat) {
    return math.add(math.transpose(math.conv2d(math.transpose(goat, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[78], [2, 3, 1, 0], goat), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[79]);
  };
  function model(grouse) {
    return rhinoceros(turkey(tapir(yak(waterbuffalo(giraffe(dragonfly(termite(ferret(goose(chinchilla(narwhal(coyote(gaur(fly(frog(grouse))))))))))))))));
  };
  model.weights = [];
  return model;
})();