export const lightFn = (str, target) => {
  const reg = new RegExp(target, "ig");

  return str.replace(reg, (match) => {
    // match是关键字匹配的值(尽量保持原样)
    return `<span style="color: blue">${match}</span>`;
  });
};
