import React from 'react'
import {Navigate, redirect, Route, Routes} from 'react-router-dom';

function ResponseBody({children, flex=false}) {
    return(
        <div className={`w-4/5 md:w-3/5 mx-auto text-base-content overflow-hidden md:overflow-visible pb-20 px-1 ${flex ? "flex h-screen flex-col overflow-hidden" : ""}`}>
            {children}
            </div>
    )
}

export default ResponseBody