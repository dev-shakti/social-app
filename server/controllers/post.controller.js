export async function addPost(req,res){
    try {
        
    } catch (error) {
        console.error("error while add post",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export async function getPosts(req,res){
    try {
        
    } catch (error) {
        console.error("error while getting posts",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export async function editPost(req,res){
    try {
        
    } catch (error) {
        console.error("error while updating post",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export async function deletePosts(req,res){
    try {
        
    } catch (error) {
        console.error("error while deleting post",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}