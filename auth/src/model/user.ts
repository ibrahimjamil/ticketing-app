import mongoose from "mongoose";

// interface for user Attribute to pass into
interface UserAttr {
    email: string;
}
// an interface to describe what user should return 
interface UserDoc extends mongoose.Document {
    email: string;
}
// an interface to describe what properties userModel should have or to embed into model 
interface UserModel extends mongoose.Model<UserDoc>{
    build(attr: UserAttr): UserDoc;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    }
},{
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})

// custom build func to instantiate user according to proper type checking
userSchema.statics.build = (attr: UserAttr) => {
    return new User(attr)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };