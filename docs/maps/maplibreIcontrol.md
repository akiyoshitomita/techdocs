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
map.current.addControl(new maplibre.ScaleControl());
```




