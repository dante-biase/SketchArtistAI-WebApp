

const model = new Model()
await model.load("./src/model_js/model.json", () => {
    const sketchCanvas = new SketchCanvas("sketch-canvas")
    const photoCanvas = new PhotoCanvas("photo-canvas")

    const clearButton = document.getElementById("clear-btn")
    const saveButton = document.getElementById("save-btn")

    var cancelPredicition = false

    sketchCanvas.onStartDraw = function() {
        cancelPredicition  = false
        saveButton.disable()
        photoCanvas.setOpacity(.5)
    }

    sketchCanvas.onEndDraw = async function() {
        if (!cancelPredicition) {
            const sketchImageData = sketchCanvas.getImageData()
            const predictionImage = await model.predict(sketchImageData)
            photoCanvas.putImageData(predictionImage)
        }
        photoCanvas.setOpacity(1)
        saveButton.enable()
    }

    clearButton.addEventListener('click', () => {
        cancelPredicition = true
        sketchCanvas.clear()
        photoCanvas.clear()
        photoCanvas.setOpacity(1)
        saveButton.enable()
    })

    saveButton.addEventListener('click', () => {
        const sketchImage = sketchCanvas.getImageData()
        const photoImage = photoCanvas.getImageData()
        const combinedImageData = hcatImages(sketchImage, photoImage)
        downloadImage(combinedImageData, "download.jpg")
    })

    clearButton.enable()
    saveButton.enable()

    document.getElementById("loading-spinner").style.visibility = "hidden"
    document.getElementById("content").style.visibility = "visible"
    document.getElementById("cursor").style.visibility = "visible"
})
