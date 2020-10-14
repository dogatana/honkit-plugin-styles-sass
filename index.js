const Q = require('q');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const sass = require('node-sass');
const mkdirp = require('mkdirp');

// Compile a SASS file into a css
function renderSASS(input, output, outputStyle) {
    // prepare directory to store output
    mkdirp.sync(path.dirname(output));

    const d = Q.defer();
    sass.render({
        file: input,
        outputStyle: outputStyle
    }, function (e, out) {
        if (e) return d.reject(e);

        fs.writeFileSync(output, out.css);
        d.resolve();
    });

    return d.promise;
}


// save source filenames to unlink later
const sources = [];

module.exports = {
    hooks: {
        // Compile sass as CSS
        init: function () {
            const DEFAULT_STYLE = 'expanded';
            const book = this;

            // default node-sass outputStyle
            let outputStyle = DEFAULT_STYLE;

            // check pluginsConfig setting
            const pluginsConfig = book.config && book.config.values && book.config.values.pluginsConfig;
            if (pluginsConfig && 'styles-sass' in pluginsConfig) {
                outputStyle = pluginsConfig['styles-sass'].outputStyle || DEFAULT_STYLE;
            }

            const styles = book.config.get('styles');
            return _.reduce(styles, function (prev, filename, type) {
                return prev.then(function () {
                    const extension = path.extname(filename).toLowerCase();
                    if (extension != '.sass' && extension != '.scss') return;

                    book.log.info.ln(`compile sass file: ${filename} with "${outputStyle}" style`);
                    sources.push(filename);

                    // Temporary CSS file with directory
                    const dirname = path.dirname(filename);
                    const basename = path.basename(filename, path.extname(filename));
                    const tmpfile = path.join(dirname, `${basename}.css`);

                    // Replace config
                    book.config.set(`styles.${type}`, tmpfile);

                    return renderSASS(
                        book.resolve(filename),
                        path.resolve(book.output.root(), tmpfile),
                        outputStyle
                    );
                });
            }, Q());
        },
        finish: function () {
            // source files has been copied to book, so delete them
            const root = this.output.root();
            for (const src of sources) {
                fs.unlinkSync(path.join(root, src));
            }
        }
    }
};
