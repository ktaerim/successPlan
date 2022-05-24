const { pool } = require("../../database");

exports.insertUser = async function (email, password, nickname) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const insertUserQuery =
        "INSERT INTO Users (email,password, nickname) values (?,?,?);";
      const insertUserParams = [email, password, nickname];

      const [row] = await connection.query(insertUserQuery, insertUserParams);
      connection.release();

      return row;
    } catch (err) {
      console.error(` ##### insertUser Query error ##### \n ${err}`);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### insertUser DB error ##### \n ${err}`);
    return false;
  }
};

exports.selectUserByEmail = async function (email) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const selectUserByEmailQuery = "SELECT * FROM Users WHERE email = ?;";
      const selectUserByEmailParams = [email];

      const [row] = await connection.query(
        selectUserByEmailQuery,
        selectUserByEmailParams
      );
      connection.release();

      return row;
    } catch (err) {
      console.error(` ##### selectUserByEmail Query error ##### \n ${err}`);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### selectUserByEmail DB error ##### \n ${err}`);
    return false;
  }
};

exports.selectUser = async function (email, password) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const selectUserQuery =
        "SELECT * FROM Users WHERE email = ? and password = ?;";
      const selectUserParams = [email, password];

      const [row] = await connection.query(selectUserQuery, selectUserParams);
      connection.release();

      return row;
    } catch (err) {
      console.error(` ##### selectUser Query error ##### \n ${err}`);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### selectUser DB error ##### \n ${err}`);
    return false;
  }
};

exports.selectNicknameByUserIdx = async function (userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const selectNicknameByUserIdxQuery =
        "SELECT * FROM Users WHERE userIdx = ?;";
      const selectNicknameByUserIdxParams = [userIdx];

      const [row] = await connection.query(
        selectNicknameByUserIdxQuery,
        selectNicknameByUserIdxParams
      );
      connection.release();

      return row;
    } catch (err) {
      console.error(
        ` ##### selectNicknameByUserIdx Query error ##### \n ${err}`
      );
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### selectNicknameByUserIdx DB error ##### \n ${err}`);
    return false;
  }
};
