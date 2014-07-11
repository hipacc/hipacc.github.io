SyntaxHighlighter.brushes.Hipacc = function()
{
  /* Inherit regex list from brush cpp */
	this.regexList = (new SyntaxHighlighter.brushes.Cpp()).regexList;

  /* Define HIPAcc datatypes, keywords and functions */
  var datatypes = 'uchar4 ushort4 uint4 char4 short4 int4 float4 double4';

  var keywords = 'Kernel Accessor IterationSpace Image Mask Domain' +
          'BoundaryCondition output convolve iterate reduce HipaccSUM' +
          'HipaccMIN HipaccMAX HipaccPROD HipaccMEDIAN';

  var functions = 'convert_uchar4 convert_ushort4 convert_uint4 convert_char4' +
          'convert_short4 convert_int4 convert_float4 convert_double4';

  this.regexList.push(
    { regex: new RegExp(this.getKeywords(datatypes), 'gm'),		css: 'color1 bold' },
    { regex: new RegExp(this.getKeywords(functions), 'gm'),		css: 'functions bold' },
    { regex: new RegExp(this.getKeywords(keywords), 'gm'),		css: 'color2 bold' }
  );
};

SyntaxHighlighter.brushes.Hipacc.prototype	= new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Hipacc.aliases	= ['hipacc'];
