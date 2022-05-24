const { pool } = require("../../database");

exports.getUserRows = async function () {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const selectUserQuery = "SELECT * FROM Users;";

      const [row] = await connection.query(selectUserQuery);

      return row;
    } catch (err) {
      console.error(` ##### getUserRows Query error #####`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(` ##### getUserRows DB error #####`);
    return false;
  }
};

exports.insertTodo = async function (userIdx, contents, type) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const insertTodoQuery =
        "INSERT INTO Todos (userIdx, contents, type) values (?,?,?);";
      const insertTodoParams = [userIdx, contents, type];

      const [row] = await connection.query(insertTodoQuery, insertTodoParams);
      connection.release();

      return row;
    } catch (err) {
      console.error(` ##### insertTodo Query error ##### \n ${err}`);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### insertTodo DB error ##### \n ${err}`);
    return false;
  }
};

exports.selectTodoByType = async function (userIdx, type) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const selectTodoByTypeQuery =
        "SELECT todoIdx, contents,status FROM Todos where userIdx = ? and type = ? and not(status ='D');";
      const selectTodoByTypeParams = [userIdx, type];

      const [row] = await connection.query(
        selectTodoByTypeQuery,
        selectTodoByTypeParams
      );
      connection.release();

      return row;
    } catch (err) {
      console.error(` ##### selectTodoByType Query error ##### \n ${err}`);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### selectTodoByType DB error ##### \n ${err}`);
    return false;
  }
};

exports.selectValidTodo = async function (userIdx, todoIdx, contents, status) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const selectValidTodoQuery =
        "SELECT * FROM Todos where userIdx = ? and todoIdx = ? and not(status ='D');";
      const selectValidTodoParams = [userIdx, todoIdx];

      const [row] = await connection.query(
        selectValidTodoQuery,
        selectValidTodoParams
      );
      connection.release();

      return row;
    } catch (err) {
      console.error(` ##### selectValidTodo Query error ##### \n ${err}`);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### selectValidTodo DB error ##### \n ${err}`);
    return false;
  }
};

exports.updateTodo = async function (userIdx, todoIdx, contents, status) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const updateTodoQuery =
        "UPDATE Todos SET contents = ifnull(?, contents), status = ifnull(?, status) WHERE userIdx = ? and todoIdx = ?;";

      const updateTodoParams = [contents, status, userIdx, todoIdx];

      const [row] = await connection.query(updateTodoQuery, updateTodoParams);
      connection.release();

      return row;
    } catch (err) {
      console.error(` ##### updateTodo Query error ##### \n ${err}`);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### updateTodo DB error ##### \n ${err}`);
    return false;
  }
};

exports.deleteTodo = async function (userIdx, todoIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const deleteTodoQuery =
        "UPDATE Todos SET status = 'D' WHERE userIdx = ? and todoIdx = ?;";

      const deleteTodoParams = [userIdx, todoIdx];

      const [row] = await connection.query(deleteTodoQuery, deleteTodoParams);
      connection.release();

      return row;
    } catch (err) {
      console.error(` ##### deleteTodo Query error ##### \n ${err}`);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### deleteTodo DB error ##### \n ${err}`);
    return false;
  }
};
