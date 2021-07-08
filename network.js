
class Network {

    constructor(layers) {

        this.alpha = 0.5;

        this.layers = [new InputLayer(layers[0], layers[1])];

        for (let i = 1; i < layers.length - 1; i++) {
            this.layers.push(new InnerLayer(layers[i], layers[i + 1], i));
        }
        this.layers.push(new OutputLayer(layers[layers.length - 1], layers.length - 1))

        this.target_buffer = null;
        this.input_buffer = null;

        this.loss = [];
    }

    //TODO
    desc() {
        for (const l of this.layers) {
            console.log(l.desc);
        }
    }

    get output_layer() {
        return this.layers[this.layers.length - 1]
    }


    passTrainingImages() {

        for (let i = 0; i < 1; i++) {
            this.#inputTrainingImage(i);


            let data_holder = this.input_buffer;
            // console.log(`data holder is ${data_holder}`);
            for (let j = 0; j < this.layers.length - 1; j++) {
                console.log(`Pass ${j}`);
                data_holder = this.layers[j].passTrainingData(data_holder);
            }
            let output = this.output_layer.processOutput(data_holder, this.target_buffer);
            console.log(`Output:\n\tGuess: ${output[0][0]}\n\tConfidence: ${output[0][1]}\n\tLoss: ${output[1]}}`);
        }

    }

    #inputTrainingImage(image_index) {

        // get image and target
        let image_map = data_set[image_index];
        let target_num = parseInt(Object.keys(image_map));

        // construct zero array with a 1 in the target position
        let prim_array = []
        for (let i = 0; i < 10; i++) {
            if (i != target_num) {
                prim_array.push(0);
            }
            else {
                prim_array.push(1);
            }
        }
        //convert to math.js matrix object for processing
        let target_vec = math.matrix(prim_array);

        // hold the input data and real target in the network class
        // console.log(`target buffer set to ${target_vec}`)
        this.target_buffer = target_vec;
        this.input_buffer = math.matrix(Array.from(image_map[target_num]));
    }
}

class Layer {

    constructor(dim) {
        this.dim = dim;
    }

    get desc() {
        return `Generic Layer`;
    }
}

class InnerLayer extends Layer {

    constructor(dim, dim_to, level) {
        super(dim);
        this.level = level;
        this.bias = math.zeros(dim_to);
        this.weight = math.multiply(0.5, math.ones(dim, dim_to));
    }

    get desc() {
        return `Layer ${this.level} (${this.dim} nodes)`;
    }

    passTrainingData(inputVec) {
        let sizeA = math.size(this.weight);
        let sizeB = math.size(inputVec);
        console.log(`Layer ${this.level}: multiplying ${sizeA} with ${sizeB}`);

        let z = math.add(math.multiply(inputVec, this.weight), this.bias);
        let out = this.#sigmoid(z);
        console.log(`\tResult: vector of size ${math.size(out)}`)
        return out;
    }

    #sigmoid(vec) {
        let ret = []
        let to_invert = math.add(1, math.exp(math.multiply(-1, vec)));

        math.forEach(to_invert, function (value) {
            ret.push(1 / value);
        })

        return ret;
    }

}

class InputLayer extends InnerLayer {

    constructor(dim, dim_to) {
        super(dim, dim_to, 0);
    }

    get desc() {
        return `Input Layer (${this.dim} nodes)`;
    }
}

class OutputLayer extends Layer {

    constructor(dim, level) {
        super(dim, level);
    }

    get desc() {
        return `Output Layer (${this.dim} nodes)`;
    }

    processOutput(input, result) {
        console.log(`Processing ${math.size(input)} vs ${math.size(result)}`);
        // console.log(`Output Layer recieved: ${input} of size ${input.length}`);
        let soft_vec = this.#softmax(input);
        // console.log(`Softmax returned: ${soft_vec}`);
        let loss = this.#logLoss(soft_vec, result);
        // console.log(`LogLoss returned: ${loss}`);
        let guess = this.#getPrediction(soft_vec);
        // console.log(`Guess returned: ${guess}`);
        let ret = [guess, loss];
        return ret;
    }

    #softmax(input) {
        // console.log(`Attempting a Softmax on ${math.size(input)}`);

        let sum = 0;
        let to_ten_vec = [];

        math.forEach(input, function (value) {
            let to_ten = math.pow(Math.E, value)
            to_ten_vec.push(to_ten);
            sum += to_ten;
        })

        return math.divide(to_ten_vec, sum);
    }

    #logLoss(soft_vec, y) {
        console.log(`Attempting Log Loss on ${math.size(soft_vec)} and ${math.size(y)}`);
        let J = math.ones(math.size(soft_vec));
        let A = math.dotMultiply(y, math.multiply(-1, math.log(soft_vec)));
        // console.log(`A is ${A}`);
        let B_a = math.subtract(J, soft_vec);
        // console.log(`B_a is ${B_a}`);
        // let B_b = math.multiply(-1, math.log(math.add(1, math.multiply(-1, soft_vec))));
        let B_b = math.multiply(-1, math.log(math.add(J, math.multiply(-1, soft_vec))));
        // console.log(`B_b is ${B_b}`);
        let ret = math.add(A, math.multiply(B_a, B_b));
        return ret;
    }

    #getPrediction(soft_vec) {
        let max = -1;
        let max_index = -1;

        let index = 0;
        math.forEach(soft_vec, function (value) {
            if (value > max) {
                max = value
                max_index = index;
                index++;
            }
        })
        return [max_index, max];
    }
}