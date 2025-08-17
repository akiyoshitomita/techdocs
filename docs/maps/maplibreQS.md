---
sidebar_position: 202
---

# Maplibre GL クイックスタートガイド

Reactを利用したMaplibreの簡易スタートガイドです。

## 前提条件

node.jsが利用可能なCLIからの作業項目で作成しています。
事前にnodejsのインストールをお願いします。

## プロジェクト開始手順

next.jsのアプリケーションを`npx create-next-app@latest`コマンドを利用して開始します。
対話形式で、必要な横目を入力します。

```bash title="create-next-app" showLineNumbers
$ npx create-next-app@latest

✔ What is your project named? … maplibre
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes
Creating a new Next.js app in /home/user/maplibre.

Using npm.

```

3行目: プロジェクト名を入力します。この名称のディレクトリが自動的に作成されます。  
4行目: Type Scriptを利用するかの選択肢です。maplibreはtypescriptを利用しているためyesを選択する事を推奨します。  
5行目: ExLintをインストールするかの選択肢です。特に理由がない限りYesを推奨します。  
6行目: Tailwindを利用するかの選択肢です。特に理由がない限りYesを選択してください。  
7行名: スクリプトをsrcディレクトリ内に保存するかの選択肢です。特に理由がない限りYesを選択することを推奨します。  
8行目: 複数ページを作成するときにRouter機能を利用するかの選択肢です。Mapアプリが1ページのみの場合はNo、それ以外はYesを選択します。  
9行目: Nodeのimport分に@のエイリアスを利用するかの選択肢です。Noを選択することを推奨します。  

:::note
推奨以外を選択した場合は、本書で記載してあるファイルのパスや名前が変わることがあります。
:::

コマンドが完了すると自動的にnext.jsプロジェクトが読み込まれ、React等の環境がインストールされます。

最後にプロジェクトのディレクトリに移動します。

```
cd maplibre
```

## maplibreをインストールする

npmコマンドを以下のように入力し、maplibre-glをインストールします。

```
npm i maplibre-gl
```

インストールが終了しましたら、必要なコンポーネントが揃いました。

## next.jsの環境設定

next.config.mjs ファイルを以下の通り編集し、HTMLファイルで結果を出力するようにします。

```
/** @type {import('next').NextConfig} */
const nextConfig = {
       distDir: 'build',
       output: 'export'
};

export default nextConfig;
```

distDirは、HTMLを出力先のディレクトリ名です。gitを利用している場合は、.gitignoreに入れることを推奨します。  
output は、exportを指定し、htmlファイルとして出力することを指定してください。

## maplibreのサンプルプログラム作成

src/app/page.tsxを以下の通り編集します

```typescript title="src/app/page.tsx"
import Image from "next/image";
import Map from './components/map.js';

export default function Home() {
  return (
    <div className="App">
      <Map/>
    </div>
  );
}
```

src/app/componets/maps.jsファイルを作成し、以下のおとり記述します。
```javascript title="src/app/componets/maps.js"
"use client";

import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(14);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json`,
      center: [lng, lat],
      zoom: zoom
    });
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    new maplibregl.Marker({color: "#FF0000"})
      .setLngLat([139.7525,35.6846])
      .addTo(map.current);
  }, [ lng, lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
```

最後に src/componets/map.css を以下の通り記述します。
```css title="src/componets/map.css"
.map-wrap {
  position: relative;
  width: 100vw;
  height: 100vh; 
}
  
.map {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
```

## HTMLファイルを出力する

以下のコマンドを入力し、buildディレクトリにhtmlを出力します。

```
npm run build
```

出力したファイルをブラウザで開く事で動作を確認します。

:::info
npm run devと入力することで簡易Webサーバーを起動して確認することも出来ます。
:::
