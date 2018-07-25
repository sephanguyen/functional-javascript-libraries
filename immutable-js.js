const I = require('immutable');
const people = require('./people.json');
// #region Supporting
console.log('\n'.repeat(250));
let out = 'no value';

out = I.List(['a', 'b']);
out = I.Map({ a: 'b', c: 123 });
out = I.Map({ a: 'b', c: { d: 123 } });
// const iPeople = I.List(people);
const iPeople = I.fromJS(people);
out = iPeople;
out = iPeople.first();
out = iPeople.first().get('surname', '(none)');
out = iPeople.first().getIn(['family', 'fatherId'], '(none)');

const filterEq = (propName, propVal) => data =>
  data.filter(itm => itm.get(propName) === propVal);

out = filterEq('married', true)(iPeople);

const married = filterEq('married', true);
const withoutDnaTest = filterEq('dnaTestId', '');
out = married(iPeople);

const filterPathEq = (propPath, propVal) => data =>
  data.filter(itm => itm.getIn(propPath) === propVal);

const fatherIds = id => filterPathEq(['family', 'fatherId'], id);
const fatherIds2 = fatherIds(2);
out = fatherIds2(iPeople);

const idx = iPeople.findIndex(
  (value, index, object) =>
    value.has('family') ? value.getIn(['family', 'fatherId']) === 2 : false
);

const iPeople2 =
  //idx === -1 ? iPeople : iPeople.setIn([idx, 'family', 'fatherId'], 321);
  idx === -1
    ? iPeople
    : iPeople.updateIn([idx, 'family', 'fatherId'], val => val + 319);
out = fatherIds2(iPeople2);
out = fatherIds2(iPeople);
const fatherIdIs321 = fatherIds(321);
out = fatherIdIs321(iPeople2);
console.log(out);
console.log('____________________________');

// #endregion
