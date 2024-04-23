import multer from "multer";

// configure storage with filename and location

const storage=multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null, './uploads/')
    }, 
    filename:(req, file, cb)=>{
        cb(null, new Date().toISOString()+file.originalname)
    }
})
//configure storage inside multer
export default upload=multer({storage: storage})