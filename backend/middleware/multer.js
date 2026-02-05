import multer from 'multer'

// put image(which we want to upload) into the public folder (diskStorge)
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public")
    },
    filename:(req, file, cb) => {
        cb(null, file.originalname)
    }

})

// image from public folder(local storage) comes in upload 
const upload = multer({storage})

export default upload