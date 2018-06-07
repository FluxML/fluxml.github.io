let model = (function () {
  let math = tf;
  function kangaroo(bear) {
    return flux.add(math.matMul(model.weights[4], bear), model.weights[5]);
  };
  let quelea = math.layers.flatten();
  function mammoth(toad) {
    return math.transpose(flux.apply(math.transpose(toad, [0, 3, 2, 1]), quelea));
  };
  function seal(parrot) {
    return math.maxPool(parrot, [2, 2], [2, 2], 0);
  };
  function lemur(weasel) {
    return math.maxPool(weasel, [2, 2], [2, 2], 0);
  };
  function model(coati) {
    return math.softmax(flux.coat(kangaroo(mammoth(seal(math.relu(flux.add(math.conv2d(lemur(math.relu(flux.add(math.conv2d(coati, model.weights[0], [1, 1], 0), model.weights[1]))), model.weights[2], [1, 1], 0), model.weights[3])))))));
  };
  model.weights = [];
  return model;
})();
loadWeights('assets/bson/mnist-conv.bson', document.querySelector('.render_editor'), __init__)
