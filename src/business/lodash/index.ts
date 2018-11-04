/**
 * @name: business-simple-lodash 类lodash库
 * @author: yyg
 * @version 1.0.1
 */


namespace lodash {

  export namespace _Utils {
    export function _isArray(obj: any): boolean {
      return Array.isArray(obj);
    }
  }

  export namespace _Array {
    /**
     * 创建一个元素数组，将元素分成大小的长度。如果数组无法均匀分割，
     * 则最终的块将是剩余的元素。
     * @param arr 数组
     * @param size 分成的块
     * @returns 新的数组
     */
    export function chunk(arr: any[], size: number = 1): any[] {
      if (!_Utils._isArray(arr) || arr.length === 0) {
        return [];
      }
      const newArr: any[] = [];
      let i: number = -1;

      while (++i < arr.length) {
        i % size === 0
          && newArr.push(arr.slice(i, i + size));
      }

      return newArr;
    }

    /**
     * 创建一个删除了所有'false'值的数组
     * @param arr 数组
     */
    export function compact(arr: any[]) {
      return arr.filter((v: any) => v);
    }

    /**
     * 使用任何其他数组和/或值创建一个新数组连接数组。
     * @param arr 源数组
     * @param args concatenate值
     */
    export function concat(arr: any[], ...args: any[]): any[] {
      return arr.concat(...args);
    }
  
    /**
     * 创建一个未包含在其他给定数组中的数组值数组
     * @param arr 源数组
     * @param args 要排除的值
     */
    export function difference(arr: any[], ...args: any[]): any[] {
      return arr
        .map((v: any) => !args.includes(v) && v)
        .filter((v: any) => v);
    }

    /**
     * 创建一个数组切片，其中n个元素从头开始删除。
     * @param arr 源数组
     * @param size 切片长度
     * @returns size位置到数组末的值数组
     */
    export function drop(arr: any[], size: number = 1): any[] {
      return arr.slice(size);
    }
    

    /**
     * 创建一个数组切片，其中包含从末尾删除的n个元素。
     * @param arr 源数组
     * @param size 切片长度
     */
    export function dropRight(arr: any[], size: number = 1): any[] {
      return arr.slice(0, arr.length - size);
    }
  }

}

// console.log(lodash._Array.chunk([1, 2, 3, 4], 1));
// console.log(lodash._Array.compact([false, undefined, null, NaN]))
// console.log(lodash._Array.concat([2], false, {name: 'duan'}, [2]));
// console.log(lodash._Array.difference([{name: 'duan'}]));
// console.log(lodash._Array.drop([2, 3, 4, 6], 3));
console.log(lodash._Array.dropRight([2, 3, 4, 5], 2));