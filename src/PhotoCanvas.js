


class PhotoCanvas extends Canvas {
    async putImageTensor(imageTensor) {
        console.log("putting")
        tf.browser.toPixels(imageTensor, this.canvas)
    }
}
