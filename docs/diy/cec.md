---
sidebar_position: 1
---

# HDMI-CEC プログラミング

Raspberry Piの機能の一つであるHDMI-CECを利用してTVを操作することについて記載します。  
PC用のビデオカードの大半はCECが利用できないので注意してください。

## HDMI-CECとは

HDMIで接続した機器を１つのリモコンで操作するための通信規格で(Consumer Electronics Control)の略です。  
人がリモコンで操作することを前提に作られているためか、他の機器を操作することは細かく設定できますが、機器の情報を収集する機能は弱いです。  
TVのON／OFF程度の情報は取得できますが、ボリュームの大きさや今見ている番組を取得することは出来ないと考えたほうが良いです。  
またパソコンにHDMIポートがついていても、この機能を使うことが出来ないことが多いので注意が必要です。  
対応していない場合は、CECアダプタを接続する必要があります。  
今回の記事は、Raspberry Piを前提に記載しています。

CECの対応状況は、HDMI機器を見ればわかりますが、各社独自の名称を付けているので注意が必要です。
多くの製品は、○○リンクのような名称が多いです。

## libcec ライブラリについて

[libcec](https://libcec.pulse-eight.com/)はPulse-Eight社(英国)が公開しているc++用のCECライブラリです。
付属でpython用のパッケージやコマンドラインから操作可能なcec-clientのようなツールも付属しています。
記事では付属のpython用のcecパケージを利用しています。

### インストール

apt用のパッケージもありますが、aptからpython用ライブラリが廃止されたなど使い勝手が悪いため、ソースからインストールする手順を記載しています。

* コンパイルに必要なパッケージのインストール
```bash
sudo apt-get update
sudo apt-get -y install cmake libudev-dev libxrandr-dev python3-dev swig git
```

* Pulese Eight platformのインストール
libcecのcmake内部で利用するライブラリで、gitからcloneしインストールします。
```bash
git clone https://github.com/Pulse-Eight/platform.git
mkdir platform/build
cd platform/build
cmake ..
make
sudo make install
cd ../..
```

:::note
中身は開発環境用のライブラリです。変更がほとんど行われていないため、gitのlatestでのインストール手順で記載しています。
もし、エラーが出る場合はgitでタグ付きのバージョンまでチェックアウトしてください。
:::

* libcecのインストール
[https://github.com/Pulse-Eight/libcec/releases](https://github.com/Pulse-Eight/libcec/releases)から、最新のsource code(tar.gz)をダウンロードしておきます。

```bash
tar xfz libcec-7.1.1.tar.gz
mkdir libcec-libcec-7.1.1/build
cd libcec-libcec-7.1.1/build
cmake  -DHAVE_LINUX_API=1 -DHAVE_RPI_API=0 ..
make -j4
sudo make install
sudo ldconfig
```

:::note
cmakeのオプション`-DHAVE_LINUX_API=1'と'-DHAVE_RPI_API=0'はvc4_kms_3dを利用中のraspberry用です。  
起動オプションで無効化している場合は、必要ありません。
:::

## pythonでlibcecを利用する。

プログラミングの大まかな流れは。

1. 自デバイス(raspberry pi)に割り当てるCECデバイス情報を設定する。
2. 自デバイスのHDMI-CECに対応したアダプタを探す
3. CEC機能を初期化して、通信を行う

libcecのpython ライブラリを読み込む場合は、`import cec`と指定します。
cecライブラリの設定は、cec.libcec_configuration() クラスで行います。

```python
import cec

cecconfig = cec.libcec_configuration()
```

### 自デバイスの設定

ここでは「デバイスの種類」「デバイスの名前」「デバイスのバージョン」などのデバイスの設定を行います。
デバイスの種類の設定は必須なので必ず変更する必要があります。

```python
cecconfig.strDeviceName = "raspberrypi"
cecconfig.bActivateSource = 0
cecconfig.deviceTypes.Add(cec.CEC_DEVICE_TYPE_RECORDING_DEVICE)
cecconfig.clientVersion = cec.LIBCEC_VERSION_CURRENT
```

setDeviceName  
デバイスの名称を設定します。

bActivateSource  
テレビの出力を強制的に切り替えさせる信号を送る場合は1をそれ以外は0に設定します。
通常は0設定で問題ありません。

deviceTypes  
libcecには`CEC_DEVICE_TYPE_TV`,`CEC_DEVICE_TYPE_RECORDING_DEVICE`,`CEC_DEVICE_TYPE_RESERVED`,
` CEC_DEVICE_TYPE_TUNER`,`CEC_DEVICE_TYPE_PLAYBACK_DEVICE`,`CEC_DEVICE_TYPE_AUDIO_SYSTEM`の
6種類のデバイスがあり、自デバイスの種類を登録します。通常は、１種類だけの登録で問題ありません。

clientVersion  
CECのバージョン番号を設定します。特に必要がなければ、ceclibのバージョンを使いましょう。

### CECアダプターの検索

CECアダプターを検索する方法を記載します。Debian 13ではアダプタは`/dev/cecX`といった名称で認識していますが、
名称が変更された場合やマルチアダプタを利用しているときに、プログラムから検索できるため組み込んでおくことで便利になります。
comNameにアダプタ名を入力サンプルを以下に記載します。

```python
ceclib = cec.ICECAdapter.Create(cecconfig)
adapters = ceclib.DetectAdapters()
comName = None

for adapter in adapters:
  comName = adapter.comName    
```

cec.ICECAdapter.Create(cecconfig)でceclibを初期化します。
そのご、`DetectAdapters()`で、CECをサポートしているアダプター一覧を取得します。
adapter情報は、`strComName`にポート名が入っています。他には以下のプロパティがあります。

`iFirmwareBuildDate` ファームウェアのビルド日時  
`iFirmwareVersion` ファームウェアのバージョン  
`iPhysicalAddress` CECアダプターのアドレス
`iProductId` プロダクトID  
`iVenderId` ベンダーID  
`strComPath` アダプターのPATH
`adapterType` アダプターの種別。私の環境では`ADAPTERTYPE_LINUX(1024)`で認識していました。`ADAPTERTYPE_RPI(256)`もライブラリには登録されているので環境によって応答が違うと思います。

### CECを初期化とメッセージ送信

ceclibを初期化して、スタンバイメッセージを送る方法を記載します。

```
ceclib = cec.ICECAdapter.Create(cecconfig)
if ceclib.Open('/dev/cec0'):
    ceclib.StandbyDevices(cec.CECDEVICE_BROADCAST)
```

OpenでCECデバイスとの通信を開始します。オープンに失敗した場合は、Falseを返します。  
StandbyDevicesはスタンバイ信号を贈ります。cec.CECDEVICE_BROADCASTでHDMIでつながっている全ての機器に送っています。TVのみを指定する場合は、cec.CECDEVICE_TVを指定します。

## ceclibで低レベル双方向通信

ceclibの低レベル通信は非同期で行われ、`Transmit()`メソッドでパケットを送ります。コマンドを受信した場合は`SetCommandCallback()`で設定されたコールバック関数が呼び出されます。

* Transmit()の利用方法
CECコマンドを:区切りの16進数の文字列からdata形式に変換します。
変換したものをTransmitで送信することでメッセージを送ります。
メッセージの形式は後述します。
```
cmd = ceclib.CommandFromString("10:8F")
ceclib.Transmit(cmd)
```

* SetCommandCallback()の利用方法
コールバック関数を定義します。コールバック関数の第一引数にコマンドの文字列が入ります。
文字列は、1~2文字目が送受信方向を指し`>>`が受信`<<`が送信を表します。
3文字目にはスペースが入っており、4文字目以降に:区切りの16進数でCECコマンドが入ります。
```
def command(cmd):
    if cmd[:2] == ">>":
        print(cmd[:3])

cecconfig.SetCommandCallback(command)
ceclib = cec.ICECAdapter.Create(cecconfig)
```

* CECコマンドの表記について
CECコマンドは、[https://www.cec-o-matic.com/](https://www.cec-o-matic.com/)で確認が出来ます。
:区切りの16進数で表記され、初めの4ビットが送信元機器のアドレス、次の４ビットが送信先の機器のアドレス、次の８ビットが命令、命令のオプションの順に続きます。
長さは2バイト以上になります。

アドレスは16種類ありますが、利用するものは以下の４つ程度だと思います。  
0: TV  
1: レコーダー1台目  
5: オーディオ機器(スピーカー)  
f: ブロードキャスト(全ての機器)  

## サンプルプログラム TVの電源確認(低レベルAPI)

```python
import cec
import time

cecconfig = cec.libcec_configuration()
cecconfig.strDeviceName = "raspberrypi"
cecconfig.bActivateSource = 0
cecconfig.deviceTypes.Add(cec.CEC_DEVICE_TYPE_RECORDING_DEVICE)
cecconfig.clientVersion = cec.LIBCEC_VERSION_CURRENT

def command(cmd):
    if cmd[:2] == ">>":
        if cmd[3:8] == "01:90":
            if cmd[9:] == "00":
                print("TVの電源が入っています")
            elif cmd[10:] == "01":
                print("TVの電源はスタンバイです")


cecconfig.SetCommandCallback(command)

ceclib = cec.ICECAdapter.Create(cecconfig)
ceclib.Open('/dev/cec0')

# 電源の確認を行う
cmd = ceclib.CommandFromString("10:8F")
ceclib.Transmit(cmd)
time.sleep(10)
```

## リモコン操作で使うコマンド

リモコンコマンドを送るのはUser Control Pressed(44)を送信することで操作を行います。  
例えば、TVのボリュームを上げる場合は `10:44:41` 下げる場合は`10:44:42`とコマンドを送ります。

詳しいマッピングは[https://www.cec-o-matic.com/](https://www.cec-o-matic.com/)を参照してください。（リクエストがあれば、日本語で一覧を作成します。)
