export function generateId(prefix: string = 'a') {
  const id = 'XXXXXXXX'.replace(/X/g, () => {
    const val = (Math.random() * 16) | 0;
    return val.toString(16);
  });
  return `${prefix}${id}`;
}
