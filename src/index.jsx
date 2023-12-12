import React from "react"; 
import * as ReactDOM from 'react-dom/client'

//react-routes-dom の呼び出し　画面変遷に必要
import { BrowserRouter,Routes,Route } from "react-router-dom";

//表示するコンポーネントの呼び出し
import { ThreadList } from "./ThreadList";
import { Threadnew } from "./Threadnew";
import { ThreadID } from "./ThreadID";


const root = document.getElementById('root')
const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<ThreadList/>}></Route>
        <Route path='/thread/new' element={<Threadnew/>}></Route>
        <Route path="/thread/:id" element={<ThreadID/>}></Route>
    </Routes>
    </BrowserRouter>
)

//path='/' でメインに設定　'/'の後に好きな単語を入れてアドレスを作れる