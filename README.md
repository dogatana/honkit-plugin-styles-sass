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

## Changes from original gitbook-plugin-styles-sass

- outputStyle of node-sass is "expaned" by default
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
- remove DateTime string from the name of output css
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
