/**
 * Build Server Renderer
 */

import * as path from 'path';
import * as fs from 'fs-extra';
const rollup = require('rollup');


const SRC_DIR = path.join(__dirname, '../transpiled-ssr');
const ENTRY_FILE = path.join(__dirname, '../transpiled-ssr/bindings/server-renderer/src/index.js');
const DEST_DIR = path.join(__dirname, '../stencil-server-renderer');
const DEST_FILE = path.join(DEST_DIR, 'index.js');


rollup.rollup({
  entry: ENTRY_FILE,
  external: [
    'css',
    'fs',
    'node-fetch',
    'parse5',
    'path',
    'url',
    'vm'
  ]

}).then((bundle: any) => {

  // copy over all the .d.ts file too
  fs.copy(SRC_DIR, DEST_DIR, {
    filter: (src) => {
      return src.indexOf('.js') === -1;
    }
  });

  // bundle up the compiler into one js file
  bundle.write({
    format: 'cjs',
    dest: DEST_FILE
  });

});