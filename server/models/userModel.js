import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    role:{
        type:String,
        enum:["user","admin","deliveryMan"],
        default:"user"
    },
    address:[
        {

            street:{
                type:String,
                required:true
            },
            city:{
                type:String,
                required:true
            },
            state:{
                type:String,
                required:true
            },
            country:{
                type:String,
                required:true
            },
            postalCode:{
                type:String,
                required:true
            },
            isDefault:{
                type:Boolean,
                default:false
            }
        }
    ],
    wishlist:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
    ],
    cart:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required: true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }

        }
    ]

},{timestamps:true})

userSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}

userSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,12)
    return next()
})

userSchema.pre("save", async function(next){
    if(this.isModified("address")){
        const defaultAddress = this.address.find((addr)=>addr.isDefault)
        if(defaultAddress){
            this.address.forEach((addr)=>{
                if(addr !== defaultAddress) addr.isDefault = false
            })
        }
    }
    return next()
})

const userModel = mongoose.model("User", userSchema)

export default userModel