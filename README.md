# website-manage-api

some api for website-manage

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

## 错误码

错误码 | 描述
--- | ---
200 | 成功
500 | 服务器错误
1001 | 未登录
1002 | 请求频繁
1003 | host 被禁止
404 | 接口不存在