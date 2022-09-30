class RowIterator {
  constructor(collection, reverse = false) {
    this.map = collection.data;
    this.reverse = reverse;

    this.reset(reverse);
  }

  next() {
    if(!this.hasMore()) {
      return undefined;
    }

    const currentItem = this.map[this.row][this.col];
    const cols = Object.keys(this.map[this.row]).length;

    if(this.reverse) {
      if(this.col === 0) {
        this.col = cols - 1;
        this.row--;
      } else {
        this.col--;
      }
    } else {
      if(this.col >= cols - 1) {
        this.col = 0;
        this.row++;
      } else {
        this.col++;
      }
    }

    return currentItem;
  }

  hasMore() {
    return this.map.hasOwnProperty(this.row) && this.map[this.row].hasOwnProperty(this.col);
  }

  reset(reverse) {
    if(reverse) {
      const lastRow = Object.keys(this.map).length - 1;
      const lastCol = Object.keys(this.map[lastRow]).length -1;

      this.row = lastRow;
      this.col = lastCol;
    } else {
      this.row = 0;
      this.col = 0;
    }
  }
}

class ColIterator {
  constructor(collection, reverse = false) {
    this.map = collection.data;
    this.reverse = reverse;

    this.reset(reverse);
  }

  next() {
    if(!this.hasMore()) {
      return undefined;
    }

    const currentItem = this.map[this.row][this.col];
    const rows = Object.keys(this.map).length;

    if(this.reverse) {
      if(this.row === 0) {
        this.row = rows - 1;
        this.col--;
      } else {
        this.row--;
      }
    } else {
      if(this.row >= rows - 1) {
        this.row = 0;
        this.col++;
      } else {
        this.row++;
      }
    }

    return currentItem;
  }

  hasMore() {
    return this.map.hasOwnProperty(this.row) && this.map[this.row].hasOwnProperty(this.col);
  }

  reset(reverse) {
    if(reverse) {
      const lastRow = Object.keys(this.map).length - 1;
      const lastCol = Object.keys(this.map[lastRow]).length -1;

      this.row = lastRow;
      this.col = lastCol;
    } else {
      this.row = 0;
      this.col = 0;
    }
  }
}

class Map {
  constructor(data = {}) {
    this.data = data;
  }

  add(row, col, value) {
    this.data[row][col] = value;
  }

  getItems() {
    return this.data;
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
  },
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
  while(iterator.func.hasMore()) {
    console.log(iterator.func.next());
  }
}
