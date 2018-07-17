let model = (function () {
  let math = tf;
  function sealion(bear) {
    return math.sigmoid(math.add(math.matMul(bear, model.weights[0]), model.weights[1]));
  };
  function manatee(frog) {
    return math.tanh(math.add(math.matMul(frog, model.weights[2]), model.weights[3]));
  };
  function cockroach(wildebeest) {
    return math.tanh(math.add(math.matMul(wildebeest, model.weights[4]), model.weights[5]));
  };
  function donkey(nightingale) {
    return math.tanh(math.add(math.matMul(nightingale, model.weights[6]), model.weights[7]));
  };
  function dogfish(dunlin) {
    return math.tanh(math.add(math.matMul(dunlin, model.weights[8]), model.weights[9]));
  };
  function baboon(llama) {
    return math.tanh(math.add(math.matMul(llama, model.weights[10]), model.weights[11]));
  };
  function shrew(bison) {
    return math.tanh(math.add(math.matMul(bison, model.weights[12]), model.weights[13]));
  };
  function model(otter) {
    return sealion(manatee(cockroach(donkey(dogfish(baboon(shrew(otter)))))));
  };
  model.weights = [];
  return model;
})()

function setWeights(){
  var z_dim = 2;
  var net_size = 15;
  var net_depth = 5;
  var weights = [];
  weights.push(createWeight([net_size]));
  weights.push(createWeight([3 + z_dim, net_size]));

  for(var i =0; i< net_depth; i++){
    weights.push(createWeight([net_size]));
    weights.push(createWeight([net_size, net_size]));

  }
  weights.push(createWeight([1]));
  weights.push(createWeight([net_size, 1]));


  model.weights = weights.reverse();
}

function createWeight(shape){
  return tf.randomNormal(shape, 0, 1);
}

setWeights();
__init__();
