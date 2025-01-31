const zod = require('zod');

const signupValidation=(req,res,next)=>{
    const userSchema = zod.object({
        UserName: zod.string().email(),
        FirstName: zod.string().max(50),
        LastName: zod.string().max(50),
        password: zod.string().min(6),
    });

    const user = req.body;
    const valid = userSchema.safeParse(user);

    if(!valid.success){
        return res.status(401).json({message:"incoorect input"});
    }
    console.log('input validated');
    next();
}

const signinValidation= (req,res,next)=>{
    const userSchema = zod.object({
        UserName: zod.string().email(),
        password: zod.string().min(6),
    });
    
    const user = req.body;
    const valid = userSchema.safeParse(user);

    if(!valid.success){
        return res.status(401).json({message:"incoorect input"});
    }
    console.log('input validated');
    next();
}

const updateValidation = (req,res,next) =>{
    const userSchema = zod.object({
        FirstName: zod.string().max(50).optional(),
        LastName: zod.string().max(50).optional(),
        password: zod.string().min(6).optional(),
    });

    const user = req.body;
    const valid = userSchema.safeParse(user);

    if(!valid.success){
        return res.status(401).json({message:"incoorect input"});    
    }
    console.log('input validated');
    next();
}

const transferValidation =(req,res,next) =>{
    const transferSchema = zod.object({
        to: zod.string().max(50).min(3),
        amount: zod.number()
    });

    if(!transferSchema.safeParse(req.body).success){
        return res.status(401).json({message:"incoorect input"});
    }
    console.log("type validated");
    next()
}

module.exports={signupValidation,signinValidation,updateValidation,transferValidation};