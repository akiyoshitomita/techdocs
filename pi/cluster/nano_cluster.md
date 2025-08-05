# NanoCluster

![NanoCluster](https://sipeed.com/assets/nanocluster.4571c9ce.png)(https://sipeed.com/nanocluster)

## 特徴

７スロットのクラスターモジュールで、raspberry piであればCM4/CM5がコンパクトな１台で動作可能なモジュール  
モジュールの種類は、主に４種類ありすべて、ARMベースのモジュールがサポートされています。

:::note
NPUがついているM4Nは、最大4台までしか搭載できません。
:::

## アーキテクチャ

### USBポートとHDMIポート

スロット1に接続しているモジュールの画面とキーボードマウス入出力用になります。
ほかのスロットに接続しているモジュールは、スロット1からsshなどでリモート接続して利用します。

:::warning
VNCなどを利用して、ほかのスロットのGUIへアクセスは可能ですが、基本的にクラスターを組んで利用する製品です。
:::

### ネットワーク

内蔵スイッチがあり、各モジュールをGigabit Ethernetで接続しています。 VLANもサポートしており、GUIから設定変更が可能です。

### ストレージ

基本的には、各モジュール内部のeMMCを利用します。2242/2230サイズのSSDを接続することができますが、ヒートシンク等をつけるスペースがないので注意が必要です。マイクロSDカードも使うことができます。

## 電源

USB PD (20V 3A)から入力します

## 参考URL

[ドキュメント](https://wiki.sipeed.com/nanocluster) 英語  
[GITHUB](https://github.com/sipeed/NanoCluster) READMEのみ  
[製品ページ](https://sipeed.com/nanocluster) 購入ページあり
