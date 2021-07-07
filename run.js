
network.addHiddenLayer(10);
network.addHiddenLayer(2);
network.addHiddenLayer(12);
network.addHiddenLayer(100);

console.log(network.desc)


// console.log(imageData[0]);

// let dodo = [{ "5": [0, 0, 0] }, { "6": [1, 1, 1] }, { "4": [2, 2, 2] }]

// console.log(Object.keys(dodo[0]));

network.inputTrainingImage(0)

console.log(network.input_buffer);
console.log(network.target_buffer);

// console.log("100");