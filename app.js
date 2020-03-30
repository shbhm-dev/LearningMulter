const express= require('express')
const path = require('path')
const ejs = require('ejs')
const multer = require('multer')
const app = express()

const port = 3000

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myupload')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ 
      storage: storage 
    }).single("profilepic")




app.set('view engine',"ejs")

app.use(express.static('./public'));



app.get('/',(req,res)=>{
    res.render('index')
})


//Desc
app.post('/upload',(req,res)=> {
 upload(req,res,(error) => {
   if(error){
       res.render('index',{
           message : error
       })
   }
   else{
       res.render('index',{
           message: 'Sucessfully uploaded',
           filename: `myupload/${req.file.filename}`
       })
   }  
 })

})


app.listen(port,()=>
console.log("server is running")
)