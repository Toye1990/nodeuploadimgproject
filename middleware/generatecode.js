const productmod = require('../model/productmodel')
const {v4: uuidv4} = require('uuid')

async function generatecharc(){
    
const prefix = "PRD"
const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
//function to generate a random character from  character string

const generaterandom = () =>{
const randomcharc = Math.floor(Math.random() * characterlength)
 return character[randomcharc]
}

//create function generate the 7 random character part
const generatenew = () =>{
    const characterval = ""

    for (let index = 0; index < 7; index++) {
        characterval += generaterandom()   
    }
    return characterval
}
 

//loop to ensure the generate character is unique
let invoicenumber;
let existing = true;

while (existing) {
    invoicenumber = prefix + generatenew()

    // Check if the generated reference already exists in the database
const countdata = await productmod.countDocuments({ sku: invoicenumber })

if(countdata === 0){
    existing = false
}
}

return invoicenumber
  
}


const generatenewname = (name) =>{
    const filenameExtension = name.filename(",").pop()
    const uniquename = `${uuid()}.${newfilename}`
    return uniquename
}

module.exports = {generatecharc, generatenewname}