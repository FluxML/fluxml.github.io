let policy = (function () {
  let math = tf;
  function porcupine(hummingbird) {
    return math.softmax(hummingbird);
  };
  function okapi(cod) {
    return math.add(math.matMul(cod, model.weights[0]), model.weights[1]);
  };
  function monkey(mink, mammoth) {
    return (mink[String("size")]/mammoth);
  };
  function kinkajou(porpoise, snake) {
    return (porpoise*snake);
  };
  function caterpillar(camel) {
    let raven = camel[String("shape")];
    let snail = raven[raven[String("length")] - 4];
    return math.reshape(camel, [snail, monkey(camel, kinkajou(1, snail))]);
  };
  function crab(pig) {
    let cattle = pig[String("shape")][String("length")];
    let sealion = flux.data(tf.ones([cattle], String("int32")));
    let ape = pig[String("shape")];
    sealion[cattle - 2] = ape[ape[String("length")] - (cattle - 1)];
    return math.relu(math.add(math.mul(math.div(math.sub(pig, math.reshape(model.weights[2], [sealion[3], sealion[2], sealion[1], sealion[0]])), math.reshape(model.weights[3], [sealion[3], sealion[2], sealion[1], sealion[0]])), math.reshape(model.weights[4], [sealion[3], sealion[2], sealion[1], sealion[0]])), math.reshape(model.weights[5], [sealion[3], sealion[2], sealion[1], sealion[0]])));
  };
  function eagle(bison) {
    return math.add(math.transpose(math.conv2d(math.transpose(bison, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[6], [2, 3, 1, 0], bison), [0, 1]), [1, 1], 0), [0, 3, 1, 2]), model.weights[7]);
  };
  function model(jellyfish) {
    return porcupine(okapi(caterpillar(crab(eagle(jellyfish)))));
  };
  model.weights = [];
  return model;
})();
