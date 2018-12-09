const express = require('express');
const logging = require('./logging'); 

function getCookie(req) {
    if (req.cookies) {
        try {
            return req.cookies['blinkist_cookie'];
        } catch(error) {}
    }
}

function setCookie(res, variant) {
    res.cookie('blinkist_cookie', variant);
}

function ab() {
    return (req, res, next) => {
        const cookie = getCookie(req);
        const variantA = 0.8;
        const variantB = 0.2;
        let chosenVariant = 'A';

        if (cookie) {
            chosenVariant = cookie;
        } else {
            const random = Math.random()
            if (random <= variantB) {
                chosenVariant = 'B';
            }
            setCookie(res, chosenVariant);
        }
        logging.recordVariantLoad(chosenVariant);
        res.abVariant = chosenVariant
        next();
    }
}

module.exports = ab;