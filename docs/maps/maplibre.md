---
sidebar_position: 201
---

# MapLibreで簡単WEB地図アプリ

MapLibre GL JS というライブラリを利用することで、下のようなＷＥＢベースの地図アプリケーションを簡単に作成することができます。
下のサンプルは単純に地図を表示しているだけですが、地図上にポインタを設置したり、グラフなどを追加して視覚的効果を生むことができます。  
BSDライセンスを利用しており、標準でクレジットも自動的に追記されるための非常に使い勝手がよいライブラリだと思います。

import Map from '@site/src/components/map/maplibre';

<Map></Map>

## Maplibreの簡単な利用方法

maplibreを利用する場合、大きく2つのインストール方法があります。

1. npmを利用してソースコードのインストール
2. CDNを利用してHTMLに埋込む

本書のほとんどはnpm+Reactを利用したコードで利用方法を紹介しますが、本ページのみCDNの利用方法を記載します。

## CDNを利用してHTMLに埋込む場合

HTMLに以下のタグを埋込みます。

```html 
<script src="https://unpkg.com/maplibre-gl@^5.6.2/dist/maplibre-gl.js"></script>
<link href="https://unpkg.com/maplibre-gl@^5.6.2/dist/maplibre-gl.css" rel="stylesheet" />
```

地図を表示したい場所に以下のタグを追加します。
```html
<div id="mapcontainer"></div>
<script>
    const map = new maplibregl.Map({
        container: 'mapcontainer',
        zoom: 14,
        center: [139.768, 35.6844],
        style:'https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json',
    });
</script>
```

:::Note
上記コードはmapcontainerのボックスサイズを省略しています。スタイルシートで適切なサイズに調整してください
:::
