import React from 'react';
import {Route, Routes } from 'react-router-dom';
import App from './App'
import Login from './Login';
import MainScreen from './MainScreen';
import Register from './Register';
import NewObjectType from './NewObjectType';
import NewObject from './NewObject';

export default function Naviagtion() {
    return(
    <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/newObjectType' element={<NewObjectType />} />
        <Route path='/newObject' element={<NewObject />} />
        <Route path="/dashboard" element={<MainScreen />} />
        <Route path="*" element={<App />} />
    </Routes>
    );
}