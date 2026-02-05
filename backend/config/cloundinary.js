import { v2 as cloudinary} from 'cloudinary'
import fs from 'fs' // this will delete the file from public folder after uploading to cloundinary

// when we upload on cloudinary to waha se filePath mil jayega
const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })

    try {
        if(!filePath) {
            return null
        }
        // upload the img or video to that filePath ( type: auto [img/video both])
        const uploadResult = await cloudinary.uploader.upload(filePath, {resource_type: 'auto'}) // auto means it can be an image or video
        fs.unlinkSync(filePath) // this will delete the file from public folder after uploading to cloundinary
        return uploadResult.secure_url
    } catch(error) {
        fs.unlinkSync(filePath)
        console.log(error)
    }
}

export default uploadOnCloudinary


// import { v2 as cloudinary } from 'cloudinary'
// import fs from 'fs' // to delete local files after upload

// const uploadOnCloudinary = async (filePath) => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
//   })

//   try {
//     if (!filePath) return null

//     // get file extension to handle PDFs explicitly
//     const ext = filePath.split('.').pop().toLowerCase()
//     const resource_type = ext === 'pdf' ? 'raw' : 'auto' // PDFs = raw, else auto

//     // upload file
//     const uploadResult = await cloudinary.uploader.upload(filePath, {
//       resource_type,    // image/video/raw
//       type: 'upload',   // ensures public access
//     })

//     // delete local file
//     fs.unlinkSync(filePath)

//     return uploadResult.secure_url

//   } catch (error) {
//     // delete local file in case of error
//     fs.unlinkSync(filePath)
//     console.log("Cloudinary upload error:", error)
//     return null
//   }
// }

// export default uploadOnCloudinary
