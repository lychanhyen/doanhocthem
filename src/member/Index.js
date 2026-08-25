import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function Index({ onLogin }){
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-sm-4 col-sm-offset-1">
                    <Login onLogin={onLogin} />
                </div>
                <div className="col-sm-1">
                    <h2 className="or">OR</h2>
                </div>
                <div className="col-sm-4">
                    <Register /> 
                </div>
            </div>
        </div>
        </>
    )
}

export default Index;