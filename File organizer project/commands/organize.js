function organizefn(dirPath){
    let destPath;
    console.log("organize command implemented for ",dirPath)
    if(dirPath==undefined){
      destPath=process.cwd();
      return;
    }
    else{
        // check if directory path exists or not
        let doesExist=fs.existsSync(dirPath)
        if(doesExist){
            //     2. create -> organized files -> directory 
             destPath=path.join(dirPath,"organized_files")
            if(fs.existsSync(destPath)==false){
            fs.mkdirSync(destPath)
            }
        }
        else{
       console.log("kindlly enter the correct path")
       return;
        }
    }
    organizeHelper(dirPath,destPath);
//     1. input -> directory path given 
//     3. identify categories of all the files present in that input directory
}



function organizeHelper(src,dest){
    let childNames=fs.readdirSync(src);
    //   console.log(childNames)
    for(let i=0;i<childNames.length;i++){
        let childAddress=path.join(src,childNames[i]);
        let isFile=fs.lstatSync(childAddress).isFile();
        if(isFile){
            let category=getCategory(childNames[i]);
            console.log(childNames[i],"belongs to ",category);
            //     4. copy/cut files to that organized directory inside of any of category folder
            sendFiles(childAddress,dest,category);
    }
}
}

function sendFiles(srcFilePath,dest,category){

    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName= path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFilesync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath)
    console.log(fileName,"copied to ",categoryPath);
}


function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1)
    for(let type in types){
        let cTypeArray=types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext==cTypeArray[i]){
                return type;
            }
        }
    }
    return "others";
}

module.exports={
    organizeKey:organizefn
}