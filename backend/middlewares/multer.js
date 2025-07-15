import multer from "multer"

const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,"./public")
    },
    filename:(req,file,cb)=>{
       cb(null,file.orginalname)
    }
})

const upload=multer({storage})
export default upload