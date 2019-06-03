/**
 * 从KV集合中获取指定ID的value
 * @param {array} _list
 * @param {int} _id
 */
export function getValueFromKVs(_list, _id) {
  let obj = {};
  obj = _list.find(item => {
    return item.id === _id;
  });
  return obj.value;
}



/**
 * 是否是合法的下标
 * @param {int} index 
 */
export const isInvlidIndex = function (index) {
  if (isInvlidData(index) && index > -1) {
    return true;
  } else {
    return false;
  }
}
/**
 * 是否是合法的数据，不为undefined或者null
 * @param {int} data 
 */
export const isInvlidData = function (data) {
  if (typeof (data) != "undefined" && data != null) {
    return true;
  } else {
    return false;
  }
}

/**
 * 删除某一个数组内的对象， 返回数组对象
 * @param {array} _arr
 * @param {object} _obj
 */
export function removeObjFromArr(_arr, _obj) {
  var length = _arr.length;
  for (var i = 0; i < length; i++) {
    if (JSON.stringify(_arr[i]) == JSON.stringify(_obj)) {
      if (i == 0) {
        _arr.shift();
        return _arr;
      } else if (i == length - 1) {
        _arr.pop();
        return _arr;
      } else {
        _arr.splice(i, 1);
        return _arr;
      }
    }
  }
}

/**
 * 删除某一个数组内的对象， 返回数组对象
 * @param {array} _arr
 * @param {int} _index
 */
export function removeFromArr(_arr, _index) {
  _arr.splice(_index, 1);
  return _arr;
}

/**
 * 判断数组中是否存在指定属性的对象
 * @param {array} _arr 
 * @param {string} _propName 
 * @param {string} _prop
 */
export function existInArrWithProp(_arr, _propName, _prop) {
  let isExist = false;
  var length = _arr.length;
  for (var i = 0; i < length; i++) {
    if (_arr[i][_propName] && _arr[i][_propName] == _prop) {
      isExist = true;
    }
  }
  return isExist;
}

/**
 * 判断数组中是否存在
 * @param {array} _arr 
 * @param {object} _obj 
 */
export function existInArr(_arr, _obj) {
  let isExist = false;
  var length = _arr.length;
  for (var i = 0; i < length; i++) {
    if (JSON.stringify(_arr[i]) == JSON.stringify(_obj)) {
      isExist = true;
    }
  }
  return isExist;
}

/**
 * 获取某个下拉菜单的value数值
 * @param {array} _list
 * @param {int} id
 */
export function getValueFromList(_list, id) {
  return getPropFromList(_list, id, "value");
}

/**
 * 获取某个集合的特定对象的特定属性
 * @param {array} _list 
 * @param {int} id 
 * @param {string} propName 
 */
export function getPropFromList(_list, id, propName) {
  let obj = {};
  obj = _list.find(item => {
    return item.id === id;
  });
  if (obj) {
    return obj[propName];
  }
  return null;
}

/**
 * 获取题干
 * @param {string} _content
 */
export function getStemFromContent(_content) {
  let stem = "";
  if (_content) {
    try {
      let obj = JSON.parse(_content);
      stem = obj.stem;
    } catch (e) {
      console.log(_content);
      console.log(e);
    }
  }

  return stem;
}

/**
 * 时间转换
 * @param {date} time
 * @param {string} cFormat
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  if (time === null) {
    return "-";
  }

  if ((time + "").length === 10) {
    time = +time * 1000;
  }

  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    date = new Date(parseInt(time));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a") {
      return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

/**
 * 数组中删除一个对象，并返回下标
 * @param {array} _arr
 * @param {object} _obj
 */
export function arrRemoveLists(_arr, _obj) {
  var length = _arr.length;
  for (var i = 0; i < length; i++) {
    if (JSON.stringify(_arr[i]) == JSON.stringify(_obj)) {
      if (i == 0) {
        _arr.shift(); //删除并返回数组的第一个元素
        return i;
      } else if (i == length - 1) {
        _arr.pop(); //删除并返回数组的最后一个元素
        return i;
      } else {
        _arr.splice(i, 1); //删除下标为i的元素
        return i;
      }
    } else {
      console.log(_obj + "row");
    }
  }
  return -1;
}
