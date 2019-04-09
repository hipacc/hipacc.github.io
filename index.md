---
layout: hipacc
description: The Heterogeneous Image Processing Acceleration Framework
description: A Domain-Specific Language and Compiler for Image Processing
---

# Overview

Hipacc allows to design image processing kernels and algorithms in a domain-specific language (DSL). From this high-level description, low-level target code for GPU accelerators is generated using source-to-source translation. As back ends, the framework supports C/C++, CUDA, OpenCL, and Renderscript. There is also a fork of Hipacc that targets [FPGAs](https://github.com/hipacc/hipacc-fpga).

<img src="/assets/images/hipacc.png" alt="Hipacc" style="box-shadow: none; width: 100%; max-width: 780px; margin: 10px 0 10px 0;" />

Hipacc allows programmers to develop imaging applications while providing high productivity, flexibility and portability as well as competitive performance: the same algorithm description serves as basis for targeting different GPU accelerators and low-level languages.


# Example: Linear Filters

The LinearFilter class shown below can be instantiated with a given filter mask. This will specialize the class for the filter mask such that optimized implementations emerge from the same high-level description. Examples for this filter class are the Gaussian blur filter, the Laplace operator, or the Sobel operator.

<pre class='brush: hipacc; gutter: false'>
class LinearFilter : public Kernel&lt;uchar4> {
  private:
    Accessor&lt;uchar4> &input;
    Mask&lt;float> &mask;

  public:
    LinearFilter(IterationSpace&lt;uchar4> &iter,
                 Accessor&lt;uchar4> &input,
                 Mask&lt;float> &mask)
        : Kernel(iter), input(input), mask(mask) {
      add_accessor(&input);
    }

    void kernel() {
      float4 sum =
          convolve(mask, Reduce::SUM, [&] () -> float4 {
            return mask() * convert_float4(input(mask));
          });
      output() = convert_uchar4(sum + 0.5f);
    }
};
</pre>


# Authors

The developers of Hipacc are Richard Membarth (@richardmembarth), Oliver Reiche (@oreiche), Mehmet Akif Özkan (@akifoezkan), and Bo Qiao (@qiao-bo).


# Publications

### Main Publications

_Richard Membarth, Oliver Reiche, Frank Hannig, Jürgen Teich, Mario Körner, and Wieland Eckert_  
[HIPA<sup>cc</sup>: A Domain-Specific Language and Compiler for Image Processing](https://graphics.cg.uni-saarland.de/papers/membarth-2016-tpds.pdf)  
In Transactions on Parallel and Distributed Systems (TPDS), 27(1), pp. 210-224, 2016.

_Oliver Reiche, Mehmet Akif Özkan, Richard Membarth, Jürgen Teich, and Frank Hannig_  
[Generating FPGA-based Image Processing Accelerators with Hipacc](https://www12.cs.fau.de/downloads/reiche/publications/ROMTH17.pdf)  
In Proceedings of the International Conference on Computer Aided Design (ICCAD), pp. 1026-1033, Irvine, CA, USA, November 13–16, 2017. Invited Paper.

### Selected Publications

_Oliver Reiche, Christof Kobylko, Frank Hannig, and Jürgen Teich_  
[Auto-vectorization for Image Processing DSLs](https://www12.cs.fau.de/downloads/reiche/autovec)  
In Proceedings of the 18th International Conference on Languages, Compilers, Tools, and Theory for Embedded Systems (LCTES), pp. 21-30, Barcelona, Spain, June 21-22, 2017.

_Mehmet Akif Özkan, Oliver Reiche, Frank Hannig, and Jürgen Teich_  
[FPGA-Based Accelerator Design from a Domain-Specific Language](https://www12.cs.fau.de/downloads/oezkan/publications/fpl16.pdf)  
In Proceedings of the 26th International Conference on Field-Programmable Logic and Applications (FPL), pp. 1-9, Lausanne, Switzerland, August 29-September 2, 2016.

_Oliver Reiche, Moritz Schmid, Frank Hannig, Richard Membarth, and Jürgen Teich_  
[Code Generation from a Domain-specific Language for C-based HLS of Hardware Accelerators](https://www12.cs.fau.de/downloads/reiche/publications/RSHMT14.pdf)  
In Proceedings of the International Conference on Hardware/Software Codesign and System Synthesis (CODES+ISSS), pp. 17:1-17:10, New Delhi, India, October 12-17, 2014.

_Richard Membarth, Oliver Reiche, Frank Hannig, and Jürgen Teich_  
[Code Generation for Embedded Heterogeneous Architectures on Android](https://www12.cs.fau.de/publications/membarth/membarth2014cga.pdf)  
In Proceedings of the Conference on Design, Automation and Test in Europe (DATE), pp. 86:1-86:6, Dresden, Germany, March 24-28, 2014.

_Richard Membarth_  
[Code Generation for GPU Accelerators from a Domain-Specific Language for Medical Imaging](https://www.dr.hut-verlag.de/978-3-8439-1074-3.html)  
Dissertation, University of Erlangen-Nuremberg, pp. 1-215, ISBN 978-3-8439-1074-3, Verlag Dr. Hut, Munich, Germany, May 2, 2013.

_Richard Membarth, Frank Hannig, Jürgen Teich, Mario Körner, and Wieland Eckert_  
[Generating Device-specific GPU Code for Local Operators in Medical Imaging](https://www12.cs.fau.de/publications/membarth/membarth2012gdg.pdf)  
In Proceedings of the 26th IEEE International Parallel & Distributed Processing Symposium (IPDPS), pp. 569-581, Shanghai, China, May 21-25, 2012.

### Overview Poster

<img src="/assets/images/hipacc_gtc_poster.png" alt="Hipacc" style="width:100%;"/>

_Richard Membarth and Oliver Reiche_  
[HIPA<sup>cc</sup>: A Domain-Specific Language and Compiler for Image Processing](http://on-demand.gputechconf.com/gtc/2014/poster/pdf/P4120_domain_compilation_image_processing.pdf)  
Poster Presentation at the GPU Technology Conference (GTC), San Jose, CA, USA, March 24-27, 2014.
