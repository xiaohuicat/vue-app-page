import { defineComponent, h } from 'vue';

function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

function cutString(string, piece) {
  const index = string.indexOf(piece);

  if (index !== -1) {
    const left = string.substring(0, index); // 匹配位置之前的部分
    const right = string.substring(index + piece.length); // 匹配位置之后的部分
    return { left, right };
  } else {
    return { left: string, right: '' }; // 如果没有匹配，返回原始字符串作为left
  }
}

function templateToComponment({
  componentMap,
  template,
  props,
  events,
  mainClass = 'dyComponent'
}) {
  // 记录从props中获取数据次数
  let index = 0;
  const templates = template.split('\n');
  const vnode = [];
  templates.forEach((template) => {
    // 没有内容，不解析
    if (!template || template.trim() === '') {
      return;
    }
    // 正则匹配在{{}}里的内容
    const matchs = template.match(/\{\{(.*?)\}\}/g);
    // 没有组件，直接创建
    if (!matchs) {
      vnode.push(h('div', { class: mainClass }, template.trim()));
      return;
    }

    // 有匹配组件，逐个解析
    const children = [];
    let parseTemplate = template;
    for (let i = 0; i < matchs?.length; i++) {
      const instruction = matchs[i].slice(2, -2);
      const [componentName, params] = getComponentByInstruction(instruction);
      let componentProps = {};
      let componentEvents = {};
      let component = componentMap?.[componentName];
      const { left, right } = cutString(parseTemplate, matchs[i]);
      // 如果不存在的组件
      if (!component) {
        children.push(h('span', {}, left + componentName));
        parseTemplate = right;
        continue;
      }
      // 没有参数，需要从props中获取数据
      if (!params) {
        if (typeof props === 'function') {
          componentProps = props(index);
        } else if (Array.isArray(props) && props.length > index) {
          componentProps = props[index];
        } else if (isObject(props)) {
          componentProps = props;
        }

        index++;
      }

      // 如果有绑定事件
      if (events) {
        for (let eventName of Object.keys(events)) {
          if (typeof events[eventName] === 'function') {
            componentEvents[`on${eventName.slice(0, 1).toUpperCase() + eventName.slice(1)}`] =
              events[eventName];
          }
        }
      }

      if (left && left.trim()) {
        children.push(h('span', {}, left));
      }

      if (typeof component === 'function') {
        component = component(props);
      }

      children.push(
        h(component, {
          ...componentProps,
          ...componentEvents,
          ...params
        })
      );

      parseTemplate = right;
    }

    if (parseTemplate) {
      children.push(h('span', {}, parseTemplate));
    }

    vnode.push(h('div', { class: mainClass }, children));
  });
  // 返回组件
  return defineComponent({ render: () => vnode });
}

function getComponentByInstruction(instruction) {
  let componentName;
  let param = null;
  // 匹配()及其以内的文字
  const matchs = instruction.match(/\([^)]*\)/g);
  // 如果没有参数，返回组件名
  if (!matchs) {
    componentName = instruction;
    return [componentName, param];
  }

  // 如果有参数，解析参数
  componentName = instruction.split(matchs[0])[0];
  const paramStr = matchs[0].slice(1, -1);
  param = {};
  if (paramStr.length > 0) {
    try {
      param = JSON.parse(paramStr);
    } catch (error) {
      param.text = paramStr;
    }
  }
  return [componentName, param];
}

export { templateToComponment };
