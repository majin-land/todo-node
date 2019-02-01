const router = require('express').Router()

const { Todo, Op } = require('../models')
const { isNumber } = require('../utils/helper')

router.get('/', async (req, res, next) => {
  try {
    const where = {}
    if (req.query.status)   where.status = req.query.status
    if (req.query.value)     where.value = { [Op.iLike]: `%${req.query.name}%` }

    // http://www.sqlines.com/postgresql/limit_offset
    const limit = (req.query && req.query.limit && isNumber(req.query.limit)) ? parseInt(req.query.limit, 10) : 50
    const offset = (req.query && req.query.offset && isNumber(req.query.offset)) ? parseInt(req.query.offset, 10) : 0

    const sortBy = req.query.sortBy || 'id'
    const sortDirection = req.query.sortDirection || 'DESC'

    const order = [sortBy, sortDirection]

    const result = await Todo.findAndCountAll({ where, limit, offset, order: [order] })
    res.json({
      list: result.rows.map(todo => todo.display()),
      total: result.count,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id)
    if (!todo) throw new Error('Todo not found')
    res.json(todo.display())
  } catch (e) {
    next(e)
  }
})

// create new todo account
router.post('/', async (req, res, next) => {
  try {
    const { value, isCompleted } = req.body

    // validate request body
    if (!value) throw new Error('value is required')

    // create todo
    const todo = await Todo.create({
      value,
      isCompleted,
    })

    // return newly created todo
    res.json(todo.display())
  } catch (e) {
    next(e)
  }
})

// update todo info
router.put('/:id', async (req, res, next) => {
  try {
    const { value } = req.body

    // validate request body
    if (!value) throw new Error('value is required')

    await Todo.update(req.body, {
      fields: [
        'value',
        'isCompleted',
      ],
      where: {
        id: req.params.id,
      }
    })

    // get the new updated todo
    const todo = await Todo.findByPk(req.params.id)

    res.json(todo.display())
  } catch (e) {
    next(e)
  }
})

// delete todo
router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id)
    await todo.destroy()
    res.json({ status: 'done' })
  } catch (e) {
    next(e)
  }
})

module.exports = router
