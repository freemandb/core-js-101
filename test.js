function chainPromises(array, action) {
  return new Promise((resolve) => {
    let count = array.length;
    const retVals = new Array(array.length).fill(null);
    array.map((item, ind) => {
      item.then((value) => {
        retVals[ind] = value;
        count -= 1;
        if (count === 0) {
          resolve(retVals.filter((el) => el !== null).reduce((prev, cur) => {
            if (prev === undefined) {
              return cur;
            }
            if (cur === null) {
              return prev;
            }
            return action(prev, cur);
          }, undefined));
        }
      }).catch(() => {
        count -= 1;
        if (count === 0) {
          resolve(retVals.filter((el) => el !== null).reduce((prev, cur) => {
            if (prev === undefined) {
              return cur;
            }
            if (cur === null) {
              return prev;
            }
            return action(prev, cur);
          }, undefined));
        }
      });
      return item;
    });
  });
}

const lorem = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
const promises = lorem.split(' ').map((item) => new Promise((resolve) => resolve(item)));

const arrayForPromise = new Array(10).fill(0).map((_, idx) => idx);
const result2 = chainPromises(arrayForPromise.map((item) => (item % 2
  ? Promise.resolve(item)
  : Promise.reject(Error(`Predictable Rejection ${item}`)))),
(a, b) => a - b);

// chainPromises(promises, (a, b) => `${a} ${b}`).then((val) => console.log(val));
result2.then((val) => console.log(val));
// console.log(chainPromises.toString());
