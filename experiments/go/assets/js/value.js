let value = (function () {
  let math = tf;
  function weasel(newt) {
    return math.tanh(math.add(math.matMul(newt, model.weights[6]), model.weights[7]));
  };
  function donkey(lark) {
    return math.relu(math.add(math.matMul(lark, model.weights[8]), model.weights[9]));
  };
  function flamingo(guanaco, lobster) {
    return (guanaco[String("size")]/lobster);
  };
  function guineafowl(lyrebird, wombat) {
    return (lyrebird*wombat);
  };
  function fish(porcupine) {
    let ibex = porcupine[String("shape")];
    let heron = ibex[ibex[String("length")] - 4];
    return math.reshape(porcupine, [heron, flamingo(porcupine, guineafowl(1, heron))]);
  };
  function mandrill(salamander) {
    let sanddollar = salamander[String("shape")][String("length")];
    let coyote = flux.data(tf.ones([sanddollar], String("int32")));
    let gnat = salamander[String("shape")];
    coyote[sanddollar - 2] = gnat[gnat[String("length")] - (sanddollar - 1)];
    return coyote;
  };
  function model(reindeer) {
    let yak = math.add(math.transpose(math.conv2d(math.transpose(reindeer, [0, 2, 3, 1]), model.weights[0], [1, 1], 0), [0, 3, 1, 2]), model.weights[1]);
    let barracuda = mandrill(yak);
    return weasel(donkey(fish(math.relu(math.add(math.mul(math.div(math.sub(yak, math.reshape(model.weights[2], [barracuda[3], barracuda[2], barracuda[1], barracuda[0]])), math.reshape(model.weights[3], [barracuda[3], barracuda[2], barracuda[1], barracuda[0]])), math.reshape(model.weights[4], [barracuda[3], barracuda[2], barracuda[1], barracuda[0]])), math.reshape(model.weights[5], [barracuda[3], barracuda[2], barracuda[1], barracuda[0]]))))));
  };
  model.weights = [];
  return model;
})();

