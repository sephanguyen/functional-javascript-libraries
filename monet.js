const M = require('monet');
const people = require('./people.json');

// #region Supporting
console.log('\n'.repeat(250));
let out = 'no output';

const newPerson1 = {
  givenNames: ['Kyle'],
  surname: 'Josephs',
  age: 24,
  gender: 'Male',
  married: false,
  living: true,
  dnaTestId: '904aa549-243d-430d-9465-09a2a9b1058a',
  family: {
    motherId: 5,
    fatherId: 9,
    siblings: []
  }
};
const newPerson2 = {
  givenNames: ['Catherine'],
  surname: 'Frances',
  age: 22,
  gender: 'Female',
  married: false,
  living: true,
  dnaTestId: '957bf8d3-bbad-4dd1-bd8a-c96995a22712',
  family: {
    motherId: 5,
    fatherId: 9,
    siblings: []
  }
};
const newPerson3 = {
  givenNames: ['David'],
  surname: 'Sung',
  age: 17,
  gender: 'Male',
  married: false,
  living: true,
  dnaTestId: ''
};

// #endregion

// ---------Immutable List--------------
//     [  1,   [  2,  [ 3,    Nil  ]]];
//                     head |-tail-
//               head |-------tail---
//      head   | ---------tail--------
//creating
const ppList = M.List.fromArray(people);
out = ppList.toArray();
out = new M.List();
// #region Supporting

//filter
const filterEq = M.curry((propName, propVal, list) =>
  list.filter(itm => itm[propName] === propVal)
);
const married = filterEq('married', true);
out = married(ppList).toArray();

const consList = ppList.cons(newPerson1);
out = consList.toArray();
//append
const appList = ppList.append(M.List.fromArray([newPerson2, newPerson3]));
out = appList.toArray();

//head
out = ppList.head();
//head maybe

out = M.List.fromArray([])
  .headMaybe()
  .orSome('Oops');

out = M.List.fromArray([]).headMaybe();
out = consList.headMaybe().some();

// ----------Non-Empty-List-------------------------
//never undefined
//out = M.NEL(undefined)
out = M.NEL([]);
out = M.NEL([]).head();
out = M.NEL(ppList.head(), ppList.tail());

const nil = M.Nil;
const head = [];
const nel = M.NEL(head, nil);

console.log(out);
console.log('\r\n\r\nNumRecords: ', out && out['length'] ? out.length : 0);
console.log(' ');
console.log('____________________________');

// #endregion
