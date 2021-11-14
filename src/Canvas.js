

class Canvas {
    constructor(id) {
        this.id = id
        this.canvas = document.getElementById(id)
        this.context = this.canvas.getContext('2d')
        this.backgroundColor = "white"
    }
    setBackgroundColor(c) {
        this.backgroundColor = c
    }
    setOpacity(o) {
        this.canvas.style.opacity = o
    }
    getImageData() {
        this.context.globalCompositeOperation = 'destination-over'
        this.context.fillStyle = this.backgroundColor
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.globalCompositeOperation = 'source-over'
        const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillStyle = "black"
        return imageData
    }
    putImageData(imageData) {
        this.context.putImageData(imageData, 0, 0)
    }
    getImageURI() {
        return this.canvas.toDataURL("image/jpg")
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
