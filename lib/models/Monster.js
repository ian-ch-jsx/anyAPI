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

  static async findById(id) {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            monsters
          WHERE
            id=$1
          `,
      [id]
    );

    return new Monster(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingMonster = await Monster.findById(id);
    const updatedAttributes = { ...existingMonster, ...attributes };
    const { species, category } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
            monsters
        SET
            species=$1,
            category=$2
        WHERE
            id=$3
        RETURNING
            *
      `,
      [species, category, id]
    );

    return new Monster(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            monsters
        WHERE
            id=$1
        RETURNING
            *
        `,
      [id]
    );
    return new Monster(rows[0]);
  }
};
