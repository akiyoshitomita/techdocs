---
sidebar_position: 101
---
# SSH クライアントの動作

## .ssh/known_hostsファイルについて

SSHサーバの公開鍵情報を保存します。
基本的にSSHの初回接続時に自動生成され、万が一サーバのすり替え等が発生した場合に不要な接続を防ぐことができます。

ファイルの中身はテキストファイルのリスト形式になっています。不注意に編集すると壊れる恐れがあるため編集することはお勧めしません。
リストは１行に、`ホスト名|IPアドレス 暗号アルゴリズム 公開鍵`のようにスペース区切りで保存されています。

ホスト名/IPアドレスは、ssh_configファイル(~/.ssh/config, /etc/ssh/ssh_config) の`HashKnownHosts`設定によりハッシュ化されます。
`HashKnownHosts`がyesに指定した場合のみハッシュ化されます。

### .ssh/known_hostsファイルのオペレーション

#### エントリーの登録

1. SSH 初回接続時

SSH 初回接続時に、以下のようなメッセージが表示されます。
例の2行目に fingerprintが表示されています。これは接続先のサーバ固有のフィンガープリントを表示しています。
この値が正しいかを確認し、一致している場合はyes又はfingerprintの値を入力、一致していない場合は正しいサーバに接続していないのでnoと入力し切断します。
正しい場合のみ、サーバの公開鍵がknown_hostsファイルに保存されます。(※ 表示されていない公開鍵も同時に登録されます。)

``` showLineNumbers
$ ssh github.com
The authenticity of host 'github.com (20.27.177.113)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU
```

(参考) 
githubのSSHキーのフィンガープリントはWEBで確認できます。
https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints

Ubuntuサーバの場合、以下のコマンドを入力することで確認ができます。
```
for i in /etc/ssh/ssh_host_*.pub; do ssh-keygen -l -f $i; done
```

#### 登録済みエントリーの削除

サーバを廃止した時やサーバの公開鍵を変更した際は、`ssh-keygen -R`コマンドで対象のホスト名で削除します。

(注意)
ssh_config でHost指定している場合はHostNameの値を入力する必要があります

```
ssh-keygen -R (ホスト名|IPアドレス)
```
 
#### 登録済みのエントリーを探す場合

サーバが登録されているか確認する場合、`ssh-keygen -F`コマンドで検索を行います。
`-l` オプションを付けるとFingerprintが表示されます。

```
ssh-keygen -F (ホスト名|IPアドレス)
```

#### 接続先の公開鍵を調べたい場合

SSHサーバから公開加賀を取得する場合は `ssh-keyscan`コマンドで調べることが可能です。
```
ssh-keyscan (ホスト名|IPアドレス)
```

fingerprintを調べる場合は、結果をファイルに保存し `ssh-keygen -l -F`コマンドを利用します。
```
ssh-keyscan (ホスト名|IPアドレス) > /tmp/ssh_pub.txt 2> /dev/null
ssh-keygen -l -F /tmp/ssh_pub.txt
rm /tmp/ssh_pub.txt
```
