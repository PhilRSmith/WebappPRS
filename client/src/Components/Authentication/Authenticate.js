import React from 'react';

var baseUrl = 'http://localhost:9000'

export function userRole(callback) {
    fetch(`${baseUrl}/users/userRole`)
        .then((response) => {
            console.log(response);
            console.log(response.status);
            if(response.status ===200) {
                callback(true)
            }
            return false
        })
        .catch((error) => {
            console.log(error);
            callback (false)
        })
}

export function logout(setLoginStateFn) {
    fetch(`${baseUrl}/user/logout`)
        .then((response) => {
            setLoginStateFn(false);
        })
        .catch((error) => {
            console.log('error');
            console.log(error)
        })
}