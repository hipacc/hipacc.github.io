### HIPAcc - The Heterogeneous Image Processing Acceleration Framework
HIPAcc allows to design image processing kernels and algorithms in a domain-specific language (DSL). From this high-level description, low-level target code for GPU accelerators is generated using source-to-source translation. As back ends, the framework supports CUDA, OpenCL, and Renderscript.

HIPAcc allows programmers to develop imaging applications while providing high productivity, flexibility and portability as well as competitive performance: the same algorithm description serves as basis for targeting different GPU accelerators and low-level languages. 

```
class GaussianFilter : public Kernel<float> {
  private:
    Accessor<float> &Input;
    const int size_x, size_y;

  public:
    GaussianFilter(IterationSpace<float> &IS, Accessor<float> &Input, const int size_x, const int size_y) :
      Kernel(IS),
      Input(Input),
      size_x(size_x),
      size_y(size_y)
    { addAccessor(&Input); }

    void kernel() {
      const int ax = size_x >> 1;
      const int ay = size_y >> 1;
      float sum = 0;

      for (int yf = -ay; yf<=ay; yf++) {
        for (int xf = -ax; xf<=ax; xf++) {
          float gauss_constant = expf(-1.0f*((xf*xf)/(2.0f*size_x*size_x) + (yf*yf)/(2.0f*size_y*size_y)));
          sum += gauss_constant*Input(xf, yf);
        }
      }
      output() = sum;
    }
};
```

### Authors and Contributors
The main developers of HIPAcc are Richard Membarth (@richardmembarth) and Oliver Reiche (@oreiche).
