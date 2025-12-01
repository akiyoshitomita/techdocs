---
sidebar_position: 201
---

# WSL2

Windows上でLinuxを利用可能になるWSL(Windows Subsystem for Linux)を利用方法について記載します。

## WSL2のインストール

Windowsのコマンドプロンプトを開きコマンドからWSLをインストールします。
インストール後にWindowsを再起動します

``` cmd title='windows cmd'
> wsl --intall
```

オンラインインストール可能なLinuxディストリビューション一覧を取得します。

``` cmd title='windows cmd'
> wsl -l -o
インストールできる有効なディストリビューションの一覧を次に示します。
'wsl.exe --install <Distro>' を使用してインストールします。

NAME                            FRIENDLY NAME
AlmaLinux-8                     AlmaLinux OS 8
AlmaLinux-9                     AlmaLinux OS 9
AlmaLinux-Kitten-10             AlmaLinux OS Kitten 10
Debian                          Debian GNU/Linux
SUSE-Linux-Enterprise-15-SP5    SUSE Linux Enterprise 15 SP5
SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
Ubuntu                          Ubuntu
Ubuntu-24.04                    Ubuntu 24.04 LTS
kali-linux                      Kali Linux Rolling
openSUSE-Tumbleweed             openSUSE Tumbleweed
openSUSE-Leap-15.6              openSUSE Leap 15.6
Ubuntu-18.04                    Ubuntu 18.04 LTS
Ubuntu-20.04                    Ubuntu 20.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
OracleLinux_7_9                 Oracle Linux 7.9
OracleLinux_8_7                 Oracle Linux 8.7
OracleLinux_9_1                 Oracle Linux 9.1
```

デストリビューション名を指定して、Ubuntuをインスト－ル

`--install`オプションの後の名称は、オンライン上のLinuxディストリビューションのNAMEそ指定します。`--name`オプション名の値はローカルWindows上で管理上の名前です。複数のイメージを利用する場合に固有の名称をつけます

``` cmd title='windows cmd'
> wsl --install Ubuntu-24.04 --name main_ubuntu
```

## WSLの基本動作

WSLはWindowsのカーネルと共有していますが、動作としては仮想マシンのように個別に起動と停止が可能です。

### 起動 

起動する場合は、`wsl -d (名前) `を指定することで起動します。
既に起動している場合は、shellにログインします。
-d オプションを省略すると規定のイメージが起動します。

```
> wsl -d main_ubuntu
```

### 起動確認

`wsl -l -v`コマンドを入力することで、管理しているイメージの一覧と稼働状況が表示されます。

```
> wsl -l -v
  NAME          STATE           VERSION
* main_buntu    Running  
```

### 停止

wslを停止する場合は、`wsl --shutdown`コマンドを入力します。すべてのwslが停止するので注意してください。個別に停止する方法はありません。

```
> wsl --shutdown
```

### 削除

必要がなくなったwslイメージを削除するさいは`wsl --unregister (名前)`と入力します。
`--terminate`オプションでも削除はできますが、root volume(仮想ディスク)ファイルが残るので注意が必要です。

```
> wsl --unregister
```

### WSLのアップグレード

WSLは、WSL本体、Linux用のカーネルなど複数のコンポーネントで構成されています。
これらをアップグレードするためには `wsl --update`コマンドを入力します。
アップグレードを確認するために、作業前と作業後に`wsl --version`コマンドを利用して確認をすることをおすすめします。

```example title="Update実行例" 
PS C:\> wsl --version
WSL バージョン: 2.4.12.0
カーネル バージョン: 5.15.167.4-1
WSLg バージョン: 1.0.65
MSRDC バージョン: 1.2.5716
Direct3D バージョン: 1.611.1-81528511
DXCore バージョン: 10.0.26100.1-240331-1435.ge-release
Windows バージョン: 10.0.26200.6899
PS C:\> wsl --update
更新プログラムを確認しています。
Linux 用 Windows サブシステムをバージョンに更新しています: 2.6.1。
PS C:\> wsl --update
更新プログラムを確認しています。
Linux 用 Windows サブシステムをバージョンに更新しています: 2.6.1。
PS C:\> wsl --version
WSL バージョン: 2.6.1.0
カーネル バージョン: 6.6.87.2-1
WSLg バージョン: 1.0.66
MSRDC バージョン: 1.2.6353
Direct3D バージョン: 1.611.1-81528511
DXCore バージョン: 10.0.26100.1-240331-1435.ge-release
Windows バージョン: 10.0.26200.6899
```

:::info
アップデートされるのは、WSL・Linuxカーネル・WSLg(GUI機能)・MSRDC(リモートデスクトップクライアント)です。
:::

:::note
複数のディストリビューションを使っている場合でもLinuxカーネルはWindows側で１つになります。動作としてはコンテナのようにカーネルを共有しているようなイメージなります。
:::

:::warning
`wsl --update`に`--pre-release`オプションがありますが、利用はおすすめいたしません。このオプションは早期プレリリース版をインストールするので、動作が不安定になる可能性をはらんでいるためです。WSL自体のテスト目的や、どうしてお必要な機能がプレリリース版にしか、存在しない場合など特殊なケースを除き利用しないことが無難です。
:::
