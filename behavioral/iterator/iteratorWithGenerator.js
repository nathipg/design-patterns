class RowIterator {
  constructor(collection, reverse) {
    this.data = collection.data;
    this.reverse = reverse;
  }

  *[Symbol.iterator] () {
    const rows = this.reverse ? Object.keys(this.data).reverse() : Object.keys(this.data);
      
    for(const row of rows) {
      const cols = this.reverse ? Object.keys(this.data[row]).reverse() : Object.keys(this.data[row]);
      
      for(const col of cols) {
        yield this.data[row][col];
      }
    }
  }
}

class ColIterator {
  constructor(collection, reverse) {
    this.data = collection.data;
    this.reverse = reverse;
  }

  *[Symbol.iterator] () {
    const cols = this.reverse ? Object.keys(this.data[0]).reverse() : Object.keys(this.data[0]);

    for(const col of cols) {
      const rows = this.reverse ? Object.keys(this.data).reverse() : Object.keys(this.data);

      for(const row of rows) {
        yield this.data[row][col];
      }
    }
  }
}

class Map {
  constructor(data) {
    this.data = data;
  }

  getRowIterator() {
    return new RowIterator(this);
  }

  getReverseRowIterator() {
    return new RowIterator(this, true);
  }

  getColIterator() {
    return new ColIterator(this);
  }

  getReverseColIterator() {
    return new ColIterator(this, true);
  }
}

const map = new Map({
  0: {
    0: '0-0',
    1: '0-1',
    2: '0-2',
  },
  1: {
    0: '1-0',
    1: '1-1',
    2: '1-2',
  },
  2: {
    0: '2-0',
    1: '2-1',
    2: '2-2',
  }
});

const iterators = [
  {
    name: 'Row Iterator',
    func: map.getRowIterator(),
  },
  {
    name: 'Reverse Row Iterator',
    func: map.getReverseRowIterator(),
  },
  {
    name: 'Col Iterator',
    func: map.getColIterator(),
  },
  {
    name: 'Reverse Col Iterator',
    func: map.getReverseColIterator(),
  },
];

for(const iterator of iterators) {
  console.log(iterator.name);

  for(const item of iterator.func) {
    console.log(item);
  }
}
