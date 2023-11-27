import React from "react"; 
import * as ReactDOM from 'react-dom/client'

//react-routes-dom の呼び出し　画面変遷に必要
import { BrowserRouter,Routes,Route } from "react-router-dom";

//表示するコンポーネントの呼び出し
import { App } from "./App";


const root = document.getElementById('root')
const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}></Route>
    </Routes>
    </BrowserRouter>
)

//path='/' でメインに設定　'/'の後に好きな単語を入れてアドレスを作れる