---
sidebar_position: 902
---

# CUDA 利用実験1 GIS計算例

ここでは、CUDAを利用したプログラミングに適した事例を記載していきます。

## 距離計算

ここでは簡単な3平方の定理を利用した距離計算をGPUに計算させる例を記載します。

点をgisPoint型に定義し、緯度(lat)と経度(lon)をfloat型で表しています。
fromPointが起点となり、toPointsの点列までの距離を計算し、len配列へ代入します。
nは配列の個数で、toとlenはn以上の配列である必要があります。

```cuda title="point_length.cu" showLineNumbers
typedef struct {
        float lat;
        float lon;
} gisPoint;

__global__
void ppLen(int n, gisPoint fromPoint, gisPoint *toPoints, float *len){
        int index = blockIdx.x * blockDim.x + threadIdx.x;
        int stride = blockDim.x + gridDim.x;
        for (int i = index; i < n; i += stride){
                len[i] = sqrtf(
                                powf(fromPoint.lat - toPoints[i].lat, 2) +
                                powf(fromPoint.lon - toPoints[i].lon, 2)
                                );
        }
}
```

:::warning
三平方の定理を利用した単純な距離計算であるため、実際の地理としての計算誤差は大きいものです。
日本国内の緯度であれば誤差は小さいので比較的簡単な大小比較等で利用するには十分な精度を得られることが多いので載せています。精度を求める場合は、求める精度に従い最適な計算方法で評価してください。
:::
