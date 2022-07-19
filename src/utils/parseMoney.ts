export function parseMoney(str: string | number): string {
  str = String(str)
  const float = str.split('.')[1]
  str = str.split('.')[0]
  let newStr = ''
  for (let i = 1; i < str.length + 1; i++) {
    const digit = str[str.length - i]
    newStr = digit + newStr
    newStr = i % 3 == 0 && i != str.length ? ' ' + newStr : newStr
  }
  return newStr + (float ? '.' + float : '')
}
