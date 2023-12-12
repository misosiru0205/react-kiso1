//useEffectとuseStateの呼び出し
import React from "react";
import { Header } from "./Header";
import { useEffect,useState } from "react"
import { Link} from "react-router-dom";
import "./App.css"


//スレッド取得用　コンポーネント
export const ThreadList = () =>{
        //useStateの定義 スレッドタイトルの取得用
    const [threadTitle,setThreadtitle] = useState([]);

        //ページを表示した際にスレッドを取得できるようにuseEffect内でgetThreadを使いthread内に
    useEffect(()=> {//useEffectはPromiseを受け取るとエラーを出す？？？ので無名関数を中に入れる
         (async() => {
            await getthreadtitle();
        })();
    },[])

        //thread取得用関数　fetchを使うので asyncとawaitを使う
    async function getthreadtitle(){
            //APIにてスレッドを取得 fetch("url",{method:"get"});
        try{
            const response = await fetch("https://railway.bulletinboard.techtrain.dev/threads",{method:'get'});
            const json = await response.json(); //json()でJSONのオブジェクトとして返す　この場合スレッドのタイトル一覧
            
            if(response.status === 200){
                setThreadtitle(json); //setStateでtitle内に配置
                console.log(json)
            }
            else if(response.status === 400){
                throw new Error('バリデーションエラー')
            }
            else if(response.status === 500){
                throw new Error('サーバーエラー')
            }
        }catch(error){
            console.log(error)
            alert(error)
        }
    }


                /*受け取ったjsonは配列の中にオブジェクトがあったので
                .map(a =>{})で配列からオブジェクトを取り出し
                その中でObject.values(a.title)を使い
                スレッドのタイトルを取り出す*/
    return(
        <>
        <Header />
        <div className="list">
        <h1>スレッド一覧</h1>
            {threadTitle.map((array,index) =>
            <li key={index} className="thread">
                <Link to={'/thread/' + array.id} state={{title:array.title}}>
                {Object.values(array.title)}</Link>
                </li>
        )}
        </div>
        </>
    )
}
