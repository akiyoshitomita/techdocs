---
sidebar_position: 1
---

# NVIDIA CUDA 環境構築

NVIDIAのCUDA環境を構築するためにはいくつかの準備が必要になります。  
具体的には以下の順でインストールが必要です。

1. NVIDIA GPUドライバーのインストール
2. CUDA TOOLKITのインストール


:::warning
本手順書は、x86_64アーキテクチャの WSLのUbuntu上に構築することを前提として記載しています。  
ほかの環境についてはコマンドが少し異なるので注意してください
:::

## NVIDIA GPUドライバーのインストール

Windows WSLを利用する場合、Windows Updateで自動的にインストールされます。
注意が必要なのは、WSLカーネルのバージョンです。以下のコマンドが使えない場合は、WSLカーネルのバージョンアップをしましょう。

```bash title="コマンド実行イメージ"
$ nvidia-smi
Sun Nov 30 13:15:09 2025
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 575.64.01              Driver Version: 576.88         CUDA Version: 12.9     |
|-----------------------------------------+------------------------+----------------------+
```

一番上のDriver VersionとCUDA Versionが表示されることを確認します。  
ここで表示されるCUDAのバージョンは、次のステップでインストールするTool-kitとバージョンを合わせる必要があります。  
不一致の場合、プログラムを実行時に正常に動作しないことがあります。
WSL環境では、nvidia-smi.exe コマンドも入力できますが、exe版はWindows環境の状態を確認するコマンドになります。

## CUDA TOOLKITのインストール

WSLでインストールする場合、`nvidia-smi`コマンドで表示されるCUDAのバージョンと一致させる必要があります。  
もし、CUDAのバージョンを調整したい場合は、Windows用のCUDAのバージョンアップが必要になります。

以下のコマンドを入力することで、cuda toolkit 12.9をインストールします。  
cuda-toolkit-12-9の数字の部分がバージョン表記になります。環境に合わせて変更をしてください。

```bash 
wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt-get -y install cuda-toolkit-12-9
```

インストールされたツールキットは`/usr/local/cuda-12-9/`に入っています。
cuda-toolkitを利用する場合は、bashで以下のコマンドを入力してください。
```
export PATH=${PATH}:/usr/local/cuda/bin
export PATH=$LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/usr/loca/cuda/lib64
```
bashrcやprofile.dに登録しておくと便利です。 

:::warning
aptパッケージにnvidia-cuda-toolkitというものがありますが、こちらはCanonicalのaptレポジトリに登録されているものになります。どちらでも動作はしますが、インストールパスやバージョンに差異があります。
本書では、NVIDIAの公式ドキュメントに記載されている方法でインストールしています。
:::

:::note
複数のバージョンをインストールした場合、Cudaのバージョンが異なったものが関連付けれれていることがあります。
`nvcc --version`などのコマンドを利用してバージョンを確認してください。  
`/usr/lcoal/cuda` ファイルはシンボリックリンクになっています。リンクを修正することでCudaバージョンを選択可能です。

また、GPUを搭載していない環境でも、cuda-toolkitはインストールが出来ます。コンパイルをGPUなしの環境で行い、バイナリをGPUありの環境で実行するといった形で利用可能です。
:::

## 動作確認

サンプルプログラミングを作成し、CUDAプログラムが動作することを確認します。

以下のファイルを作成します。`.cu`で終わるファイル名にする必要があります。

```c title="add.cu"
#include <iostream>
#include <math.h>
 
// Kernel function to add the elements of two arrays
__global__
void add(int n, float *x, float *y)
{
 for (int i = 0; i < n; i++)
   y[i] = x[i] + y[i];
}
 
int main(void)
{
 int N = 1<<20;
 float *x, *y;
 
 // Allocate Unified Memory – accessible from CPU or GPU
 cudaMallocManaged(&x, N*sizeof(float));
 cudaMallocManaged(&y, N*sizeof(float));
 
 // initialize x and y arrays on the host
 for (int i = 0; i < N; i++) {
   x[i] = 1.0f;
   y[i] = 2.0f;
 }
 
 // Run kernel on 1M elements on the GPU
 add<<<1, 1>>>(N, x, y);
 
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

作成したファイルをnvccコマンドでコンパイルして実行します。
以下ののように入力してください。

```bash title="実行例"
$ nvcc add.cu -o add_cuda
$ ./add_cuda
Max error: 0.000000
```

正常に実行できれば、cudaプログラムが動作しています。

:::note
サンプルプログラムは、1スレッドで並列処理を行わずに実行するものです。GPU向けに最適化を行っていないものになります。
:::

:::note
CUDAとcuda-toolkitのバージョンが異なるとプログラムが異常終了することがあります。
異常終了する場合は、バージョンを揃えることで正常に動作します。
:::

参考
  [An Even Easier Introduction to CUDA](https://developer.nvidia.com/blog/even-easier-introduction-cuda/)
