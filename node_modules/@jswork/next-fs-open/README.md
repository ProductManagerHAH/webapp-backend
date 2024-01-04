# next-fs-open
> Open/read file from local or remote.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-fs-open
```

## apis
| api      | params       | description                  |
| -------- | ------------ | ---------------------------- |
| from     | url/filename | Read file from filename/url. |
| fromUrl  | url          | Read file from url.          |
| fromFile | filename     | Read file from filename.     |

## usage
```js
import NxFsOpen from '@jswork/next-fs-open';

NxFsOpen.from('https://pic.rmb.bdstatic.com/7f7a8d7b247d3aa430010f10a5765239.jpeg');

// <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48 00 00 ff db 00 43 00 08 06 06 07 06 05 08 07 07 07 09 09 08 0a 0c 14 0d 0c 0b 0b 0c 19 12 13 0f ... 10230 more bytes>
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-fs-open/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-fs-open
[version-url]: https://npmjs.org/package/@jswork/next-fs-open

[license-image]: https://img.shields.io/npm/l/@jswork/next-fs-open
[license-url]: https://github.com/afeiship/next-fs-open/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-fs-open
[size-url]: https://github.com/afeiship/next-fs-open/blob/master/dist/next-fs-open.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-fs-open
[download-url]: https://www.npmjs.com/package/@jswork/next-fs-open
