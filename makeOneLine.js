const CODE = `

// Put flowAutoSave function to format as one-line bookmarklet code

`;

const makeOneLineCode = (code: string) =>
  `javascript:(()=>{${code.replace(/\s+/g, ' ').trim()}})();`;

console.log(makeOneLineCode(CODE));
