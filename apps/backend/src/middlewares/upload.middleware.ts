import multer from "multer";

//Storage file in memory(not disk)
 const storage = multer.memoryStorage();

 export const upload=multer({
    storage,
    limits:{
        fileSize:8*1024*1024  // 8 MB limit
    }
 });