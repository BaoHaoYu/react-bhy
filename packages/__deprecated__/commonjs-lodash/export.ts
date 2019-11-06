import fse from 'fs-extra'
import global from 'globby'
import path from 'path'

const names = global
  .sync(path.join('../../node_modules', '@types\\lodash\\fp\\*.d.ts'))
  .map((filePath) => {
    return path.basename(filePath).replace('.d.ts', '')
  })
  .filter((name) => {
    return (
      name !== 'noConflict' &&
      name !== 'runInContext' &&
      name !== 'fp' &&
      name !== 'index' &&
      name !== 'mixin' &&
      name !== '__'
    )
  })

const imports = names.map((name) => {
  return `import ${name} from 'lodash/fp/${name}'`
})

const external = `[\n${names
  .map((name) => `"lodash/fp/${name}"`)
  .join(',\n')}\n]`

const exportsStr = `export {\n ${names.join(',\n')} \n}`
const importStr = imports.join('\n')
fse.writeFileSync(
  path.join(__dirname, './src/index.ts'),
  importStr + '\n' + exportsStr,
)

fse.writeFileSync(path.join(__dirname, './external.json'), external)
