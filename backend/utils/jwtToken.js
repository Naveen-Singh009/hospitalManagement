export const generateToken = async (user, message, statusCode, res)=>{
    const token = user.generateJsonWebToken();

    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken"

    return res
    .status(statusCode)
    .cookie(cookieName, token, {
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRY * 1000 * 60 * 60 * 24   ),
        httpOnly: true
    })
    .json({
        success: true,
        message,
        user,
        token
    })
} 