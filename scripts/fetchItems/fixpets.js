const fs = require('fs');
const fileDataString = fs.readFileSync('./item_classes.json', 'utf8');
const petsStringArray = [];
const pets = JSON.parse(fileDataString);
console.log(pets.classes.length);
pets.classes.forEach(p => {
  petsStringArray.push(JSON.stringify(p));
});
fs.writeFileSync('./item_classes.fixed.json', petsStringArray.join('\n'));
