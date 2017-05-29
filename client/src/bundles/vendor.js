// TODO Enable require(*.css) includes once https://github.com/webpack/extract-text-webpack-plugin/issues/179
// is resolved. Included in bundle.scss for now.

require('babel-polyfill');
require('json-js');

// jQuery plugins require that the jQuery object is exposed as a global
// webpack.ProvidePlugin is used to ensure that jQuery and $ are provided to all includes
require('script-loader!../../../thirdparty/jquery/jquery.js');

require('../../../thirdparty/jquery-ondemand/jquery.ondemand.js');
require('../../../thirdparty/jquery-ui/jquery-ui.js');
// require('../../../thirdparty/jquery-ui-themes/smoothness/jquery-ui.css');
require('../../../thirdparty/jquery-entwine/dist/jquery.entwine-dist.js');
require('../../../thirdparty/jquery-cookie/jquery.cookie.js');
require('../../../thirdparty/jquery-query/jquery.query.js');
require('../../../thirdparty/jquery-form/jquery.form.js');
require('../../../thirdparty/jquery-notice/jquery.notice.js');
// require('../../../thirdparty/jquery-notice/jquery.notice.css');
require('jquery-sizes/lib/jquery.sizes.js');
require('../../../thirdparty/jstree/jquery.jstree.js');
// require('../../../thirdparty/stree/themes/apple/style.css');
require('../../../thirdparty/jquery-hoverIntent/jquery.hoverIntent.js');
require('../../../thirdparty/jquery-changetracker/lib/jquery.changetracker.js');

require('chosen-js');
