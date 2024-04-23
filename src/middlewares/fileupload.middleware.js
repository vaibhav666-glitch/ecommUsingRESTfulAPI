import multer from "multer";

// configure storage with filename and location

const storage=multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null, './uploads/')
    }, 
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    }
})
//configure storage inside multer

export const upload=multer({storage: storage})