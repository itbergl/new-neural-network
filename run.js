network = new Network(784, 10);

network.addHiddenLayer(10);

// console.log(network.desc)


// console.log(imageData[0]);

// let dodo = [{ "5": [0, 0, 0] }, { "6": [1, 1, 1] }, { "4": [2, 2, 2] }]

// console.log(Object.keys(dodo[0]));

//28 x 28

network.inputTrainingImage(0)

console.log(network.input_buffer);
console.log(network.target_buffer);

network.temp();

// console.log("100");