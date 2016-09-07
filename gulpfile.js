var gulp        = require("gulp");
var sass        = require("gulp-ruby-sass");
var browserify  = require("browserify");
var babelify    = require("babelify");
// var babel       = require("gulp-babel");
var source      = require("vinyl-source-stream");

var assets_path       = "public/assets/";
var node_assets_path  = "node_assets/";

var images_path       = assets_path + "images/";
var sass_path         = node_assets_path + "sass/";
var stylesheets_path  = assets_path + "stylesheets/";
var js_path           = node_assets_path + "javascripts/";

// gulp.task("themes-images", function(){
//   gulp.src( images_path + "themes/**")
//     .pipe(styledimage({
//       name: "_themes_images_vars.scss",
//       root: "/assets/images/themes/",
//       formats: [
//         {
//           generator: "sass_mixin_default",
//         },
//         {
//           generator: "sass_vars_default",
//         },
//         {
//           suffix: "__rel",
//           generator: "sass_mixin_relative",
//         },
//       ]
//     }))
//   .pipe(gulp.dest( sass_path + "auto_generated/" ));
// });

gulp.task("sass", function(){
  console.log(sass_path, stylesheets_path)
  return sass(sass_path + '**')
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(stylesheets_path));
});

gulp.task("js_compile", function(){
  browserify( js_path + "bundle.js")
    .transform( babelify, {presets: ["es2015"]} )
    .bundle()
    .on("error", function(err) { console.log("Error: " + err.message); })
    .pipe( source("default.js") )
    .pipe( gulp.dest( assets_path + "/javascripts/" ) )
});

gulp.task("watch", function(){
  // gulp.watch( images_path + "themes/**", ["themes-images"] );
  gulp.watch( sass_path + "*", ["sass"] );
  gulp.watch( js_path + "**/**", ["js_compile"] );
});

gulp.task("default", [
  // "themes-images", 
  "sass", 
  "js_compile",
  "watch"]);
