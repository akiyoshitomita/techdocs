---
sidebar_position: 102
---

# OSS terraformを利用してsshconfigファイルを書き換える方法

クラウドサービでは、事業者側が用意したマネージメントツールを利用して管理アクセスを行うことが一般的になっていますが、
レガシーな手法としてまだまだsshを利用する環境もまだまだ残っています。
このような環境下でterraformにより、AWS インスタンスやAzure VMなどへsshを行う設定を同時に行い方法を紹介します。  
ここで紹介する方法は terraform コマンドを実行したローカル環境に対してのみ有効なため、複数環境への共有をしたい場合についてはここでは解説していませんが
Ansible/Chef/puppetといったオートメーションツールを併用することをおすすめします。

## 動作原理と注意事項

terraformの`local_file`リソースを利用して実行PC/Serverの設定ファイルを上書きを行います。ただし、terraformのlocal_fileは部分変更ができないので
ssh のInclude命令のように設定内容を複数のファイルに分割して設定できるものに限ります。
terraform destroyで削除すると設定ファイルごと削除されます。
この原理を利用することで、sshのみではなくAnsibleのinventoryなど他の設定への反映も可能です。

(注意事項)  
  terraform applyを実行したPC/Serverしか設定ファイルが書き換わりません。特に、backendの設定でlocal以外を利用している環境では注意が必要です。

## sshconfigの事前準備

sshconfigファイルは、各ユーザごとの設定である`~/.ssh/config `ファイルと全ユーザ共通の`/etc/ssh/ssh_config`の2箇所に保存されています。
用途に合わせてどちらも利用可能ですが、今回は`~/.ssh/config`をベースに手順を記載します。

terraformで直接上書きを行うこともできますが、ファイル競合や必要な設定内情が消えてしまう可能性があるのでIncludeでterraform管理用の設定と
もともとの設定を分けます。
以下の設定を追加することで、terraform管理下の設定ファイルを読み込む方法に切り替えます。

``` title="~/.ssh/config"
Include ./terraform/*.conf
```

設定を行ったら、ディレクトリを作成します。
``` bash
mkdir -p ~/.ssh/terraform
```

## .tfファイルの記載方法

terraformで利用するのは`local_file` リソースとtemplate functionを利用します。

* tftpfファイルの作成し、ssh configのテンプレートを作成する。

``` terraform title="sshconfig.tftpl"
Host ${ssh.hostname}
  HostName ${ssh.ipaddress}
  User ${ssh.user}
```

* tfファイル内に、sshconfigファイルを作成するリソースを記載します。

``` terraform tile="sshconf.tf"
resource "local_file" "ssh_config" {
  filename = "~/.ssh/terraform/${var.hostname}.conf"
  content  = templatefile("sshconfig.tftpl", {
               ssh = { 
                 "hostname"  = var.hostname 
                 "ipaddress" = aws_instance.server1.private_ip
                 "user"      = var.default_user
               }
             })
}
```

上記例では、ホスト名は 変数 hostnameに入っており、ipアドレスは AWSインスタンスのprivate IPを指定しています。ログインユーザ名は変数default_userに入れています。
このあたりの変数の調整はお好みに合わせて行ってください。

