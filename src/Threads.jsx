//useEffectとuseStateの呼び出し
import { useEffect,useState } from "react"
import { Threadsget } from "./Threadsget";
//スレッド取得用　コンポーネント
export const Thread = () =>{

        //useStateの定義 スレッドタイトルの取得用
    const [title,setTitle] = useState([]);
    const [select,setSelect] = useState('')
    const [num,setNum] = useState('')
        //thread取得用関数　fetchを使うので asyncとawaitを使う
    async function getthread(){

            //APIにてスレッドを取得 fetch("url",{method:"get"});
        const api = await fetch("https://railway.bulletinboard.techtrain.dev/threads",{method:'get'});
        const json = await api.json(); //json()でファイルの受け取り？
        await setTitle(json); //setStateでtitle内に配置
    }

        //ページを表示した際にスレッドを取得できるようにuseEffect内でgetThreadを使いthread内に
    useEffect(()=> {
        getthread();
    },[])

    function change(e){
        setSelect(e.target.value);
    }

    function hyouzi(){
        const res = document.getElementById("address"); //セレクターID名「address」オブジェクトを取得する
        const resA = res.options[res.selectedIndex].value //セレクトボックスの選択インデックスの項目を選択
        console.log(title[resA].id) //選択したタイトルのIDを取得
        console.log(res.selectedIndex) //indexのみ
        console.log(res.options[res.selectedIndex])//選択したオブジェクトのみ
    }

                /*受け取ったjsonは配列の中にオブジェクトがあったので
                .map(a =>{})で配列からオブジェクトを取り出し
                その中でObject.values(a.title)を使い
                スレッドのタイトルを取り出す*/
    return(
        <>
        <div className="list">
        <h1>スレッド一覧</h1>
            {title.map((test,index) =>
            <a key={index} className="thread">
                {Object.values(test.title)}</a>
        )}
        </div>

        <label className="label">
            <select id="address" value={select} onChange={(e) => change(e)}>
                <option hidden value="aaa">選択してください</option>
                {title.map((test,index)=>
                <option key={index} value={index}>
                    {Object.values(test.title)}
                </option>
                )}
            </select>
            <button onClick={hyouzi}>表示</button>
        </label>
        </>
    )
}
