const {src, dest, watch, series, parallel} = require('gulp'); 

// CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');


function css(done){
    //compilar sass
    // pasos: 1 Identificar archivo, 2- Compilar, 3- Guardad el .css
    src("./src/scss/app.scss")
        .pipe( sass() )
        //.pipe( sass({ outputStyle: 'compressed'}) )
        .pipe(postcss([autoprefixer()]))
        .pipe( dest('build/css'));
    
    done();
}

function dev(){
    watch('./src/scss/**/*.scss',css)
    watch('./src/img/**/*',imagenes);
}

function imagenes(done){
    src('./src/img/**/*')
        .pipe( imagemin({optmizationLevel: 3}))
        .pipe( dest('./build/img') )
    done();
}


//function imagenes(done){
//    src('./src/img/**/*')
//        .pipe( dest('./build/img') )
//    done();
//}

function versionWebp(){
    const opciones = { quality: 50 }
    return src('./src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
}




exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp
exports.default = series( imagenes, versionWebp, css, dev);