import React,{useEffect,useState} from 'react'
import appwriteService from "../appwrite/Config"
import PostCard from "../components/PostCard"
import Container from "../components/container/Container"
function Home() {
    const [post,setPost]=useState([])
    useEffect(()=>{
        appwriteService.listPost().then((posts)=>{
            if(posts){
                setPost(posts.documents)
            }
        })
    },[])
    if (post.length === 0) {
        return (
            <div className="w-full py-14 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-5 w-full">
                            <h1 className="text-2xl p-5 font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {post.map((posts) => (
                        <div key={posts.$id} className='p-2 w-1/4'>
                            <PostCard {...posts} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home