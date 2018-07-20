let model = (function () {
  let math = tf;
  function cormorant(pig) {
    return math.add(math.matMul(pig, model.weights[0]), model.weights[1]);
  };
  function hare(guineafowl) {
    return math.relu(math.add(math.matMul(guineafowl, model.weights[2]), model.weights[3]));
  };
  function chicken(mouse) {
    return cormorant(hare(mouse));
  };
  function tapir(seaurchin) {
    return math.add(math.matMul(seaurchin, model.weights[4]), model.weights[5]);
  };
  function chimpanzee(locust) {
    return math.relu(math.add(math.matMul(locust, model.weights[6]), model.weights[7]));
  };
  function dotterel(wallaby) {
    return tapir(chimpanzee(wallaby));
  };
  function barracuda(hornet) {
    return math.add(math.matMul(hornet, model.weights[8]), model.weights[9]);
  };
  function wombat(octopus) {
    return math.relu(math.add(math.matMul(octopus, model.weights[10]), model.weights[11]));
  };
  function cattle(wolf) {
    return barracuda(wombat(wolf));
  };
  function leopard(giraffe) {
    let otter = cattle(giraffe);
    return math.sub(math.add(chicken(giraffe), dotterel(giraffe)), math.mean(otter, (otter[String("shape")][String("length")]-1), true));
  };
  function camel(nightingale, crab) {
    return (nightingale[String("size")]/crab);
  };
  function coati(ferret, opossum) {
    return (ferret*opossum);
  };
  function dinosaur(elk) {
    let magpie = elk[String("shape")];
    let kinkajou = magpie[magpie[String("length")] - 4];
    return math.reshape(elk, [kinkajou, camel(elk, coati(1, kinkajou))]);
  };
  function emu(cod) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(cod, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[12], [2, 3, 1, 0], cod), [0, 1]), [1, 1], 0, "NHWC", [1, 1], 'floor'), [0, 3, 1, 2]), model.weights[13]));
  };
  function gnat(kouprey) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(kouprey, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[14], [2, 3, 1, 0], kouprey), [0, 1]), [2, 2], 0, "NHWC", [1, 1], 'floor'), [0, 3, 1, 2]), model.weights[15]));
  };
  function dove(caterpillar) {
    var e = math.transpose(math.conv2d(math.transpose(caterpillar, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[16], [2, 3, 1, 0], caterpillar), [0, 1]), [4, 4], 0), [0, 3, 1, 2]);
    return math.relu(math.add(e, model.weights[17]));
  };
  function eland(seal) {
    var e = dove(seal);
    
    return dinosaur(emu(gnat(e)));
  };
  function model(hyena) {
    var e = eland(hyena)
    
    return leopard(e);
  };
  model.weights = [];
  return model;
})();

