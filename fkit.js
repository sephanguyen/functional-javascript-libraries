const F = require('fkit');
const people = require('./people.json');
// #region Supporting
console.log('\n'.repeat(250));
let out = 'no output';
// #endregion

const filterEq = F.curry((propName, propVal, data) =>
  F.filter(
    F.compose(
      F.eq(propVal),
      F.get(propName)
    ),
    data
  )
);

const filterNEq = F.curry((propName, propVal, data) =>
  F.filter(
    F.compose(
      F.neq(propVal),
      F.get(propName)
    ),
    data
  )
);

const married = filterEq('married', true);
const unmarried = filterEq('married', false);
const women = filterEq('gender', 'Female');
const men = filterEq('gender', 'Male');
const withoutDnaTest = filterEq('dnaTestId', '');
const withDnaTest = filterNEq('dnaTestId', '');

out = withDnaTest(people);

//sort
const sortByProp = propName =>
  F.sortBy(
    (a, b) =>
      a[propName] > b[propName] ? 1 : a[propName] < b[propName] ? -1 : 0
  );
const sortByPropDesc = propName =>
  F.sortBy(
    (a, b) =>
      a[propName] > b[propName] ? -1 : a[propName] < b[propName] ? 1 : 0
  );
out = sortByPropDesc('married')(people);

const marriedByAge = F.compose(
  sortByProp('age'),
  married
);
const menWithDnaTest = F.compose(
  men,
  withDnaTest
);
const marriedMenWithDnaTestByAge = F.compose(
  sortByProp('age'),
  withDnaTest,
  married,
  men
);
out = marriedMenWithDnaTestByAge(people);

const allBirthPlaces = F.map(itm => itm.birthplace);
out = allBirthPlaces(people);

const allBirthPlacesOrDefault = F.compose(
  F.map(val => (val ? val : '(not specified)')),
  allBirthPlaces
);

out = allBirthPlacesOrDefault(people);

const uniques = F.curry(F.nubBy((a, b) => a === b));
const uniquePropVals = F.curry((fn, data) => uniques(fn(data)));

const uniquePlaces = uniquePropVals(allBirthPlacesOrDefault);
const isSpecified = val => val !== '(not specified)';
const placeList = F.compose(
  F.filter(isSpecified),
  uniquePlaces
);
out = placeList(people);

const allMotherIds = F.map(val => F.getIn(['family', 'motherId'], val));
out = allMotherIds(people);

const allMotherIdsOrDefault = F.compose(
  F.map(val => (val ? val : '(not specified)')),
  allMotherIds
);
out = allMotherIdsOrDefault(people);

// #region Supporting
console.log(out);
console.log('\r\n\r\nNumRecords: ', typeof out === 'string' ? 1 : out.length);

console.log(' ');
console.log('____________________________');

// #endregion
