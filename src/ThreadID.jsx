import React from "react";
import { Header } from "./Header";
import { useParams ,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";

export const ThreadID = () => {
 const location = useLocation();
 const {title} = location.state;

 const [posts,setPosts] = useState([]);
 const [text,setText] = useState("");
 const [postID,setPostID] = useState("");

 const url = useParams();

useEffect(()=>{
    (async()=>{
        try{
            const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${url.id}/posts`,{method:'get'})
            const object = await response.json();

            if(response.status === 200){
                if((object.posts).length === 0){alert('まだ投稿されていません')}
                setPosts(object.posts)
                //console.log(object.posts)
            }
            else if(response.status === 400){
                throw new Error('バリデーションエラー')}
            else if(response.status === 500){
                throw new Error('サーバーエラー')}
            }
        catch(error){alert(error)}
    })();
},[url,postID])


function change(e){
    setText(e.target.value)
}

async function textpost(){
    try{
        if(text !== ""){
            if(text.trim() === ""){throw new Error("空白文字のみで入力しないでください")}
            const posttext = text.trim()
            
            const post = {'post':posttext}
            const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${url.id}/posts`,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(post)})

            if(response.status === 400){throw new Error("バリテーションエラー")}
            else if(response.status === 500){throw new Error("サーバーエラー")}

            const object = await response.json()
            setPostID(object.id)
            setText("")
            alert("送信成功:" + object.post)
        }
        else{throw new Error("投稿内容を入力して下さい")}   
    }
    catch(error){
        console.log(error)
        alert(error)
        setText("")}
}

    return (
        <>
        <Header/>
        <div className="list">
            <h1>{title}</h1>
            {posts.map((posts,index)=>
            <p key={index} className="post">{Object.values(posts.post)}</p>
            )}
    
            <form>
                <textarea className="textarea" value={text} placeholder="投稿用フォーム : 投稿内容を入力" onChange={(e)=> change(e)}></textarea>
                <input type="button" value="送信" onClick={()=>textpost()}></input>
            </form>
        </div> 

        <a href="http://localhost:3000">掲示板TOP</a>
        </>
    )
}