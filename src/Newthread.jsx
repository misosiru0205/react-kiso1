import { useState } from "react"

export const Newthread = () =>{
        //Objectを格納するstateを定義
    const [obje,setObje] = useState({'title':""})

        //inputから入力された値をstate内に保持する
    function change(e){
        setObje({'title':(e.target.value)});
    }

        //送信クリック時の処理
    async function click(){
        //console.log(obje)
        if(obje.title !== ""){ //入力値が空でない時に送信する
            try{
                    //fetchにてPOSTする　fetch("url",{method:"POST",~~~~~~~,~~~~~~})
                const res = await fetch("https://railway.bulletinboard.techtrain.dev/threads",{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(obje)
                });
                console.log(res.json());
            }
            catch(error){
                console.log(error); //エラー時の処理？
            }
            
        }
        else{}
    }

        //新規スレッド作成画面　input type="text"　で入力をし
        //onChange={(e) => change(e)}にて即座にchange関数に入力値を渡す
        //送信を押すことでonClickからclick関数に飛び入力した内容をAPIに送る
    return(
        <>
        <p>新規スレッド作成画面</p>
        <form>
            <p>新規スレッド名<br/><input type="text" name="newthread" onChange={(e) => change(e)}></input>
            <input type="button" value="送信" onClick={click}></input></p>
        </form>
        <a href="http://localhost:3000/">掲示板TOP</a>
        </>
    )
}