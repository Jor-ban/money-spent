export function parseMoney(str: string | number): string {
  str = String(str).replaceAll(' ', '')
  const splitted = str.split('.')
  const float = splitted[1]
  str = splitted[0]
  let newStr = ''
  for (let i = 1; i < str.length + 1; i++) {
    const digit = str[str.length - i]
    newStr = digit + newStr
    newStr = i % 3 == 0 && i != str.length ? ' ' + newStr : newStr
  }
  return newStr + (float ? '.' + float : '')
}
