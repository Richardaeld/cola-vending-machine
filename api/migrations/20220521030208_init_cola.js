/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cola', tbl => {
        tbl.increments();
        tbl.string('name', 50)
            .notNullable();
        tbl.float('price', 8, 2)
            .notNullable();
        tbl.integer('amount')
            .notNullable();
        tbl.integer('max_amount')
            .notNullable();
        tbl.text('description')
            .notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cola');
};
