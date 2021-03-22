// where we write our knex queries
const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

async function add(lesson) {
    const [id] = await db('lessons').insert(lesson)
    return id
}

function find() {
    return db('lessons')
}

module.exports = { 
    add, 
    find
}