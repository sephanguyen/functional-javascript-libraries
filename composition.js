const people = require('./people.json');
// #region Supporting
console.log('\n'.repeat(250));
//#endregion

const filterEq = (prop, value, arr) => {
  return arr.filter(elem => {
    return elem[prop] === value;
  });
};

const filterNEq = (prop, value, arr) => {
  return arr.filter(elem => {
    return elem[prop] !== value;
  });
};

const compose = (...funcs) => {
  return data => {
    return funcs.reduceRight((value, func) => {
      return func(value);
    }, data);
  };
};

// const filterMarried = arr => filterEq('married', true, arr);
// const filterSingle = arr => filterEq('married', false, arr);
// const filterWomen = arr => filterEq('gender', 'Female', arr);
// const filterMen = arr => filterNEq('gender', 'Female', arr);

// const marriedWomen = compose(
//   filterMarried,
//   filterWomen
// );
// const marriedMen = compose(
//   filterMarried,
//   filterMen
// );

// const singleWomen = compose(
//   filterSingle,
//   filterWomen
// );

// const singleMen = compose(
//   filterSingle,
//   filterMen
// );

const isMarried = (value, arr) => filterEq('married', value, arr);

const married = arr => isMarried(true, people);
const single = arr => isMarried(false, people);

const out = single(people);

// #region Supporting
console.log(out);
console.log('\r\n\r\nNumRecords: ', out.length);
console.log(' ');
console.log('_____________________________________');
//#endregion
