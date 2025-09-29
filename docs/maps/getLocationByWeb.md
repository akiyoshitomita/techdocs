---
sidebar_position: 901
---

# 簡単に位置情報を取得する方法

位置情報はWEBページで簡単に取得することが可能です。ここでは、簡単なJavascriptで位置情報を取得する方法を記載ます。

## ブラウザの位置情報の注意点

Javascriptでの位置情報は、ブラウザが自動的に最適な方法で位置情報を測定した結果を返します。  
ただ、それらの情報の正確性が必ずしも担保しているわけではありません。  
たとえば、GPSがついていない端末でも様々な情報から位置情報をブラウザは計算し返します。中には正確ではない情報も含まれていることを覚えておきましょう。  
もし携帯電話のGPSから取得する正確な情報が欲しい場合は、アプリケーション開発で専用のAPIにて情報を取得することをお勧めします。

また今回紹介する方法では、ブラウザ上ではどの様な情報から計算されたかを調べることも出来ないです。

## JavaScript位置情報の取得方法

位置情報の計算は非同期で行われます。位置情報を計算が終わったらコールバック関数が呼ばれます。

```Javascript

// 位置情報の取得に成功した場合の処理
function success(position) {
  const coords = position.coords;
  const latitude = coords.latitude; // 緯度
  const longitude = coords.longitude; // 経度

  console.log("緯度: ${latitude}, 経度: ${longitude}");
}

// 位置情報に失敗した場合の処理
function errror(){
  alart("位置情報を取得できませんでした。");
}

if (!navigator.geolocation) {
  alart("このブラウザーは位置情報に対応していません");
} else {
  navigator.geolocation.getCurrentPosition(success, error, options);
}
```

位置情報は、latitude/longitudeとして出力する例を記載しています。   
位置情報の取得に失敗する場合は、端末が位置情報を取得できない場合やユーザが位置情報を取得に対してブロックしている場合なども含みます。
