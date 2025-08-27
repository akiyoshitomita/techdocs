---
sidebar_position: 207
---

# Maplibre 任意の場所へ移動する

地図を任意の場所へ移動する方法を記載します。
サンプルは、ボタンを押すと東京駅近くへ移動します。

## 任意の場所へ移動する方法

任意の場所へ移動する場合、mapに対して、setCenter()で場所を指定することで移動します。
また、setZoom()でzoomレベルを変更を同時に行うことで任意のズームレベルに調整が可能です


```
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = 139.768;
  const lat = 35.6844;
  const zoom = 14;

  function move(){
          map.current.setCenter([lng, lat]).setZoom(zoom);
  }

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json`,
      center: [0, 0],
      zoom: 0,
    });

    new maplibregl.Marker({color: 'red'})
                  .setLngLat([lng, lat])
                  .addTo(map.current);
  }, [lng, lat, zoom]);

  return (
    <div>
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
      <button onClick={move}>移動</button>
    </div>
  );
```

import Map from '@site/src/components/map/maplibreMove';

<Map></Map>

## 指定した場所へ移動するアニメーションを表示する場合

setCenter()の代わりにpanTo()を利用することにより、目的の場所までの移動がアニメーション表示に切り替わります。

```typescript
// 下の行を削除する
// map.current.setCenter([lng, lat]).setZoom(zoom);

// 下の行を追加する
map.current.panTo([lng, lat]);
```

import Map2 from '@site/src/components/map/maplibreMove2';

<Map2></Map2>

panToを利用すると、同一Zoomレベルで目的の場所までアニメーションで移動を行います。
Zoomの変更を同時に行うとアニメーションが止まってしまうので、zoomレベルも変更する場合は
次の方法で行ってください。

## アニメーションで移動とZoomを同時に変更する場合

flyTo()を利用することで、Zoomと移動を組み合わせたアニメーションが行えます。
元々、2点を飛行機のフライトのようにズームアウトし移動しズームインするような動きをします。


```typescript
map.current.flyTo({
  center: [lng, lat],
  zoom: zoom
});
```
import Map3 from '@site/src/components/map/maplibreMove3';

<Map3></Map3>
