---
sidebar_position: 101
---

# Bluetoothキーボードスイッチャー

Raspberry Piにつないだキーボード・マウス(USB)を、Bluetoothキーボード・マウスとしてエミュレーションを行うツールを紹介します。
Bluetoothでペアリング先は最大11台につなぐことが可能で、簡単な操作で切り替えが可能です。

:::note
ソースコードの作りから、Raspberry Pi以外でも利用可能な作りですが、一部動作不良があるようで正確に動作するためにはソースコードの修正ができるぐらいのスキルが必要です。
:::

:::warning
私の環境では、一部正常に動作しなかったため動作を独自の修正を加えています。
::: 

## ツールの紹介

GIT HUBでApache-2.0 licenseで以下のURLで公開されています。非常にコンパクトで、改変も簡単に行うことができます。
https://github.com/nutki/bt-keyboard-switcher

## 事前準備及びインスール手順

Raspberry Pi OSをセットアップしたBluetoothが利用可能なRaspberry Piを用意します。  
Bluetoothは外付けのUSBアダプタのものでも動作しますが、レガシーなBluetoothアダプタでは動作ができない場合があります。BLE4.0以上に対応したアダプタが必要なようです。（未確認）  
OS標準でインストールされているgit,bluetoothctlとhciconfigコマンドが利用可能なことを確認しておいてください。

1. 動作に必要なツールをインストールする。
```
sudo apt install git python3-dbus python3-pyudev python3-evdev
```

1. プロジェクトをコピーする
任意のディレクトリにインストールしてください。
```
git clone https://github.com/nutki/bt-keyboard-switcher
```

1. Bluetooth のインプットクライアントを無効化  

Bluettohのインプットクライアントと同時には使えないそうです。そのため、Bluetoothキーボードからの入力をサイドBluetoothキーボードとしてエミュレーションはできません。
`/lib/systemd/system/bluetooth.service` ファイルの`ExecStart=/usr/lib/bluetooth/bluetoothd` に対して `--noplugin=input`を追加します。ExecStartに対してのみ追加してください。

```bash title='/lib/systemd/system/bluetooth.service'
ExecStart=/usr/lib/bluetooth/bluetoothd --noplugin=input
```
編集後以下のコマンドを入力し、デーモンを再起動します。
```
sudo systemctl daemon-reload
sudo systemctl restart bluetooth
```

## 利用方法

以下のコマンドを入力してプログラムを起動します。

```
cd bt-keyboard-switcher
sudo ./keyboardswitcher.py
```

左CTRL+ESCcを押すと、キーボードが検出可能になります。
左CTRL+F1〜F11を押すと、ペアリングしたPCのキーボードとして動作します。ホストに戻す場合は左CTRL+F12を押します。

正常に動作しない場合は以下を確認してください。
プログラムを起動して、他のBashウィンドウから`bluetoothctl show`と入力し、classの値を確認します。

```
$ bleutoothctl show
Controller B8:27:EB:4A:D2:95 (public)
	Name: raspberrypi
	Alias: Pi Keyboard/Mouse
	Class: 0x000025c0  <= ここを確認
	Powered: yes
	Discoverable: yes
	DiscoverableTimeout: 0x000000b4
```

Classが0x00025c0以外になっている場合は、実行後に `sudo hciconfig hci0 class 0x0025C0`と入力してください。
また、ペアリングがうまく行かない場合は、`bluetoothctl`と入力後に、`advertise on`と入力してください。
ペアリング先から接続する際に、`yes`と入力してください。

このあたりの処理は、ソースコード上に記載されていますが、私の環境ではうまく動作しませんでした。
そのため、手動で対応しています。

## その他の機能

キーボードを切り替えるときに　`keyboardswitcher.py`内の150行目の`  def set_current(index):`が読み込まれます。
この処理内部に、切り替え先の機器名をI2Cディスプレイなどへ表示するロジックを記載すると今現在どの接続先につながっているかわかりやすくなります。
また、GPIOにスイッチをつけて切り替える場合は、この部分を呼び出すことで切り替えることも可能です。
