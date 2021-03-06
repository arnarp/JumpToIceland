// Type definitions for gulp-nodemon
// Project: https://github.com/JacksonGariety/gulp-nodemon
// Definitions by: Qubo <https://github.com/tkQubo>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />

declare module "gulp-nodemon" {
    namespace nodemon {

        interface Nodemon {
            (option?: Option): EventEmitter;
        }

        interface Option extends _Option {
            tasks?: string[]|((changedFiles: string[]) => string[]);
        }

        // TODO: Properties may be insufficient
        // TODO: In future this interface should be moved to nodemon.d.ts
        interface _Option {
            env?:  { [key: string]: string|boolean|number; };
            script?: string;
            /**
             * Extensions to look for, ie. js,jade,hbs.
             */
            ext?: string;
            /**
             * Execute script with "app", ie. -x "python -v".
             */
            exec?: string;
            /**
             * Watch directory "dir" or files. use once for each directory or file to watch.
             */
            watch?: string[];
            /**
             * Ignore specific files or directories.
             */
            ignore?: string[];
            /**
             * Minimise nodemon messages to start/stop only.
             */
            quiet?: boolean;
            /**
             * Show detail on what is causing restarts.
             */
            verbose?: boolean;
            /**
             * Try to read from stdin.
             */
            stdin?: boolean;
            stdout?: boolean;
            /**
             * Execute script on change only, not startup
             */
            runOnChangeOnly?: boolean;
            /**
             * Debounce restart in seconds.
             */
            delay?: number;
            /**
             * Forces node to use the most compatible version for watching file changes.
             */
            legacyWatch?: boolean;
            /**
             * Exit on crash, allows use of nodemon with daemon tools like forever.js.
             */
            exitcrash?: boolean;
            execMap?: { [key: string]: string|boolean|number; };
            events?:  { [key: string]: string; };
            restartable?: string;
            nodeArgs?: string[];
        }

        interface EventEmitter extends NodeJS.EventEmitter {
            addListener(event: string, listener: Function): EventEmitter;
            addListener(event: string, tasks: string[]): EventEmitter;
            on(event: string, listener: Function): EventEmitter;
            on(event: string, tasks: string[]): EventEmitter;
            once(event: string, listener: Function): EventEmitter;
            once(event: string, tasks: string[]): EventEmitter;
        }
    }

    var nodemon: nodemon.Nodemon;

    export = nodemon;
}

