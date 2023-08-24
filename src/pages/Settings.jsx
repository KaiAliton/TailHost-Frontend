import React from 'react'
import Header from '../components/Header'
import ThemeSwitcher from '../components/ThemeSwitcher'
import ResponseBody from '../ui/ResponseBody'
import GridSwitcher from '../components/GridSwitcher'
import Divider from '../ui/Divider'

function Settings() {
    return (
        <ResponseBody>
                <Header />
            <Divider>Отображение</Divider>
            <GridSwitcher/>
            <Divider>Темы</Divider>
            <ThemeSwitcher />
        </ResponseBody>
    )
}

export default Settings