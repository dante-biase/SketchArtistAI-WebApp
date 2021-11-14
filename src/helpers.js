

function downloadImage(imageData, filename) {
	const link = document.createElement("a")
	link.download = filename
	link.href = imageData
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

function imageURI2ImageData(imageURI) {
	return new Promise(function(resolve, reject) {
		if (imageURI == null) return reject();
		const canvas = document.createElement('canvas')
		const context = canvas.getContext('2d')
		const image = new Image()
		image.src = imageURI
		image.addEventListener('load', function() {
			canvas.width = image.width
			canvas.height = image.height
			context.drawImage(image, 0, 0, canvas.width, canvas.height)
			resolve(context.getImageData(0, 0, canvas.width, canvas.height))
		}, false)
	})
}

async function tensor2ImageData(tensor) {
	const canvas = document.createElement('canvas');
	canvas.width = tensor.shape.width
	canvas.height = tensor.shape.height
	await tf.browser.toPixels(tensor, canvas)
	const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
	return imageData
}

function hcatImages(image1, image2) {
	const canvas = document.createElement('canvas')
	canvas.width = image1.width + image2.width
	canvas.height = Math.max(image1.height, image2.height)
	const context = canvas.getContext("2d")
	context.putImageData(image1, 0, 0)
	context.putImageData(image2, image1.width, 0)
	const hcatImageData = canvas.toDataURL("image/jpg")
	canvas.remove()
	return hcatImageData
}
