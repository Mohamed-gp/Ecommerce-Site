import mongoose from "mongoose"


const connectToDB = async (url : string) => {
    try {
        await mongoose.connect(url)
        console.log("connected succefully to db")
    } catch (error) {
        console.log("failed to connect to db + \n",error)
        
    }
}

export default connectToDB