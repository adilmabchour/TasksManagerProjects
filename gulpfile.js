var gulp = require("gulp");
gulp.task("copy-dist-to-wwwroot", ()=>{
    return gulp.src("./dist/tasks-manager/**/*")
    .pipe(gulp.dest("C:\Users\Public\appAngular\MvcTaskManager\MvcTaskManager\wwwroot"))
})

gulp.task("default", ()=>{
    gulp.watch("./dist/tasks-manager", gulp.series("copy-dist-to-wwwroot"));
})