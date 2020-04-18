const NamesService = {
    getAllNames(knex) {
        return knex.select('*').from('names')
    },
    insertName(knex, newName) {
        return knex
            .insert(newName)
            .into('names')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex
            .from('names')
            .select('*')
            .where('id', id)
            .first()
    },
    deleteName(knex, id) {
        return knex('names')
            .where({ id })
            .delete()
    },
    updateName(knex, id, newNameFields) {
        return knex('names')
            .where({ id })
            .update(newNameields)
    },
        

}

module.exports = NamesService