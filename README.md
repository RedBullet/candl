# candl.io

A website for the Canterbury Open device lab, build with Yeoman Jekyllized

## Installation
Run `bundle && npm install`

## Usage

### gulp
The default task, this will automatically compile and open the site in your browser. A watch task runs in the background and detects when any files change, recompiles them if nessecary and updates your browser with BrowserSync.

### gulp check
Check the health of your JavaScript, CSS and Jekyll. You can change the settings for what it looks for in .jshintrc.

### gulp build
Almost the same as the default gulp task, but this won't start up a preview/LiveReload server and open the browser, it will only build your site.

### gulp publish
This will first run gulp build to make sure the changes you've made to your site are included and then optimize all your assets (images, HTML, CSS, JS++). If you want to display your optimized site to make sure everything is working run gulp serve:prod to see the changes.

### gulp deploy
This will either upload your site to Amazon S3, Rsync your files to your server or push them to GitHub Pages.
