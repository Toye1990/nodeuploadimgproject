const accountfunct = async(req, res) =>{
try{
   res.render('my-account')
}catch(err){
    console.log(err)
    res.render('404', {status:500, title:'internal error', heading:'Oops seems your link..is broken'})
}
}

module.exports = {accountfunct}