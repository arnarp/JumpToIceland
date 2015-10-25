'use strict';
import express = require('express');

export function send404(
    req: express.Request,
    res: express.Response) {
    var data = {
        status: 404,
        message: 'Not Found',
        url: req.url
    };
    res.status(data.status)
        .send(data)
        .end();
};