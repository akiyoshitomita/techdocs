---
sidebar_position: 204
---
# Maplibre GL マーカー

マーカーとはマップ上の位置を示したマークのことです。
会社の位置などの情報をマップ上に記すのに利用したり、特定の場所の近くにある飲食店の場所を分かりやすく表示するために利用します。


import Map from '@site/src/components/map/maplibreMarker';

<Map></Map>

## マーカーの簡単な表示方法

マーカーを表示する場合、Makerクラスを作成し、作成したクラスにMapクラスを追加します。

```TypeScript title="Maker 追加コード"
new maplibregl.Marker()
  .setLngLat([lng, lat])
  .addTo(map.current);
```

maplibregl.Maker()で、マーカーを作成します。 
ハッシュ形式で、オプション指定が可能です。  
本章のトップの例では、color で色を指定し、Scaleで大きさを大きくしています。

setLngLatメソッドでマーカを表示する座標を指定します。座標はFloat型の数値を入力します。

addToメソッドでMapクラスを指定します。指定されたMapクラス上にマーカーが表示されるようになります。

:::note
複数のマーカーを表示する場合は、表示するだけのマーカークラスを作成する必要があります。
:::
