const fs = require('fs');
const path = require('path');

// Function to recursively search for files with a specific extension
function findFiles(dir, extension, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, extension, fileList);
    } else if (path.extname(file) === extension) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Find all .tsx and .jsx files
const srcDir = path.join(__dirname, 'src');
const componentFiles = findFiles(srcDir, '.tsx');

// Check for syntax issues
componentFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    // Look for unclosed parentheses, brackets, and braces
    let parenCount = 0;
    let bracketCount = 0;
    let braceCount = 0;

    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
      if (char === '[') bracketCount++;
      if (char === ']') bracketCount--;
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
    }

    if (parenCount !== 0 || bracketCount !== 0 || braceCount !== 0) {
      console.log(`Syntax issue in ${file}: unclosed symbols`);
      console.log(`Parentheses: ${parenCount}, Brackets: ${bracketCount}, Braces: ${braceCount}`);
    }

    // Check for missing parentheses after arguments in function calls
    const matches = content.match(/\w+\s*\(/g);
    if (matches) {
      matches.forEach(match => {
        const index = content.indexOf(match) + match.length;
        let nested = 1;
        let j = index;

        while (nested > 0 && j < content.length) {
          if (content[j] === '(') nested++;
          if (content[j] === ')') nested--;
          j++;
        }

        if (nested !== 0) {
          console.log(`Possible missing closing parenthesis after ${match} in ${file}`);
        }
      });
    }

  } catch (error) {
    console.error(`Error reading ${file}: ${error.message}`);
  }
});

console.log('Syntax check completed');
