---
title: React コンポーネントを埋込む 
sidebar_position: 301
---

# React コンポーネントを埋込む

Docusaurusには、Markdown内部にReactで表現したものを表示することができます。

例えば以下のように、背景を変更するボックスを設置することができます。


import Demo from '@site/src/components/Demo';

<Demo></Demo> 

## 埋め込み方法

Docusaurusのmdファイル内部に直接import 文とタグを記載します。

```Markdown title="demo.md"

---
title: React コンポーネントを埋込む 
sidebar_position: 301
---

import Demo from '@site/src/components/Demo';

<Demo></Demo>
```

@siteは、docusaurusのプロジェクトディレクトリを指します。
importで、src/components/Demo.jsファイル内部のDemoを呼び出しています。

```javascript title="src/components/Demo.js"
import React from 'react';
import { useState } from 'react';

export default function Demo({ children, color }) {
  const [Bgcolor, setBgcolor]  = useState('Blue')

  function red(){ setBgcolor('red'); }

  function green(){ setBgcolor('green'); }

  return (
    <div className="demo" style={{
        backgroundColor: Bgcolor,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',}} >
      ボタンをクリックするとここのボックスの背景が変化します<br />
      <button onClick={red}>Red</button>
      <button onClick={green}>Green</button>
    </div>
  );
};
```
