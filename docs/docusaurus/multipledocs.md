---
sidebar_position: 104
---

# 複数のドキュメントを作成

Docusaurusのドキュメントはデフォルトではdocsに入っていますが、ドキュメントプロジェクトによっては複数個作りたいことがあります。
今回は、複数のプロジェクトを追加する方法を記載します。

## 変更手順

### 1. 既存のdocsのディレクトリを変更する(任意)

既存のドキュメントのディレクトリ名を変更する方法を記載します。
必須ではないですが、プロジェクトによっては変更したほうが管理しやすいです。

`docusaurus.config.ts`ファイル内部の persets 内のdocsのrouteBasePathとpathの設定を追加します。  

routeBasePathは、最初にWEBページ上部にあるリンクの値を入力します。通常は、pathと同じ値を入力します。  
pathは、プロジェクトディレクトリからのmdファイルがあるパスを指定します。

```ts title="docusaurus.config.ts 変更部分のみ"
 presets: [
    [
       'classic',
       {
         docs: {
  // highlight-start
           routeBasePath: 'docs',
           path: 'docs',
  // highlight-end
           // そのほかの既存設定(省略)
         }
       },
       {...},
     ],
   ],
```

### 2.新しいディレクトリを追加する

新しいコンテンツの入ったディレクトリをPlugins内に追加します。  
Pluginの設定が入っていない場合は、presetsと同レベルに追加します。

pathは、プロジェクトからのディレクトリ名  
idは、内部的な識別子名（他のIDと重複しないユニークな名前)  
sidebarPathは、特に変更する必要が無ければpresetsのdocsと同じ設定を行う  

```ts title="docusaurus.config.ts 変更部分のみ"
  presets: [...]
// highlight-start
  plugins: [
         [
                 '@docusaurus/plugin-content-docs',
                 {
                         id: 'new_doc',
                         path: 'new_doc',
                         routeBasePath: 'new_doc',
                         sidebarPath: require.resolve('./sidebars.js'),
                 },
         ],
  ],
  // highlight-end
```

### 3. 上部のリンクに追加

ドキュメント上部のリンクに追加する場合、以下のようにthemeConfig中に設定を追加します。

toは、リンクのパス  
positionは表示する場所  
labelは表示するテキスト  


```ts title="docusaurus.config.ts 変更部分のみ"
   themeConfig: {
       {...},
// highlight-start
       {
               to: '/tech/pi/',
               position: 'left',
               label: 'arm h/w',
               activeBaseRegex: '/tech/pi/',
       },
// highlight-end
       {...},
   }
```
