# watermark
> Watermark based on sharp.

## installation
```shell
npm install @jswork/watermark
```

## usage
```js
import watermark from '@jswork/watermark';

watermark({
  src: 'https://pic.rmb.bdstatic.com/7f7a8d7b247d3aa430010f10a5765239.jpeg',
  cover: './__tests__/beta_s.png',  // local.png/remote.png/remote.svg
  gravity: 'northwest'
}).then((res) => {
  // res: buffer
});
```
