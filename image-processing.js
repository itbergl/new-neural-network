
var fs = require('fs');

var dataFileBuffer = fs.readFileSync(__dirname + '/dataset/train-images.idx3-ubyte');
var labelFileBuffer = fs.readFileSync(__dirname + '/dataset/train-labels.idx1-ubyte');
var pixelValues = [];

// It would be nice with a checker instead of a hard coded 60000 limit here
for (var image = 0; image <= 59999; image++) {
    var pixels = [];

    for (var x = 0; x <= 27; x++) {
        for (var y = 0; y <= 27; y++) {
            pixels.push(dataFileBuffer[(image * 28 * 28) + (x + (y * 28)) + 15]);
        }
    }

    var imageData = {};
    imageData[JSON.stringify(labelFileBuffer[image + 8])] = pixels;

    pixelValues.push(imageData);
    // console.log(imageData);
}
// console.log(imageData);
var json = JSON.stringify(pixelValues);

// console.log(Object.keys(imageData).length);

fs.writeFile("data.json", json, function (err) {
    if (err) {
        console.log(err);
    }
});