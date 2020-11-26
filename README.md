# SASS Stylesheets for Honkit

This plugin makes it easy to use SASS custom stylesheets instead of CSS for your book.

Add it to your `book.json`, with some custom stylesheets:

```js
{
    "plugins": ["styles-sass"],
    "styles": {
        "pdf": "./styles/pdf.sass"
    }
}
```

## Fork of gitbook-plugin-styles-sass

honkit-plugin-styles-sass is a fork of https://github.com/GitbookIO/plugin-styles-sass

Gitbook is now deprecated and node-sass 3.4.1 seems too old to use now.

This plugin aims to be used with Honkit.


## Changes from gitbook-plugin-styles-sass

- update version of dependencies
- outputStyle of node-sass is `expaned` by default
- outputStyle can be specified in book.json

```js
{
    "pluginsConfig": {
        "styles-sass": {
            "outputStyle": "compressed"
        }
    }
}
```
- outputStyle must be one of `nested`, `expanded`, `compact` and `compressed`
- remove DateTime string from the name of output
- directory path is preserved as specified in book.json

ex) In the following case, _book/styles/website/sample.css will be stored.
```js
{
    "styles": {
        "website": "styles/website/sample.scss"
    }
}
```
- input .scss and .sass files are not copied to _book
