
class Network {

    constructor(input, output) {
        this.input_layer = new InputLayer(input);
        this.output_layer = new OutputLayer(output, input, 0);
        this.layers = [];

        this.alpha = 0.5;
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
}

let network = new Network(2048, 10);



// console.log(network.layers[1].weight);
