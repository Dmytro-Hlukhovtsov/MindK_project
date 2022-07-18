const db = require("../db");

module.exports = {
  getByParams: async (table, column, value, id) => {
    let whereAnd = "";
    if (id) {
      whereAnd = `and${table
        .toLowerCase()
        .substring(0, table.length - 1)}_id != ${id}`;
    }
    const result = db
      .select(column)
      .from(table)
      .whereRaw(`${column} = :value ${whereAnd}`, {
        value,
      });

    return result;
  },
};
