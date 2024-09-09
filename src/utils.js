function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

function getObjectProperty(obj, key, default_value) {
  const keys = key.split('.');
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    if (current[keys[i]] === undefined) {
      return default_value;
    }
    current = current[keys[i]];
  }

  return current;
}

function setObjectProperty(obj, key, value) {
  const keys = key.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const keyPart = keys[i];
    const nextKeyPart = keys[i + 1];

    // 判断下一个路径部分是否为数字（表示数组索引）
    const isNextKeyPartArrayIndex = !isNaN(nextKeyPart);

    if (isNextKeyPartArrayIndex) {
      if (!Array.isArray(current[keyPart])) {
        current[keyPart] = []; // 如果还不是数组，则初始化为数组
      }
    } else {
      if (typeof current[keyPart] !== 'object' || current[keyPart] === null) {
        current[keyPart] = {}; // 初始化为对象
      }
    }

    current = current[keyPart];
  }

  // 设置最终的值
  const finalKeyPart = keys[keys.length - 1];
  current[finalKeyPart] = value;

  return obj;
}

/**
 * 合法字符串
 * @param {*} string
 */
function verifiedString(string) {
  return typeof string === 'string' && string.trim() !== '';
}

/**
 * 判断两个数组是否等值
 * @param {Array} arr1 元素是基本类型
 * @param {Array} arr2 元素是基本类型
 * @returns
 */
function isEqualValueArray(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const set = new Set([...set1, ...set2]);
  return set.size === set1.size && set.size === set2.size;
}

export { isObject, getObjectProperty, setObjectProperty, verifiedString, isEqualValueArray };
