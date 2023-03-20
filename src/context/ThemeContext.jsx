import React, {createContext, useState} from 'react';

const ThemeContext = createContext(!!localStorage.getItem('darkMode'));
export default ThemeContext


