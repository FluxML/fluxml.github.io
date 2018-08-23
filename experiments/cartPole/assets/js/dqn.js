let model = (function () {
  let math = tf;
  function mandrill(guineafowl) {
    return math.add(math.matMul(guineafowl, model.weights[0]), model.weights[1]);
  };
  function buffalo(elk) {
    return math.tanh(math.add(math.matMul(elk, model.weights[2]), model.weights[3]));
  };
  function barracuda(owl) {
    return math.tanh(math.add(math.matMul(owl, model.weights[4]), model.weights[5]));
  };
  function model(raven) {
    return mandrill(buffalo(barracuda(raven)));
  };
  model.weights = [];
  return model;
})();