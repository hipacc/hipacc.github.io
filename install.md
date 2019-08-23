---
layout: hipacc
description: Getting Started
---

# Binary Packages

Binary releases of Hipacc can be found [here](https://github.com/hipacc/hipacc/releases).


# Requirements

HIPA<sup>cc</sup> is a source-to-source compiler based on Clang/LLVM. To build HIPA<sup>cc</sup> from source, either the development package of Clang/LLVM and libc++ is required, or the corresponding components from the Clang/LLVM have to be installed manually:

* [llvm](https://llvm.org)
* [clang](https://clang.llvm.org)
* [compiler-rt](https://compiler-rt.llvm.org)
* [libc++](https://libcxx.llvm.org)
* [libc++abi](https://libcxxabi.llvm.org) (on GNU/Linux when using Clang as target compiler)
* [polly](https://polly.llvm.org) (optional)

HIPA<sup>cc</sup> works only with the release version of Clang/LLVM listed in [dependencies.sh](https://github.com/hipacc/hipacc/blob/master/dependencies.sh), which corresponds to the current Clang/LLVM 8.0 release version.


# Installation

The build system of HIPA<sup>cc</sup> uses CMake (3.4.3 or later), Git (2.7 or later) and requires installation to an absolute path:
```bash
cd hipacc
mkdir build && cd build
cmake ../ -DCMAKE_INSTALL_PREFIX=`pwd`/release
make && make install
```

Detailed install instructions for GNU/Linux, macOS, and Windows can be found in the repository's [INSTALL.md](https://github.com/hipacc/hipacc/blob/master/INSTALL.md) file.


# First Run

After building and installing HIPA<sup>cc</sup> successfully, you are ready to use HIPA<sup>cc</sup>. To verify that everything is working, generate and execute a program using HIPA<sup>cc</sup>. Go to your installation directory and change to the sample directory of the application you want to build. Call make cuda. This translates the source file into a version that runs on the GPU using CUDA and executes it. Similarly, the same program can be translated to OpenCL for different device types (opencl-acc, opencl-cpu, opencl-gpu) as well as standard C++ code (cpu). For execution on Android, Renderscript (renderscript) and Filterscript (filterscript) code can be generated.
```bash
cd hipacc/build/release
cd samples/0_Point_Operators/Color_Conversion
make cuda
```

For execution on Android devices, the generated binary is configured to store data in /data/local/tmp. The same directory can be used for the binary itself:
```bash
adb shell mkdir -p /data/local/tmp
adb push main_renderscript /data/local/tmp
adb shell /data/local/tmp/main_renderscript
```
