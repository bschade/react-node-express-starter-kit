var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var devServer = require( 'gulp-develop-server' );
var livereload = require( 'gulp-livereload' );
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

gulp.task('build', ['css'], function () {
  return browserify({
    entries: 'app/components/Main.jsx',
    extensions: ['.jsx','.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .on('error', function (err) {
    console.log(err.toString());
    this.emit("end");
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('public/js'));
});

var options = {
  path: './server.js'
};

var serverFiles = [
'./server.js',
'public/**/*.js'
];

gulp.task( 'devServer:start', ['css', 'build'], function() {
  devServer.listen( options, livereload.listen );
});

gulp.task('css', function() {
  return gulp.src('./app/css/*.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(postcss([ autoprefixer({ browsers: ['last 4 version'] }) ]))
    .pipe(gulp.dest('./public/css'));
});

gulp.task( 'default', ['devServer:start' ], function() {
  function restart( file ) {
    devServer.changed( function( error) {
      setTimeout(function(){
        if( ! error ) livereload.changed( file.path );
      }, 1000)
    });
  }
  function restart_quick( file ) {
    livereload.changed( file.path );
  }
  gulp.watch(['app/**/*.jsx', 'app/**/*.js'], ['build']);
  gulp.watch( serverFiles ).on( 'change', restart );
  gulp.watch(['app/**/*.styl'], ['css']);
  gulp.watch(['public/**/*.css', 'views/**/*.jade']).on( 'change', restart_quick );
});

