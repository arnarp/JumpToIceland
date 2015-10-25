export var Tasks = {
    // Task that watches src files and lints and compiles
    Dev: 'development',
    // Build task
    Build: 'build',
    // Task that compiles sass files
    Sass: 'sass',
    // Task that watches src sass files and compiles
    SassWatch: 'sass:watch',
    // Task that injects styles into index.html
    WireStyles: 'wire:styles',
    // Task that wired bower dependencies into index.html
    WireBower: 'wire:bower',
    // Lint all custom TypeScript files
    TsLint: 'ts:lint',
    // Watches all TypeScript and lints
    TsWatch: 'ts:watch',
    // Compiles Gulp TypeScript
    TscGulp: 'tsc:gulp',
    // Compiles Client TypeScript
    TscClient: 'tsc:client',
    // Compiles Server TypeScript
    TscServer: 'tsc:server',
    //
    StartServerInDev: 'start:dev'
};
