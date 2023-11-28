import { useEffect,useState } from "react"

export const Newthread = () =>{

    const [obje,setObje] = useState({})


    function change(e){
        setObje({'title':(e.target.value)});
    }

    async function click(){
        console.log(obje)
        try{
            const res = await fetch("https://railway.bulletinboard.techtrain.dev/threads",{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(obje)});

            console.log(res.json());

        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <>
        <p>新規スレッド作成</p>
        <form>
            <p>新規スレッド名<br/><input type="text" name="newthread" onChange={(e) => change(e)}></input>
            <input type="button" value="送信" onClick={click}></input></p>
        </form>
        <a href="http://localhost:3000/">掲示板TOP</a>
        </>
    )
}