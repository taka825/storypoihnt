# Story Point

アジャイル開発で用いられるストーリーポイントでの見積もりをシステム化。

## First Setup

### Environment Variables

`.env.example`ファイルから`.env`ファイルをコピー。

```
cp .env.example .env
```

`.env`内の各種環境変数を変更。
[https://firebase.google.com/docs/web/setup?hl=ja#config-object](https://firebase.google.com/docs/web/setup?hl=ja#config-object)

### Packages Install

`yarn install`コマンドを実行し、パッケージをインストール。

## Available Commands

プロジェクトルートで実行。

### `yarn install`

`package.json`に列挙されたパッケージのインストール。

### `yarn start`

ローカルの開発環境が起動し、ブラウザが開く。
[http://localhost:3000](http://localhost:3000)

### `yarn build`

`build`フォルダに本番用のビルドファイルが生成される。

## DEMO

[DEMO](https://storypoint-30de8.web.app/)
