---
sidebar_position: 205
---

# Maplibre でリアルタイム表現

Maplibreは地図表示はデフォルトではアニメーションで行われます。
しかし、データ更新はスクリプト上で任意に再読み込みを行う必要があります。


## GeoJSONの更新方法

データ更新があるgeojsonを読み込むときにaddSourceを利用してGeoJSONを追加します。
追加したときのIDをgetSource()で読み込みます。
読み込んだGeoJSONのデータをsetData()で上書きします。
上書いたものをupdateData()を呼び出すことで再描写します。

```typescript
map.current.addSource('geojsondata1' {
  type: 'geojson',
  data: 'http://localhost/realtimedata.json'
});

let geojsondata1 = map.current.getSource('geojsondata1');
geojsondata1.setData('http://localhost/realtimedata.json');
geojsondata1.updateData();
```
