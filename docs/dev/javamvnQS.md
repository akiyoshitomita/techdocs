---
sidebar_position: 201
title: Java Maven クイックスタート
---

# Maven関連

## Mavenとは

Apacheのプロジェクトの一つで、Java関連のビルドに必要な環境を構築するための統合管理ツールです。
主にJavaのビルド環境の構築や必要なモジュールを一括ダウンロード、ソースコードのチェックなどのツールの構築や設定を一括して行えることが便利です。

[Apache Mavewn Project WEBサイト](https://maven.apache.org/)


## mavenの開始方法

ここではSDKを利用せず手作業でMavenを利用する方法を記載しています。

1. mavenのインストール
``` bash title="bash"
sudo apt install -y maven
```

2. maven プロジェクトの初め方

プロジェクトを開始する場合は、以下のコマンドを入力しウィザードに従ってプロジェクトを作成します。
``` bash title="bash" language="bash"
mvn archetype:generate
```
``` bash title="ウィザードサンプル(切り抜き)" showLineNumbers
Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): 2099:
Choose org.apache.maven.archetypes:maven-archetype-quickstart version:
8: 1.4
Choose a number: 8:
Define value for property 'groupId': jp.hogehoge.user
Define value for property 'artifactId': example-program
Define value for property 'version' 1.0-SNAPSHOT:
Define value for property 'package' : jp.hogehoge.user.package
```
    1: テンプレートの名称又は番号を指定します。  
       作成するプロジェクトに合わせて[Maven Archetypes](https://maven.apache.org/archetypes/index.html)
       から選択することが良いでしょう。
       特に意識しない場合は、デフォルトのままで良いです。  
    2: 上記で選択したテンプレートのバージョンがリスト表示から選択を行います。特に必要なければデフォルトのものを選択してください。  
    4: グループIDを指定します。  
       グループIDはプログラムを作成する組織を識別するためのもので、ドメイン名を逆順に並べたような形式を利用します。
       会社内であれば、会社のドメイン名を逆にしたものを利用したほうがよさそうです。部や課は最後にドット(.)につなげるとよいと思います。
       ※　もし詳しいルールを知っている人がいればご指摘をいただけると助かります
    5: archfactIdを指定します。  
       プロジェクトで生成されるjarのファイル名などで利用されます。主にプログラムの任意の名前としてしています。  
    6: version IDを指定します。  
       初期のままでもよいですし、開発中であれば0.0.1のように1以下にするのもありです。 リリースするごとに変更することが可能なので、とりあえずの値をしています。  
    7: パッケージ名を指定します。  
       Javaのソースコード内のPackageで利用する名称です。テンプレートのディレクトリ構成で利用されます。
       基本的には、グループID名＋archfactIdにすることが望ましいようです  

ウィザードが終了すると、ArchfactID名のディレクトリが作成されます。このディレクトリ内で、mvnコマンドを利用して各種作業を行っていきます。
mvnの設定が入っているpom.xmlもこのディレクトリ内に生成されます。

## pom.xml ファイルの構造について

maven のプロジェクトごとの設定はpom.xmlファイルに入っています。
主なタグについて説明します。

* project
  root タグです。特に変更する必要はありません。
* modelVersion
  POMの形式モデルバージョンです。4.0.0と指定されているはずです。特に変更する必要はないです。
* groupId
  グループIDです。変更しない値です
* artifactId
  Archfacet名です。変更しない値です
* version
  バージョン番号です。 変更する場合は、`mvn versions:set` > `mvn versions:commit` コマンドを利用します.
  commitをしない場合はrevertをすることで前に戻すことが可能です
* name
  プロジェクトの名称です。特に変更する必要はないです。
* url
  プロジェクトのURLを入力します。 プロジェクト専用のページがない場合は、gitのURLを入れるとよいです。
* properties
  プロジェクトのプロパティ設定の部分です。 主にコンパイラーのバージョンなどを変更できます。プラグインなどの設定もここに記入することがあります。
* dependencies
  依存関係のあるモジュールを指定する場所です。他のライブラリを利用する場合はここに追記します。

## 基本的なGIT用設定

pom.xmlファイルがあるディレクトに以下のような.gitignoreを作成し、gitの範囲外にすることをお勧めします。
``` file title=".gitignore" showLineNumbers
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup
pom.xml.next
release.properties
dependency-reduced-pom.xml
buildNumber.properties
.mvn/timing.properties
# https://github.com/takari/maven-wrapper#usage-without-binary-jar
.mvn/wrapper/maven-wrapper.jar

# Eclipse m2e generated files
# Eclipse Core
.project
# JDT-specific (Eclipse Java Development Tools)
.classpath

# private files
```
主な設定理由
    1: mavenで作成したファイルが保存されるディレクトリ  
    2-5: mvnコマンドでpom.xmlファイルを操作した場合に一時的に生成されます。一時ファイルのため除外しています。  
    6: `mvn release`コマンドを使用してアーティファクトをパッケージ化してリリースを行うときに生成されるファイルです。  
    7: shade pluginを利用した時の一時ファイルです。  
    8: build number pluginを利用したときの一時ファイルです  
=> 環境依存部分もありますが、基本的な部分を抑えたつもりです。  

