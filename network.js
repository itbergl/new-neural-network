
class Network {

    constructor(input, output) {
        this.input_layer = new InputLayer(input);
        this.output_layer = new OutputLayer(output, input, 0);
        this.layers = [];

        this.alpha = 0.5;
        this.target_buffer = null;
        this.input_buffer = null;
    }

    addHiddenLayer(dim) {
        let lastDim = this.input_layer.dim;

        if (this.layers.length > 0) {
            lastDim = this.layers[this.layers.length - 1].dim;
        }

        this.layers.push(new InnerLayer(dim, lastDim, this.layers.length + 1));
        this.output_layer.level = this.layers.length + 1;
        this.output_layer.adjust(dim);

    }

    get desc() {
        console.log(this.input_layer.desc);
        for (const l of this.layers) {
            console.log(l.desc);
        }
        console.log(this.output_layer.desc);
    }

    inputTrainingImage(image_index) {

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

class InputLayer extends Layer {

    constructor(dim) {
        super(dim);
    }

    get desc() {
        return `Input Layer (${this.dim} nodes)`;
    }
}

class InnerLayer extends Layer {

    constructor(dim, dim_from, level) {
        super(dim);
        this.level = level;
        this.bias = math.zeros(dim);
        this.weight = math.multiply(1 / dim_from, math.ones(dim, dim_from));
    }

    get desc() {
        return `Layer ${this.level} (${this.dim} nodes)`;
    }

    makePass(inputVec) {
        return math.multiply(this.weight, inputVec) + this.bias;
    }

}

class OutputLayer extends InnerLayer {

    constructor(dim, dim_from, level) {
        super(dim, dim_from, level);
    }

    adjust(dim_from) {
        this.dim_from = dim_from;
        this.bias = math.zeros(dim_from);
        this.weight = math.zeros(this.dim, dim_from);
    }

    get desc() {
        return `Output Layer (${this.dim} nodes)`;
    }

    processOutput(input) {
        let out_vec = math.multiply(this.weight, inputVec) + this.bias;


        //get softmax vector

        //calculate loss



    }

    softmax() {

    }

}

let network = new Network(2048, 10);



// console.log(network.layers[1].weight);
