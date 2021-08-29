module.exports = {
    'get_item_from_array': (array: any[], index: number) => {
      return array[index]
    },
    'log_item': (item: any) => {
      console.log(item)
      return item
    },
    'eachInMap': (map: any, block: any) => {
      let out = '';
      [...map.keys()].forEach((prop: string) => {
        out += block.fn({ key: prop, value: map.get(prop) })
      });
      return out;
    },
    "each": (context: any, options: any) => {
      let ret = "";
      for (var i = 0, j = context?.length | 0; i < j; i++) {
        let a = {
          item: context[i],
          _i: i
        }
        ret += options.fn(a);
      }
      return ret;
    },
    'calc': (a: number, sign: string, b: number) => {
      switch(sign) {
        case '+':
          return a + b
        case '-':
          return a - b
        case '*':
          return a * b
        case '/':
          return a / b
        default:
          throw new Error('Undefined sign in calc helper: ' + sign)
      }
    }
  }