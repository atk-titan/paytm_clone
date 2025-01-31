const zod = require('zod');

const signupValidation=(req,res,next)=>{
    const userSchema = zod.object({
        Username: zod.string().email(),
        FirstName: zod.string().max(50),
        LastName: zod.string().max(50),
        password: zod.string().min(6),
    });

    const user = req.body;
    const valid = userSchema.safeParse(user);

    if(valid.success){
        console.log('input validated');
        next();
    }
    return res.status(401).json({message:"incoorect input"});
}

const signinValidation= (req,res,next)=>{
    const userSchema = zod.object({
        Username: zod.string().email(),
        password: zod.string().min(6),
    });
    
    const user = req.body;
    const valid = userSchema.safeParse(user);

    if(valid.success){
        console.log('input validated');
        next();
    }
    return res.status(401).json({message:"incoorect input"});
}

const updateValidation = (req,res,next) =>{
    const userSchema = zod.object({
        FirstName: zod.string().max(50).optional(),
        LastName: zod.string().max(50).optional(),
        password: zod.string().min(6).optional(),
    });

    const user = req.body;
    const valid = userSchema.safeParse(user);

    if(valid.success){
        console.log('input validated');
        next();
    }
    return res.status(401).json({message:"incoorect input"});    
}

const tranferValidation =(req,res,next) =>{
    const transferSchema = zod.object({
        to: zod.string().max(50).min(3),
        amount: zod.number()
    });

    if(transferSchema.safeParse(req.body).success){
        console.log("type validated");
        next()
    }
    return res.status(401).json({message:"incoorect input"});
}

module.exports={signupValidation,signinValidation,updateValidation,tranferValidation};