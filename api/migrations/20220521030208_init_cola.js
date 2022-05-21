/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cola', tbl => {
        tbl.increments();
        tbl.string('name', 50)
            .notNullable;
        tbl.float('price')
            .notNullable;
        tbl.integer('amount')
            .notNullable;
        tbl.integer('max_amount')
            .notNullable;
        tbl.string('description')
            .notNullable;
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cola');
};
