---
sidebar_position: 102
---

# sitemap作成

Googleサーチコンソールなどのサーチエンジンに登録するためのサイトマップを作成する方法を記載します。
Docusaurusを利用する場合、設定さえしておけば自動的にサイトマップを作成してくれます。

## 設定手順

docusaurusのplugin sitemapをインストールして、設定を有効にします。

1. Pluginのインストール  
以下のコマンドをdocusaurusのプロジェク内で実行します。
``` bash title="bash"
npm install --save @docusaurus/plugin-sitemap
```
2. Pluginを有効化する  
docusaurus.config.tsファイル内に以下の行をpresets内に追加する
``` javascript title="docusaurus.config.ts"
  presets: [
    [
      'classic',
      {
        (中略)
        // highlight-start
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
          return items.filter((item) => !item.url.includes('/page/'));
          },
        },
        // highlight-end
      } satisfies Preset.Options,
    ],
```

pluginを有効化を行ったあとにドキュメント生成すると、sitemap.xmlファイルが追加されます。
このファイルをサーチエンジン等に登録することでサーチエンジンのクローラーがサイトの情報を自動的に収集します。

