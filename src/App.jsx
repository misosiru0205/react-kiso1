import React from "react";
import { Header } from "./Header";
import { ThreadList } from "./ThreadList";
import "./App.css"

//コンポーネント内部　別にfunction使ってもいいし　後でexportしてもいい
export const App = () =>{

    //HTML内部
    //他コンポーネントの呼び出しは<コンポーネント名/> 頭文字は必ず大文字にすること
    return(
        <div>
            <Header />
            <ThreadList />
        </div>
    )
}