# SCSS components  
The SCSS sources are not compiled automatically. At this moment if you make any changes to SCSS code you need to compile assets manually and put under `/src/main/resources/webroot` directory.

## Soundwave loader  
Soundwave loader is displayed when user is redirected from Caucus to Zyme or vice versa. Code was literally stolen. Sorry, not sorry! HTML code for loader follows the structure from `client/src/components/common/InitialLoader.vue`.
```shell
# install sass
npm install -g sass
# compile intial-loader.scss into loader.css and place it straight into /src/main/resources/webroot
sass initial-loader.scss -I=. --no-source-map ../resources/webroot/loader.css
```
