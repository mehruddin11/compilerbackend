var express = require('express');
const cors=require("cors");

const {generatefile} = require('./generatefile');
const {executefile} = require('./executefile');
const {Excutejs} = require('./executeJs');

const app =express();
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors(corsOptions))

app.get('/', (req, res)=>{
    return res.json({hello:"hello word"});
});
app.post("/run" , async(req, res)=>{
    const {language , code }= req.body;
    if (code ===undefined) {

    return res.status(400).json({success:false,error:"Empty Code Body !"})
    }
    try{
        const  filepath = await generatefile(language, code);
        let output;
        if(language === 'py'){
            output = await executefile(filepath)
        }
        else{
            output = await Excutejs(filepath);
        }
        
        
        return res.json({filepath, output});
    }
    catch(err){
      res.status(500).json(err)
    }
});
// listen
app.listen(process.env.PORT  || 5000, () =>{
    console.log(`App is  litening to port 5000 `);
})