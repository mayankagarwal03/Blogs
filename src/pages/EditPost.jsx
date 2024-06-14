import React,{useEffect,useState} from 'react'
import appwriteService from "../appwrite/Config"
import PostForm from "../components/post-form/PostForm"
import Container from '../components/container/Container'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post,setPost]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate("/")
        }
    },[slug,navigate])
  return post ?(
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null
}

export default EditPost