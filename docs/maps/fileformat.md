---
sidebar_position: 501
---

# GIS系ファイルについて

GISでよく利用されるファイルについて紹介します。

## OSMフォーマット(.osm)

XML形式で保存されている地図データ。
Open Street Mapの標準の地図形式です。

## PBFフォーマット(.pbf)

Protocolbuffer Binary Formatの略で、OSMのデータをバイナリ形式に変更したもの。
バイナリに圧縮しているため、OSM形式より容量が小さい。OSMフォーマットと互換があり、多くの場所で利用される。

## osmChangeフォーマット(.osc)

OSMの変更差分を記録する形式です。
OSMのアップデート差分を反映するときなどに利用します。

## o5mフォーマット(.o5m)/o5cフォーマット(.o5c)

PBFフォーマットよりOSMフォーマットに互換性を持たせたものです。
o5cは、osmファイルの内容を記述するものです。

# ファイルフォーマットの変換方法

osmconvertを利用して変換が可能です。

## osmconvertのインストール方法

Ubuntuでは、aptを利用してインストールが可能です。

```
sudo apt install osmctools
```

## PBFからOSMへの変換

osmconveertコマンドを利用します。

```
osmconvert japan.pbf -o=japan.osm
```

変換元をファイルはそのまま読み込みます。出力先ファイルを-oオプションを利用して指定します。
※　ファイル名の拡張子部分で自動的に判断して変換が行われます。出力ファイル名には注意してください。
