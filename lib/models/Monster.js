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

  static async insert({ species, category }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
       monsters (species, category)
    VALUES
       ($1, $2)
    RETURNING
      *
    `,
      [species, category]
    );

    return new Monster(rows[0]);
  }
};
