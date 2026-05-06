import multer from "multer";
import path from "path";

const uploadPath = path.join(process.cwd(), "uploads")

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const name = path.basename(file.originalname, ext)
        
        cb(null, `${name}-cakep${ext}`)
    }
})

const upload = multer({ storage })

export default upload