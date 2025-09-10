---
sidebar_position: 205
---

# Maplibre GL ポップアップ

Maplibre GLの地図上にポップアップ（吹き出し）を表示する方法を記載します。

import Map from '@site/src/components/map/maplibrePopup';

<Map></Map>


```TypeScript showLineNumbers
    const popup = new maplibregl.Popup()
        .setLngLat([lng, lat])
        .setHTML('<h1>Hello World!</h1>')
        .addTo(map.current);
```

1行目: ポップアップクラスを初期化します。  
2行目: ポップアップを表示する場所をsetLngLatで指定します。  
3行目: ポップアップ内部のHTMLを記載します。  
4行目: mapクラスへ追加して表示します。  
