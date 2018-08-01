let model = (function () {
  let math = tf;
  function chimpanzee(hamster) {
    return math.add(math.matMul(hamster, model.weights[0]), model.weights[1]);
  };
  function kangaroo(donkey) {
    return math.relu(math.add(math.matMul(donkey, model.weights[2]), model.weights[3]));
  };
  function elephant(porpoise) {
    return chimpanzee(kangaroo(porpoise));
  };
  function hedgehog(okapi) {
    return math.add(math.matMul(okapi, model.weights[4]), model.weights[5]);
  };
  function komodo(grouse) {
    return math.relu(math.add(math.matMul(grouse, model.weights[6]), model.weights[7]));
  };
  function elk(partridge) {
    return hedgehog(komodo(partridge));
  };
  function rhinoceros(jay) {
    return math.add(math.matMul(jay, model.weights[8]), model.weights[9]);
  };
  function porcupine(manatee) {
    return math.relu(math.add(math.matMul(manatee, model.weights[10]), model.weights[11]));
  };
  function bat(rat) {
    return rhinoceros(porcupine(rat));
  };
  function mammoth(peafowl) {
    let mole = bat(peafowl);
    return math.sub(math.add(elephant(peafowl), elk(peafowl)), math.mean(mole, (mole[String("shape")][String("length")]-1), true));
  };
  function goosander(camel, fox) {
    return (camel[String("size")]/fox);
  };
  function sanddollar(weasel, crane) {
    return (weasel*crane);
  };
  function dog(llama) {
    let alligator = llama[String("shape")];
    let armadillo = alligator[alligator[String("length")] - 4];
    return math.reshape(llama, [armadillo, goosander(llama, sanddollar(1, armadillo))]);
  };
  function baboon(raccoon) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(raccoon, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[12], [2, 3, 1, 0], raccoon), [0, 1]), [1, 1], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[13]));
  };
  function ram(lion) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(lion, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[14], [2, 3, 1, 0], lion), [0, 1]), [2, 2], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[15]));
  };
  function narwhal(panda) {
    return math.relu(math.add(math.transpose(math.conv2d(math.transpose(panda, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[16], [2, 3, 1, 0], panda), [0, 1]), [4, 4], 0, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[17]));
  };
  function whale(butterfly) {
    return dog(baboon(ram(narwhal(butterfly))));
  };
  function model(newt) {
    return mammoth(whale(newt));
  };
  model.weights = [];
  return model;
})();
