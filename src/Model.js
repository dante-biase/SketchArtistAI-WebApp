

class Model {
    constructor() {
        this._model = null
    }
    async load(modelPath, onLoad=()=>{}){
        this._model = await tf.loadLayersModel(modelPath)
        onLoad()
    }
    async predict(inputImageData) {
        const imageTensor = this._transformInput(inputImageData)
        let prediction = this._model.predict(imageTensor)
        const outputImageData = this._transformOutput(prediction)
        return outputImageData
    }
    _transformInput(imageData) {
        let imageTensor = tf.browser.fromPixels(imageData)
        imageTensor = imageTensor.resizeBilinear([256, 256])
        imageTensor = imageTensor.div(255).mul(2).sub(1)
        imageData = imageTensor.expandDims()
        return imageData
    }
    _transformOutput(imageTensor) {
        imageTensor = tf.squeeze(imageTensor)
        imageTensor = imageTensor.add(1).div(2)
        imageTensor = imageTensor.resizeBilinear([512, 512])
        const imageData = tensor2ImageData(imageTensor)
        return imageData
    }
}
