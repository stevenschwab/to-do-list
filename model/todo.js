const pool = require('./database');

const create = (description) =>
  pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [
    description,
]);

const get = () => pool.query('SELECT * FROM todo');

const remove = (id) => pool.query('DELETE FROM todo WHERE id = $1', [id]);

const update = (id, description) => pool.query('UPDATE todo SET description = $2 WHERE id = $1', [id, description]);

module.exports = {
    create,
    get,
    remove,
    update
};