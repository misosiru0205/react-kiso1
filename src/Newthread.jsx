// import { useState } from "react"

export const Newthread = () =>{

        //送信クリック時の処理
    async function click(){
        //オブジェクトの作成
        const obje = {'title':(document.getElementById('newthread')).value}//IDがnewthreadsの入力から値を持ってくる
        if(obje.title !== ""){ //入力値が空でない時に送信する
            try{ //例外処理
                    //fetchにてPOSTする　fetch("url",{method:"POST",~~~~~~~,~~~~~~})
                const res = await fetch("https://railway.bulletinboard.techtrain.dev/threads",{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(obje)
                });
                console.log(res.json());
            }
            catch(error){
                console.log(error); //エラー時の処理
            }
            
        }
        else{}
    }

        //新規スレッド作成画面　input type="text"　で入力をし
    return(
        <>
        <p>新規スレッド作成画面</p>
        <form>
            <label>新規スレッド名<br/>
            <input type="text" id="newthread" required></input>
            <input type="button" value="送信" onClick={click}></input>
            </label>
        </form>
        <a href="http://localhost:3000/">掲示板TOP</a>
        </>
    )
}