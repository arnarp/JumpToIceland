'use strict';
import express = require('express');
import bodyParser = require('body-parser');
import favicon = require('serve-favicon');
import logger = require('morgan');
import { ServerConfig } from './server.config';
import { send404 } from './utils/404';

let env: string = process.env.NODE_ENV || ServerConfig.enviroments.Dev;
let port: number = process.env.PORT || 8001;
let morganFormat = env === ServerConfig.enviroments.Prod ?
    'common' : 'dev';

console.log('Starting Express Server');
console.log('PORT=' + port);
console.log('NODE_ENV=' + env);

let server = express();
server.use(favicon(`${__dirname}/wwwroot/favicon.ico`));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(logger(morganFormat));

switch (env) {
    case ServerConfig.enviroments.Prod:
        console.log('** Prod **');
        server.use(express.static('./build/wwwroot'));
        server.use('/app/*', send404);
        server.use('/*', express.static('./build/wwwroot/index.html'));
        break;
    default:
        console.log('** Dev **');
        server.use(express.static('./src/client/'));
        server.use(express.static('./'));
        server.use(express.static('./tmp'));
        server.use('/app/*', send404);
        server.use('/*', express.static('./src/client/index.html'));
        break;
}

server.listen(port, function() {
    console.log(`Express server listening on port ${port}`);
    console.log(`env = ${server.get('env')}
        __dirname = ${__dirname}
        process.cwd = ${process.cwd()}`);
});
