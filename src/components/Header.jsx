import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import Avatar from "boring-avatars";
import AuthContext from '../context/AuthContext';

function Header() {
    const [search, setSearch] = useState();
    const {user, logoutUser} = useContext(AuthContext)
    return (
        <div className="h-16 sticky top-0 bg-base-100 z-30 w-full">
        <div className="navbar p-0 bg-base-100 text-base-content w-full">
            <div className="flex-1">
                <Link className="btn btn-ghost normal-case text-xl p-0" to='/'>TailHost</Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control lg:block hidden">
                    <input type="text" placeholder="Поиск" value={search}  className="input input-sm input-bordered" />
                </div>
                <ul className="menu menu-horizontal px-1 hidden sm:flex">
                    <li><Link to='/'>Популярное</Link></li>
                    <li><Link to='/genres'>Жанры</Link></li>
                </ul>
                <div className="dropdown dropdown-end ">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full ">
                            <Avatar
                                className="w-full h-full"
                                size={'100%'}
                                name={Math.floor(Math.random() * 100 + 1)}
                                variant="bauhaus"
                                colors={[
                                    "#264653",
                                    "#2a9d8f",
                                    "#e9c46a",
                                    "#f4a261",
                                    "#e76f51",
                                ]}
                            />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content rounded-box w-52 bg-base-100">
                        <li className='md:hidden'><Link to='/'>Популярное</Link></li>
                        <li className='md:hidden'><Link to='/genres'>Жанры</Link></li>
                        {user ? (<li>

<Link className="justify-between" to={`/author/${user.id}`}>
    Профиль
    <span className="badge badge-accent">+1</span>
</Link>
</li>) : null}
                        
                        <li><Link to='/settings'>Настройки</Link></li>
                        {user ? (<li><button onClick={logoutUser}>Выйти</button></li>) : (<li><Link to={"/login"}>Войти</Link></li>)}
                        
                    </ul>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Header