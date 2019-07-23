import fse from 'fs-extra'
import global from 'globby'
import path from 'path'
const str = ''
const names = global
  .sync(path.join('../../node_modules', '@types\\lodash\\ts3.1\\*.d.ts'))
  .map((filePath) => {
    return path.basename(filePath).replace('.d.ts', '')
  })

const imports = names.map((name) => {
  return `import ${name} from 'lodash/${name}'`
})

const external = `[\n${names.map((name) => `"lodash/${name}"`).join(',\n')}\n]`

const exportsStr = `export {\n ${names.join(',\n')} \n}`
const importStr = imports.join('\n')
fse.writeFileSync(
  path.join(__dirname, './src/index.ts'),
  importStr + '\n' + exportsStr,
)

fse.writeFileSync(path.join(__dirname, './external.json'), external)
