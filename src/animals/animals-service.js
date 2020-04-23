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

        },
        getNamesByAnimalId(knex, animal_id){
        // The names table has a foreign key 'animalsid' 
        // We use that to find all the names for that animal
            return knex
                .from('names')
                .select('*')
                .where('animalsid', animal_id)
    }
}

module.exports = animalsService;