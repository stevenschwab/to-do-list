const formidable = require('formidable');
const { create, get, remove, update } = require('../model/todo');

exports.create = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { description } = fields;
      // check to see if the description field exists in the form
      // if description doesn't exist, send error
      if (!fields.description) {
        return res.status(400).json({
          error: 'Description is required',
        });
      }
      // if description exists, add to database using create() function
      try {
        const newTask = await create(description);
        return res.status(201).send({ data: newTask.rows[0] });
      } catch (error) {
        // if description cannot be added to database, send error
        return res.status(400).json({
          error,
        });
      }
    });
};

exports.read = async (req, res) => {
    try {
        const tasks = await get();
        return res.json({ data: tasks.rows });
    } catch (err) {
        // if cannot get todo from database, send error
        return res.status(400).json({
          error: err,
        });
    }
};

exports.removeTodo = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await remove(id);
        return res.status(200).send({ data: id });
    } catch (error) {
        return res.status(400).json({
          error,
        });
    }
};

exports.update = async (req, res) => {
    const id = Number(req.params.id);
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { description } = fields;
      // check to see if the description field exists in the form
      // if description doesn't exist, send error
      if (!fields.description) {
        return res.status(400).json({
          error: 'Description is required',
        });
      }
      // if description exists, add to database using update() function
      try {
        const updatedTask = await update(id, description);
        return res.status(200).send({ data: updatedTask.rows[0] });
      } catch (error) {
        // if description cannot be updated in database, send error
        return res.status(400).json({
          error,
        });
      }
    });
}