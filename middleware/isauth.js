exports.isAuth= (req,res,next)=>{
    try {
        
        if(req.user){
             res.status(200).json({ sucess: true, user:req.user })
       
        }
    
        if(!req.user){
             res.status(404).json({ sucess: false,message:"user not found" })
        }
    
    } catch (error) {
           res.status(500).json({
            sucess: false,
            message: error.message,
          });
    }
    
}