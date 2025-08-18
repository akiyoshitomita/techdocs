---
sidebar_position: 203
---

# MapLibre GL Mapクラス

MapLibre GLを利用するための基本クラスについて解説します。

```typescript title="例" showLineNumbers
let map = new maplibregl.Map({
  container: 'map',
  style: `https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json`,
  center: [-122.420679, 37.772537],
  zoom: 13,
});
```

Maplibreを利用する際に必ず利用するクラスです。

* `new maplibregl.Map()`でクラスを呼び出します。

## 初期化オプションの簡易説明

### container

必ず指定する必要があるオプションです。
mapを表示するためのHTML エレメントのIDを入力します。

### style

必ず指定する必要があるオプションです。
読み込む地図データをJSON形式で指定します。

GL StyleのJsonファイルのURLを文字列で指定する方法と
JSONの内容を直接記入する方法の2パターンあります。

### center 

地図を読み込んだときにはじめに表示する座標を指定します。
座標は、経度、緯度の順にリスト形式で指定します。
省略した場合は0,0になります。

### zoom

地図を読み込んだときに表示するズームレベルを指定します。
省略した場合は、0になります。
