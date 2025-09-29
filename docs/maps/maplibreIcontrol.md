---
sidebar_position: 205
---

# Maplibre GL コントロールボタンの表示

Maplibreには標準で様々なマップをコントロールするボタンが用意されています。
コントロールボタンの表示方法とその種類について紹介します。

## コントロールボタンの概念。

コントロールボタンを、マップ上四隅に表示可能で IControl タイプのオブジェクトで管理されます。
IControlオブジェクトを自作することも可能で、必要なボタンを追加することもできます。

## コントロールボタンを表示する方法

mapクラスのaddControl()メソッドでIControlオブジェクトを追加することで表示します。

```
map.current.addControl(new maplibregl.ScaleControl());
```

## 距離計の表示

距離計を表示する場合、`ScaleControle`クラスを作成しマップに追加します。

import Map from '@site/src/components/map/maplibreScale';

<Map></Map>


```
map.current.addControl(new maplibregl.ScaleControl());
```

サンプルは左下に表示されます。  


