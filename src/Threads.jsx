//useEffectとuseStateの呼び出し
import { useEffect,useState } from "react"

//スレッド取得用　コンポーネント
export const Thread = () =>{

        //useStateの定義
    const [thread,setThread] = useState([]);

        
        //thread取得用関数　fetchを使うので asyncとawaitを使う
    async function getthread(){

            //APIにてスレッドを取得 fetch("url",{method:"get"});
        const api = await fetch("https://railway.bulletinboard.techtrain.dev/threads",{method:'get'});
        const json = await api.json(); //json()でファイルの受け取り？
        const arr =[];//オブジェクトは.mapが使えない為、空の配列を用意

            //for文とpushを使い配列arrに入れていく
        for(var i=0;i<json.length;i++){
            arr.push(json[i].title);
        }
            //setThreadでthread内に配列arrを配置
        await setThread(arr);
    }

        //ページを表示した際にスレッドを取得できるようにuseEffect内でgetThreadを使いthread内に
    useEffect(()=> {
        getthread();
    },[])

        //thread内にはオブジェクトから変換した配列が入っているので.map()で取り出す
    return(
        <>
        <div className="list">
        <h1>スレッド一覧</h1>
            {thread.map((test,index) =>
            <a href="" key={index} className="thread">
                {test}
            </a>
        )}
        </div>
        </>
    )
}
