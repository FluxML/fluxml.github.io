let model = (function () {
  let math = tf;
  function tiger(penguin) {
    return math.add(math.matMul(penguin, model.weights[4]), model.weights[5]);
  };
  function weasel(dragonfly, mammoth) {
    return (dragonfly[String("size")]/mammoth);
  };
  function curlew(toad, manatee) {
    return (toad*manatee);
  };
  function snail(zebra) {
    let bear = zebra[String("shape")];
    let llama = bear[bear[String("length")] - 4];
    return math.reshape(zebra, [llama, weasel(zebra, curlew(1, llama))]);
  };
  function raven(sheep) {
    return math.transpose(math.maxPool(math.transpose(sheep, [0, 2, 3, 1]), [2, 2], [2, 2], 0), [0, 3, 1, 2]);
  };
  function bat(turtle) {
    return math.transpose(math.maxPool(math.transpose(turtle, [0, 2, 3, 1]), [2, 2], [2, 2], 0), [0, 3, 1, 2]);
  };
  function model(gaur) {
    return math.softmax(tiger(snail(raven(math.relu(math.add(math.transpose(math.conv2d(math.transpose(bat(math.relu(math.add(math.transpose(math.conv2d(math.transpose(gaur, [0, 2, 3, 1]), model.weights[0], [1, 1], 0), [0, 3, 1, 2]), model.weights[1]))), [0, 2, 3, 1]), model.weights[2], [1, 1], 0), [0, 3, 1, 2]), model.weights[3]))))));
  };
  model.weights = [];
  return model;
})();

loadWeights('assets/bson/mnist-conv.bson', document.querySelector('.render_editor'), __init__, model)