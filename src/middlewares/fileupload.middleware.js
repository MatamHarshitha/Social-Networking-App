// 1)import multer

import multer from "multer";
import path from "path"


// 2)Configure storage with filename and location

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads/")

        
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString().replace(/:/g,"_"))
    }
})

export const upload=multer({storage:storage,})