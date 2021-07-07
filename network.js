
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

    passTrainingImage(image_index) {

        this.inputTrainingImage(image_index);

        let data_holder = this.input_buffer;

        for (let i = 0; i < this.layers - 1; i++) {
            data_holder = this.layers[i].passTrainingData(data_holder);
        }

        this.output_layer.processOutput(data_holder);

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
        let target_vec = math.matrix([prim_array]);

        // hold the input data and real target in the network class
        this.target_buffer = target_vec;
        this.input_buffer = image_map[target_num];
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
        this.bias = math.zeros(dim);
        this.weight = math.multiply(0.5, math.ones(dim_to, dim));
    }

    get desc() {
        return `Layer ${this.level} (${this.dim} nodes)`;
    }

    passTrainingData(inputVec) {
        return math.multiply(this.weight, math.transpose(inputVec));
    }

}

class InputLayer extends InnerLayer {

    constructor(dim, dim_from) {
        super(dim, dim_from, 0);
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
        let soft_vec = this.sofmax(input);
        let loss = this.logLoss(soft_vec, result);
        let guess = this.#getPrediction(soft_vec);
        return guess.push(loss);
    }

    #softmax(input) {
        let output = [];
        let sum = 0;
        for (const i of input) { sum += i; }
        for (const i of input) { output.push(i / sum); }
        return output;
    }

    #logLoss(soft_vec, result) {
        let net_loss = 0;
        for (let i = 0; i < soft_vec.length; i++) {
            let y_pred = soft_vec[i];
            let y = result[i];
            net_loss += y * (-1 * math.log(y_pred)) + (1 - y) * (-1 * math.log(1 - y_pred));
        }
        return net_loss;
    }

    #getPrediction(soft_vec) {
        let max = -1;
        let max_index = -1;
        for (let i = 0; i < soft_vec.length; i++) {
            if (soft_vec[i] > max) {
                max = soft_vec[i]
                max_index = i;
            }
        }
        return [max_index, max];
    }
}