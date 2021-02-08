module.exports = ({
    knex = {},
    name = 'name',
    tableName = 'tablename',
    selectableProps = [],
    timeout = 1000
  }) => {
    const create = props => knex.insert(props)
      .into(tableName)
      .timeout(timeout);

    const findAll = () => knex.select(selectableProps)
      .from(tableName)
      .timeout(timeout);

    const find = filters => knex.select(selectableProps)
      .from(tableName)
      .where(filters)
      .timeout(timeout);

    const findOne = filters => find(filters)
      .then(results => {
        if (!Array.isArray(results) || results.length == 0) return 0;
        return results[0];
      });
  
    const findById = id => knex.select(selectableProps)
      .from(tableName)
      .where({ id })
      .timeout(timeout);
  
    const update = (id, props) => knex.update(props)
        .from(tableName)
        .where({id})
        .timeout(timeout);
  
    const destroy = id => knex.del()
      .from(tableName)
      .where(id)
      .timeout(timeout);
  
    return {
      name,
      tableName,
      selectableProps,
      timeout,
      create,
      findAll,
      find,
      findOne,
      findById,
      update,
      destroy
    }
  }