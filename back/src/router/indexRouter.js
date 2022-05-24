const indexController = require("../controller/indexConstroller");
const { jwtMiddleware } = require("../../jwtMiddleware");

exports.indexRouter = function (app) {
  //일정 CRUD API
  app.post("/todo", jwtMiddleware, indexController.createdTodo); // create
  app.get("/todos", jwtMiddleware, indexController.readTodo); // /user/1/todos read
  app.patch("/todo", jwtMiddleware, indexController.updateTodo); // update
  app.delete("/todo/:todoIdx", jwtMiddleware, indexController.deleteTodo); // delete, /user/1/todo/1

  app.get(
    "/dummy",
    function (req, res, next) {
      console.log(1);
      next();
    },
    function (req, res, next) {
      console.log(2);
      next();
    },
    function (req, res) {
      console.log(3);
      return;
    }
  );
};
