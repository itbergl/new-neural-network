network = new Network([724, 256, 10]);

network.desc();

console.log('---------------------------------');

console.log(`loss was ${network.loss}`)
network.passTrainingImages();
console.log(`loss is ${network.loss}`)



// console.log(sigmoid([1, 10, 100000000, 0]));
// function logLoss(soft_vec, result) {
//     let net_loss = 0;
//     for (let i = 0; i < soft_vec.length; i++) {
//         let y_pred = soft_vec[i];
//         let y = result[i];
//         net_loss += y * (-1 * math.log(y_pred)) + (1 - y) * (-1 * math.log(1 - y_pred));
//     }

//     return net_loss;
// }

// console.log(logLoss([0.90, 0.05, 0.05], [1, 0, 0]));

// console.log(network.desc)


// console.log(imageData[0]);

// let dodo = [{ "5": [0, 0, 0] }, { "6": [1, 1, 1] }, { "4": [2, 2, 2] }]

// console.log(Object.keys(dodo[0]));

//28 x 28

// network.inputTrainingImage(0)

// console.log(network.input_buffer);
// console.log(network.target_buffer);

// network.temp();

// console.log("100");