const pool = require('../utils/pool');

module.exports = class Monster {
  id;
  species;
  category;

  constructor(row) {
    this.id = row.id;
    this.species = row.species;
    this.category = row.category;
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            monsters
      `
    );

    return rows.map((row) => new Monster(row));
  }
};
