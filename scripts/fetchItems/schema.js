const fs = require('fs');
// checkem();
getSchema();
function checkem() {
  let items = fs.readFileSync('./items2.json', 'utf8');
  let columns = [];
  items = items.split('\n');
  console.log(items.length);
  for (let i = 110000; i < items.length-1; i++) {
    console.log(i);
    Object.entries(JSON.parse(items[i])).forEach(k => {
      const r = {col: k[0], type: typeof(k[1])};
      if(columns.map(c => c.col).filter(c => c === k[0]).length === 0) {
        columns.push(r);
      }

    });
  }

  console.log(columns);
}

function getSchema() {
  const cols = [
    { col: 'id', type: 'number' },
    { col: 'description', type: 'string' },
    { col: 'name', type: 'string' },
    { col: 'icon', type: 'string' },
    { col: 'stackable', type: 'number' },
    { col: 'itemBind', type: 'number' },
    { col: 'bonusStats', type: 'object' },
    { col: 'itemSpells', type: 'object' },
    { col: 'buyPrice', type: 'number' },
    { col: 'itemClass', type: 'number' },
    { col: 'itemSubClass', type: 'number' },
    { col: 'containerSlots', type: 'number' },
    { col: 'inventoryType', type: 'number' },
    { col: 'equippable', type: 'boolean' },
    { col: 'itemLevel', type: 'number' },
    { col: 'maxCount', type: 'number' },
    { col: 'maxDurability', type: 'number' },
    { col: 'minFactionId', type: 'number' },
    { col: 'minReputation', type: 'number' },
    { col: 'quality', type: 'number' },
    { col: 'sellPrice', type: 'number' },
    { col: 'requiredSkill', type: 'number' },
    { col: 'requiredLevel', type: 'number' },
    { col: 'requiredSkillRank', type: 'number' },
    { col: 'itemSource', type: 'object' },
    { col: 'baseArmor', type: 'number' },
    { col: 'hasSockets', type: 'boolean' },
    { col: 'isAuctionable', type: 'boolean' },
    { col: 'armor', type: 'number' },
    { col: 'displayInfoId', type: 'number' },
    { col: 'nameDescription', type: 'string' },
    { col: 'nameDescriptionColor', type: 'string' },
    { col: 'upgradable', type: 'boolean' },
    { col: 'heroicTooltip', type: 'boolean' },
    { col: 'context', type: 'string' },
    { col: 'bonusLists', type: 'object' },
    { col: 'availableContexts', type: 'object' },
    { col: 'bonusSummary', type: 'object' },
    { col: 'artifactId', type: 'number' },
    { col: 'disenchantingSkillRank', type: 'number' },
    { col: 'azeriteClassPowers', type: 'object' },
    { col: 'requiredAbility', type: 'object' },
    { col: 'weaponInfo', type: 'object' },
    { col: 'itemSet', type: 'object' },
    { col: 'boundZone', type: 'object' },
    { col: 'allowableRaces', type: 'object' },
    { col: 'allowableClasses', type: 'object' }
  ];
  cols.forEach(c => {
    switch(c.type) {
      case 'object':
        c.type = 'RECORD';
        break;
      case 'number':
        c.type='INTEGER';
        break;
      case 'boolean':
        c.type='BOOL';
        break;
      default:
        c.type = c.type.toUpperCase();
    }
    console.log(`${c.col}:${c.type},`);
  })
}
