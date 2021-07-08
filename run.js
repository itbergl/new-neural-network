network = new Network([784, 392, 196, 10]);

network.desc();

console.log('---------------------------------');

// let mat = math.matrix([[1, 2], [3, 4], [3, 4]]);
// let vec = [1, 1];

// let sizeA = math.size(mat);
// let sizeB = vec.length;
// console.log(`multiplying ${sizeA} with ${sizeB}`);

// console.log(math.multiply(mat, vec));

network.passTrainingImages();

// function logLoss(soft_vec, y) {
//     let J = math.ones(math.size(soft_vec));
//     let A = math.dotMultiply(y, math.multiply(-1, math.log(soft_vec)));
//     // console.log(`A is ${A}`);
//     let B_a = math.subtract(J, soft_vec);
//     // console.log(`B_a is ${B_a}`);
//     // let B_b = math.multiply(-1, math.log(math.add(1, math.multiply(-1, soft_vec))));
//     let B_b = math.multiply(-1, math.log(math.add(J, math.multiply(-1, soft_vec))));
//     // console.log(`B_b is ${B_b}`);
//     let ret = math.add(A, math.multiply(B_a, B_b));
//     return ret;
// }

// console.log(logLoss(math.matrix([0.1, 0.6, 0.3]), math.matrix([1, 0, 0])));


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