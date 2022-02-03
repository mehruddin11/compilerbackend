var express = require('express');
const {generatefile} = require('./generatefile')
const {executefile} = require('./executefile')
const {Excutejs} = require('./executeJs')
const cors = require('cors');
const app =express();
app.use(cors());
// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
// url parameter 
app.get('/', (req, res)=>{
    return res.json({hello:"hello word"});
});
app.post("/run" , async(req, res)=>{
    const {language ="python" , code }= req.body;
    if (code ===undefined) {

    return res.status(400).json({success:false,error:"Empty Code Body !"})
    }
    try{
        const  filepath = await generatefile(language, code);
        let output;
        if(language ===  'py'){
            
            output = await executefile(filepath);
        }
         else if(language === 'js'){
             console.log(output)
            output =  await Excutejs(filepath)
            
        }
     return res.json({filepath, output});
    }
    catch(err){
      res.status(500).json(err)
    }
})
// listen
app.listen(process.env.PORT  || 5000, () =>{
    console.log(`App is litening to port ${process.env.PORT}`);
})