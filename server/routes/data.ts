import KoaRouter from 'koa-router'
import _ from 'lodash'

const router = new KoaRouter()

router.prefix('/data')

export function sleep (time: number) {
  return new Promise((r) => {
    setTimeout(() => {
      r()
    }, time)
  })
}

/**
 * 列表1
 */
router.get('/listFood.json', (ctx, next) => {
  ctx.body = {
    code: 0,
    data: [
      {
        name: '苹果',
        id: '1'
      },
      {
        name: '梨子',
        id: '2'
      },
      {
        name: '火龙果',
        id: '3'
      }
    ]
  }
})

/**
 * 列表2
 */
router.get('/listPeople.json', (ctx, next) => {
  ctx.body = {
    code: 0,
    data: [
      {
        name: '小明',
        id: '1'
      },
      {
        name: '小红',
        id: '2'
      },
      {
        name: '小光',
        id: '3'
      }
    ]
  }
})

/**
 * 列表3
 */
router.get('/listHehe.json', async (ctx, next) => {
  await sleep(1000)
  ctx.body = {
    code: 0,
    data: [
      {
        name: '哈哈-' + _.random(1, 100),
        id: '1'
      },
      {
        name: '呵呵-' + _.random(1, 100),
        id: '2'
      },
      {
        name: '拉拉-' + _.random(1, 100),
        id: '3'
      }
    ]
  }
})
/**
 * 列表3
 */
router.get('/hasError.json', async (ctx, next) => {
  ctx.response.status = 500
  ctx.body = {
    code: 1,
    data: []
  }
})
export default router
