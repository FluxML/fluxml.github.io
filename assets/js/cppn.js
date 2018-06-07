let model = (function () {
  let math = tf;
  function giant(emu) {
    return math.sigmoid(flux.add(math.matMul(model.weights[0], emu), model.weights[1]));
  };
  function barracuda(albatross) {
    return math.tanh(flux.add(math.matMul(model.weights[2], albatross), model.weights[3]));
  };
  function yak(chicken) {
    return math.tanh(flux.add(math.matMul(model.weights[4], chicken), model.weights[5]));
  };
  function termite(skunk) {
    return math.tanh(flux.add(math.matMul(model.weights[6], skunk), model.weights[7]));
  };
  function elephant(crocodile) {
    return math.tanh(flux.add(math.matMul(model.weights[8], crocodile), model.weights[9]));
  };
  function newt(gnat) {
    return math.tanh(flux.add(math.matMul(model.weights[10], gnat), model.weights[11]));
  };
  function toad(hedgehog) {
    return math.tanh(flux.add(math.matMul(model.weights[12], hedgehog), model.weights[13]));
  };
  function model(panda) {
    return giant(barracuda(yak(termite(elephant(newt(toad(panda)))))));
  };
  model.weights = [];
  return model;
})();

function setWeights(){
  var z_dim = 2;
  var net_size = 15;
  var net_depth = 5;
  var weights = [];
  weights.push(createWeight([net_size]));
  weights.push(createWeight([net_size, 3 + z_dim]));
  
  for(var i =0; i< net_depth; i++){
    console.log(i)
    weights.push(createWeight([net_size]));
    weights.push(createWeight([net_size, net_size]));
    
  }
  weights.push(createWeight([1]));
  weights.push(createWeight([1, net_size]));
  

  model.weights = weights.reverse();
}

function createWeight(shape){
  return tf.randomNormal(shape);
}

setWeights();
__init__();