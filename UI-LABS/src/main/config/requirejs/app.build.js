({
	waitSeconds: 600,
    baseUrl: "${project.build.directory}/${project.build.finalName}-work/js/",
    paths: {

        tpl: "../tpl",

        jquery: "lib/jquery",
        underscore: "lib/lodash.underscore",
        backbone: "lib/backbone",

        // jQuery plugins
        "jquery-ui": "lib/jquery-ui",

        // require plugins
        text: "lib/text"

    },
    shim: {

        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },
        "backbone": {
            deps: [ "underscore", "jquery"],
            exports: "Backbone"
        }

    },
    optimize: "uglify2",
    optimizeCss: "standard",
    out: "${project.build.directory}/${project.build.finalName}-work/js/main-min.js",
    removeCombined: false,
    name: "main"
    // NOTE: below is commented out since we're using yui-compressor to optimize css and JS (non-require)
    // once every JS module is refactored into require.js standard, remove yui-compressor and use dir attribute below
    //appDir: "${project.build.directory}/${project.build.finalName}-work/",
    //baseUrl: "./js/",
    //dir: "${project.build.directory}/${project.build.finalName}/",
    //modules: [{ name: "main"}]
})
