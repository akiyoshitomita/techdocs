---
sidebar_position: 2
---

# C++によるCUDA Quick Start ガイド

C++を利用したCUDAプログラミングの始め方について解説します。
CUDAに関する説明はあとで行うため、Hallo Worldのような感じで、まずは動かす方法を紹介しています。  
CUDAの概要などは、別章で解説します。

## 本章の前提条件

CUDAの環境をインストール済みであることを前提としています。  
WSL2へのインストールは「[NVIDIA CUDA 環境構築](environment)」を参照してインストールしてください。

## ソースコードの記載ルール

CUDAのコースコードファイルは、`.cu`で終わるようにして記載します。  
基本的な記載方法はC++言語と同じですが、一部CUDA特有の記述があります。

以下に単純な行列の足し算を行うプログラムを記載します。
このコードを、テキストエディタでペーストして`add.cu`に保存します。

プログラムコードの内容は、約100万個(2の20乗個)のxとy配列同士の足し算をおこないます。
xにはすべて1がyにはすべて2が入っており、x+yの答えをyの配列に上書きをします。  
要は(1+2)を計算し3をyに入れます。
最後にCPUで答えが3からどの程度ズレがあるか確認した結果を表示します。

```cuda title="add.cu" showLineNumbers {22-23,32,35,45-46}
#include <iostream>
#include <math.h>
 
// Kernel function to add the elements of two arrays
__global__
void add(int n, float *x, float *y)
{
  int index = blockIdx.x * blockDim.x + threadIdx.x;
  int stride = blockDim.x * gridDim.x;
  for (int i = index; i < n; i += stride)
    y[i] = x[i] + y[i];
}
 
int main(void)
{
  int N = 1<<20;
  float *x, *y;
  int blockSize = 256;
  int numBlocks = (N + blockSize - 1) / blockSize;
 
  // Allocate Unified Memory – accessible from CPU or GPU
  cudaMallocManaged(&x, N*sizeof(float));
  cudaMallocManaged(&y, N*sizeof(float));
 
  // initialize x and y arrays on the host
  for (int i = 0; i < N; i++) {
    x[i] = 1.0f;
    y[i] = 2.0f;
  }
 
  // Run kernel on 1M elements on the GPU
  add<<<numBlocks, blockSize>>>(N, x, y);
 
  // Wait for GPU to finish before accessing on host
  cudaDeviceSynchronize();
 
  // Check for errors (all values should be 3.0f)
  float maxError = 0.0f;
  for (int i = 0; i < N; i++) {
    maxError = fmax(maxError, fabs(y[i]-3.0f));
  }
  std::cout << "Max error: " << maxError << std::endl;
 
  // Free memory
  cudaFree(x);
  cudaFree(y);
  return 0;
}
```

作成したファイルのディレクトリで、`nvcc`コマンドを以下のように実行します。
```bash
nvcc add.cu -o add_cuda
```

nvccは、cuda用のc++コンパイラです。 引数add.cuはソースコードを指定します。  
-o オプションで実行ファイルのファイル名を指定します。 
オプションを省略した場合は`a.out`とういう実行ファイルが出来ます。

:::note
ここで生成される実行ファイルは、Linux用の実行ファイルです。  
出力されたファイルを実行することで、Linuxのプロセスとして動作しますが、システムコールを通じて
GPUへ命令を出します。
:::

`add_cuda`というファイルができるので、実行します

```
./add_cuda
```

## プログラム簡易説明

* cudaMallocManaged
```cuda showLineNumbers=22 {1-2}
  cudaMallocManaged(&x, N*sizeof(float));
  cudaMallocManaged(&y, N*sizeof(float));
```
`cudaMallocManaged()`は、CPUから操作可能なGPUメモリであるUnified Memoryを確保します。
引数には、確保したときのポインタ、確保するメモリのサイズ(byte)を指定します。
上記例では戻り値を意識していませんが、エラーコードを戻します。正常時は0(cudaSuccess)を返し、エラー時はそれ以外を返します。
確保したメモリは後述の`cudaFree()`で開放する必要があります。

* cudaFree
```cuda showLineNumbers=45 {1-2}
  cudaFree(x);
  cudaFree(y);
```
`cudaFree()`は、確保したGPUメモリを開放します。
引数には確保したときのポインタ医を入力します。
サンプルプログラムではUnified Memoryを開放していますが、ほかのメモリ領域の開放でも利用されます。

* 三重角括弧構文 \<\<\< \>\>\>
```cuda showLineNumbers=32 {1}
 add<<<numBlocks, blockSize>>>(N, x, y);
```

三重角括弧`<<<...>>>`を付けた関数呼び出しは、関数の中身をGPUで計算するときの命令です。
この命令が事項されると、GPUへシステム命令が出されGPUで計算が非同期で始まります。
非同期処理のため、プログラムはGPU計算が終了せずに先に進んでいきます。
呼ばれる関数は`__global__`が指定されている必要があります。  
三重角括弧の中は2~4つの引数を指定しますが、本章では2つの引数の場合を説明します。  
第一引数は、ブロック数を指定します。GPUで並列計算を行う場合、複数ブロックに分けて計算を行います。  
GPU内部の並列処理が１回で終わらない場合、ブロックごとにスケジュールを行い順次処理を行います。
複数ブロックが同時に処理できる場合は同時に処理されます。  
第二引数は、ブロック内のスレッド数を指定します。ブロック内のスレッドは自動実行され、同じロジックで計算が行われます。
基本的にはSM内部のCUDAコア数の倍数に指定することで最大のパフォーマンスを得ることが出来ますが、よほどの理由がない限り256の推奨値を利用します。  
丸括弧`()`の中身は関数の引数を指定します。

* cudaDeviceSynchronize
```cuda showLineNumber=35 {1}
  cudaDeviceSynchronize();
```
`cudaDeviceSynchronize()`は三重角括弧を使ったGPU関数が終了するまで待ちます。
この命令を行わず結果を取得しようとすれば、計算が終わっていない不定値を参照してしまう可能性があります。


