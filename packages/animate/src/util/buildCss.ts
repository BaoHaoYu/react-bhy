export default function buildCss (css: string, value: any) {
  return {
    ['webkit' + css]: value,
    ['moz' + css]: value,
    ['ms' + css]: value,
    ['o' + css]: value,
    [css]: value
  }
}
