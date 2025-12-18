const fs = require('fs');

const content = fs.readFileSync('./migrations/V001__add_all_tables.sql', 'utf-8');

const reservedKeywords = new Set(['order', 'user', 'group', 'key', 'type', 'comment', 'default', 'table', 'column']);

function quoteReservedKeywords(content, reservedKeywords) {
  let processed = content;
  for (const keyword of reservedKeywords) {
    const pattern = new RegExp(
      `(^|[\\t ])${keyword}(\\s+(?:int|varchar|character|text|bool|float|numeric|serial|bigint|smallint|timestamp|date|time|uuid|json|int2|int4|int8)[^,)\\n]*)`,
      'gim'
    );
    const before = processed;
    processed = processed.replace(pattern, `$1"${keyword}"$2`);
    if (before !== processed) {
      // Find what was changed
      const match = before.match(pattern);
      if (match) {
        console.log('Keyword', keyword, 'was quoted. Match:', JSON.stringify(match[0].substring(0, 100)));
      }
    }
  }
  return processed;
}

const result = quoteReservedKeywords(content, reservedKeywords);

// Check for any "default" in the result
const defaultMatches = result.match(/"default"/gi);
if (defaultMatches) {
  console.log('\nFound', defaultMatches.length, '"default" occurrences in result');

  // Find the lines with "default"
  const lines = result.split('\n');
  lines.forEach((line, i) => {
    if (line.toLowerCase().includes('"default"')) {
      console.log(`Line ${i + 1}: ${line}`);
    }
  });
}
