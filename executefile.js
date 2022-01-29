const {exec} =require("child_process");
const path = require("path");
const fs = require("fs");

const outputpath = path.join(__dirname, "outputs");
if(!fs.existsSync(outputpath)){
    fs.mkdirSync(outputpath, { recursive:true });
}

const executefile = (filepath) =>{
    const jobid = path.basename(filepath).split(".")[0];
    const OutPath = path.join(outputpath,`${jobid}.out`);

    return new Promise((resolve , reject) =>{
        exec(
            `py ${filepath}`, 
        (error, stdout , stderr)=>{
            error && reject({error, stderr});
            stderr && reject({stderr});
            resolve(stdout);
            }
        )
    });
}

module.exports= {
    executefile,
}