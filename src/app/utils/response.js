module.exports={
    "success": (message, data=[])=>{
        return {
            "success": true,
            message,
            data
        }
    },
    "error": (message='', data=[])=>{
        return {
            "success": false,
            message,
            data
        }
    }
}