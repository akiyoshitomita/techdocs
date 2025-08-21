---
sidebar_position: 103
---

# 数式をきれいに表示する

Docusaurus上で数学の数式をTeXを利用してきれいに表示する方法を紹介します。

## 設定手順

以下のコマンドでnpmを利用して、remark-math 6と rehype-katex 7をインストールします。
Docusaurus v3を利用している場合、最新版をインストールすると動作しないので必ずバージョンを指定する必要が有ります。

``` bash
npm install --save remark-math@6 rehype-katex@7
```
docusaurus.conf.jsファイルを編集してPluginを有効にします。
トップに、importを入力し、presets内部でrekarkPluginsとrehypePluginsの設定を入れます。  
※　下記は、docsにのみ適用しています。blogなどの文章にも追加する場合は、blog内にremarkPlugins/rehypePluginsを追加してください。

``` javascript title="ES module docusaurus.config.js (抜粋)"
import type * as Preset from '@docusaurus/preset-classic';
// highlight-start
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// highlight-end
// 中略
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
// highlight-start
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
// highlight-end
        },
      }, // 途中省略しています
    ],
  ],
// highlight-start
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
// highlight-end
// 以下略
```

## 数式の表示方法

数式の表示方法は、インラインの場合`$`で囲みます。
１行全体に表示する場合は`$$`で囲んだラインが表示されます。
数式の表現は、TeX形式です。詳しい説明は時間が有りましたら別記事で記載します。

出力例

``` markdown
インライン例はこの $I = \int_0^{2\pi} \sin(x)\,dx$ ように設定します。
数式だけ表示する場合は、以下のようになります。
$$
I = \int_0^{2\pi} \sin(x)\,dx
$$
```


