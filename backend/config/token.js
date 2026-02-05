import jwt from "jsonwebtoken";

const genToken = async (userId) => {
    try {
        // we will generate token by using json web token (jwt)
        // const token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" }); // expires in 10 days (after 10 days user have to login again)
        let token = jwt.sign({ userId } , process.env.JWT_SECRET , {expiresIn:"7d"});
        console.log("Generated Token:", token);
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};

export default genToken;