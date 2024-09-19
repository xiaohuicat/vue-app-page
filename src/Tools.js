import { tips } from './Tips';

/**
 * 跳转页面
 * @param {String} url 跳转的url
 * @returns {void}
 */
function goToUrl(url) {
  if (url == '' || url == '#' || url == undefined) {
    return;
  } else if (url.indexOf('[hard]') > -1) {
    url = url.replace('[hard]', '');
    document.location.href = url;
  } else {
    if (this?.router) {
      this.router.push({ path: url });
    } else {
      document.location.href = url;
    }
  }
}

/**
 * 复制文本
 * @param {String} text 文本内容
 * @returns {Promise<void>}
 */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    tips('复制成功', 'success');
    /* Resolved - 文本被成功复制到剪贴板 */
  } catch (err) {
    /* Rejected - 文本未被复制到剪贴板 */
    let result = await navigator.permissions.query({ name: 'write-on-clipboard' });
    if (result.state == 'granted' || result.state == 'prompt') {
      tips('没有权限', 'fail');
    } else {
      tips('复制失败', 'fail');
    }
  }
}

/**
 * 下载文件
 * @param {String} data 文件数据
 * @param {String} filename 文件名
 * @param {String} type 文件类型
 * @returns {void}
 */
function downloadFileByData(data, filename, type) {
  var file = new Blob([data], { type: type });

  if (window.navigator.msSaveOrOpenBlob) {
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    // Others
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

/**
 * 下载文件
 * @param {String} url 文件路径
 * @param {String} filename 文件名
 * @returns {void}
 */
function downloadFileByUrl(url, filename) {
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

export default {
  downloadFileByData,
  downloadFileByUrl,
  copyText,
  goToUrl
};
