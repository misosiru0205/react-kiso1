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
            const json = await response.json();

            if(response.status === 200){
                if((json.posts).length === 0){throw new Error('まだ投稿されていません')}
                setPosts(json.posts)
                //console.log(json)
            }
            else if(response.status === 400){
                throw new Error('バリデーションエラー')}
            else if(response.status === 500){
                throw new Error('サーバーエラー')}
            }
            catch(error){
                alert(error)}
    })();
},[url,postID])


function change(e){
    setText(e.target.value)
}

async function textpost(){
    try{
        if(text === ""){throw new Error('投稿内容を入力してください')}
        const object = {'post':(text)}

        const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${url.id}/posts`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(object)})

        const json = await response.json()
        if(response.status === 400){throw new Error("バリテーションエラー")}
        else if(response.status === 500){throw new Error("サーバーエラー")}

        setPostID(json.id)
        setText("")
        alert("送信成功:" + json.post)   
    }
    catch(error){
        alert(error)
    }
}

    return (
        <>
        <Header/>
        <div className="list">
            <h1>{title}</h1>
            {posts.map((posts,index)=>
            <p key={index} className="post">{Object.values(posts.post)}</p>
            )}
    
        <form >
            <textarea className="textarea" value={text} placeholder="投稿内容を入力" onChange={(e)=> change(e)} required ></textarea>
            <input type="button" value="送信" onClick={() => textpost()}></input>
        </form>
        </div> 

        <a href="http://localhost:3000">掲示板TOP</a>
        </>
    )
}