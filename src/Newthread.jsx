import { useState } from "react"

export const Newthread = () =>{

    const [input,setInput] = useState('')

        //送信クリック時の処理
    async function click(){
        //オブジェクトの作成
        const object = {'title':(input)}//入力したテキストをオブジェクトにする
            try{ //例外処理
                    //fetchにてPOSTする　fetch("url",{method:"POST",~~~~~~~,~~~~~~})
                const response = await fetch("https://railway.bulletinboard.techtrain.dev/threads",{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(object)//JSON.stringifyでobjectをJSONファイルにエンコード
                });
                console.log(response)
                if(response.status === 400){//例外作成 バリデーションエラー
                    throw new Error('スレッド名を入力して下さい')
                }
                else if(response.status === 500){//例外作成 サーバーエラー
                    throw new Error('サーバーエラー')
                }
                alert('送信成功:' + input)
            }
            catch(error){
                console.log(error); //エラー時の処理
                alert('送信失敗:' + error)
            } 
        }

    function change(e){
        setInput(e.target.value)
    }

        //新規スレッド作成画面　input type="text"　で入力
    return(
        <>
        <p>新規スレッド作成画面</p>
        <form>
            <label>新規スレッド名<br/>
            <input type="text" id="newthread" placeholder="新規スレッド名" onChange={(e) => change(e)}></input>
            <input type="button" value="送信" onClick={click}></input>
            </label>
        </form>
        <a href="http://localhost:3000/">掲示板TOP</a>
        </>
    )
}