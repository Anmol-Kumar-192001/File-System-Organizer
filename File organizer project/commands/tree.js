function treefn(dirPath){
    
    if(dirPath==undefined){
    
     treeHelper( process.cwd(),"")
      return;
    }
    else{
        // check if directory path exists or not
        let doesExist=fs.existsSync(dirPath)
        if(doesExist){
           
           treeHelper(dirPath,"")

        }
        else{
       console.log("kindlly enter the correct path")
       return;
        }
    }
}

function treeHelper(dirPath,indent){
    // check if is file or folder
   let isFile=fs.lstatSync(dirPath).isFile();
   if(isFile==true){
       let fileName=path.basename(dirPath);
       console.log(indent+"---- "+fileName)
   }
   else{
       let dirName=path.basename(dirPath)
     console.log(indent+"-----"+dirName);
     let childrens=fs.readdirSync(dirPath);
     for(let i=0;i<childrens.length;i++){
        let childPath= path.join(dirPath,childrens[i]);
         treeHelper(childPath,indent+'\t');
     }
   }

}

module.exports={
    treeKey:treefn
}