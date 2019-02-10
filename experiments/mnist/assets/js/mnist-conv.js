let model = (function () {
  let math = tf;
  model.weights = [];
  function starling(sanddollar) {
    return sanddollar;
  };
  function flamingo(fish) {
    return starling(math.add(math.matMul(fish, model.weights[0]), model.weights[1]));
  };
  function bat(giraffe) {
    return giraffe[String("shape")];
  };
  function cassowary(chinchilla, penguin) {
    return (chinchilla[String("size")]/penguin);
  };
  function narwhal(seahorse, quetzal) {
    return (seahorse*quetzal);
  };
  function salmon(donkey) {
    let redpanda = flux.invindex(bat(donkey), 4);
    return math.reshape(donkey, [redpanda, cassowary(donkey, narwhal(1, redpanda))]);
  };
  function monkey(reddeer) {
    return math.transpose(math.maxPool(math.transpose(reddeer, [0, 2, 3, 1]), [2, 2], [2, 2], 0, "floor"), [0, 3, 1, 2]);
  };
  function quail(cheetah) {
    return cheetah;
  };
  function echidna(kangaroo) {
    return quail(math.relu(math.add(math.transpose(math.conv2d(math.transpose(kangaroo, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[2], [2, 3, 1, 0], kangaroo), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[3])));
  };
  function llama(crow) {
    return math.transpose(math.maxPool(math.transpose(crow, [0, 2, 3, 1]), [2, 2], [2, 2], 0, "floor"), [0, 3, 1, 2]);
  };
  function baboon(crocodile) {
    return crocodile;
  };
  function termite(kinkajou) {
    return baboon(math.relu(math.add(math.transpose(math.conv2d(math.transpose(kinkajou, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[4], [2, 3, 1, 0], kinkajou), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[5])));
  };
  function snake(kouprey) {
    return math.transpose(math.maxPool(math.transpose(kouprey, [0, 2, 3, 1]), [2, 2], [2, 2], 0, "floor"), [0, 3, 1, 2]);
  };
  function louse(seal) {
    return seal;
  };
  function reindeer(lyrebird) {
    return louse(math.relu(math.add(math.transpose(math.conv2d(math.transpose(lyrebird, [0, 2, 3, 1]), math.reverse(math.transpose(model.weights[6], [2, 3, 1, 0], lyrebird), [0, 1]), [1, 1], 1, "NHWC", [1, 1], "floor"), [0, 3, 1, 2]), model.weights[7])));
  };
  function model(elk) {
    return math.softmax(flamingo(salmon(monkey(echidna(llama(termite(snake(reindeer(elk)))))))));
  };
  model.setWeights = (function (ws) {
    model.weights = ws;
    return;
  });
  return model;
})();
flux.fetchWeights("mnist-conv.bson").then(model.setWeights);
