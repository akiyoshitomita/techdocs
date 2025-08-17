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

## Reactを利用する場合(npm利用)

npmからmaplibreのパッケージをプロジェクト内にインストールします。

```
npm i maplibre-gl
```


Reactを利用したときのサンプルは以下の通りです。  
Reactの利用方法の解説は、リクエストがありましたら行いますが今現在は利用方法を知っていることを前提としています。
```
import React, { useRef, useEffect } from 'react';
import maplibregl, {GlobeControl} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

export default function Map({ children, color }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = 139.768;
  const lat = 35.6844;
  const zoom = 14;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json`,
      center: [lng, lat],
      zoom: zoom,
    }));

  }, [lng, lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
```

最後にcssファイルを追加します。今回のレイはmap.cssファイルにしてありますがファイル名は変更可能です。

```
.map-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - 77px);
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
```
