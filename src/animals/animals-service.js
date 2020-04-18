const animalsService = {
    getAllAnimals(knex) {
        return knex.select('*').from('animals');
    },
    insertAnimal(knex, newAnimal) {
        return knex
            .insert(newAnimal)
            .into('animals')
            .returning('*')
            .then(rows => {
                return rows[0];
            });
    },
    getById(knex, id) {
        return knex
            .from('animals')
            .select('*')
            .where('id', id)
            .first();
    },
    deleteAnimal(knex, id) {
        return knex('animals')
            .where({ id })
            .delete();
    },
    updateAnimal(knex, id, newAnimalFields) {
        return knex('animal')
            .where({ id })
            .update(newAnimalFields);
    }
}

module.exports = animalsService;