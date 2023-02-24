const config = require("./config");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

// pool.connect(function (error) {
//   if (!!error) {
//     console.log(error + " asdasdas");
//   } else {
//     console.log("Koneksi Berhasil! yyeeeeeeeeeeeeeaaaahhhhh.......");
//   }
// });

module.exports = {
  // Ambil data semua karyawan
  getTask(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT task.*, tasksetting.* FROM task JOIN tasksetting ON task.id_tasksetting =  tasksetting.id_tasksetting ORDER BY tasksetting.due_date;`,
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil ambil data!",
            data: results,
          });
        }
      );
      connection.release();
    });
  },
  // Ambil data karyawan berdasarkan ID
  getTaskByID(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
        SELECT task.*, tasksetting.* FROM task JOIN tasksetting ON task.id_tasksetting =  tasksetting.id_tasksetting WHERE task.id_task = ?;
        `,
        [id],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil ambil data!",
            data: results,
          });
        }
      );
      connection.release();
    });
  },
  // Simpan data karyawan
  addTask(req, res) {
    let data = {
      task_id: req.body.id_task,
      task_category: req.body.category,
      task_due_date: req.body.due_date,
      task_priority: req.body.priority,
      task_reminder: req.body.reminder,
      task_repeat_task: req.body.repeat_task,
      task_name: req.body.name,
      task_description: req.body.description,
      task_status: req.body.status,
      // task_created_at: req.body.created_at,
    };
    // INSERT INTO task (id_task, id_tasksetting, name, description, status) VALUES (?,?,?,?,?)
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT IGNORE INTO tasksetting (id_tasksetting, category, due_date, priority, reminder, repeat_task) VALUES (?,?,?,?,?,?)`,
        [
          data["task_id"],
          data["task_category"],
          data["task_due_date"],
          data["task_priority"],
          data["task_reminder"],
          data["task_repeat_task"],
          //task
          // data["task_id"],
          // data["task_id"],
          // data["task_name"],
          // data["task_description"],
          // data["task_status"],
        ],
        function (error, results) {
          if (error) throw error;
          connection.query(
            `INSERT INTO task (id_task, id_tasksetting, name, description, status) VALUES (?,?,?,?,?)`,
            [
              data["task_id"],
              data["task_id"],
              data["task_name"],
              data["task_description"],
              data["task_status"],
            ]
          );
          res.send({
            success: true,
            message: "Berhasil tambah data!",
          });
        }
      );
      connection.release();
    });
  },
  // Update data karyawan
  editTask(req, res) {
    let dataEdit = {
      task_category: req.body.category,
      task_due_date: req.body.due_date,
      task_priority: req.body.priority,
      task_reminder: req.body.reminder,
      task_repeat_task: req.body.repeat_task,
      task_name: req.body.name,
      task_description: req.body.description,
      task_status: req.body.status,
      task_created_at: req.body.created_at,
    };
    let id = req.body.id_task;
    // UPDATE task SET name=?, description=?, status=? WHERE id_task = ?;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
        UPDATE tasksetting SET category=?, due_date=?, priority=?, reminder=?, repeat_task=? WHERE id_tasksetting = ?;
        `,
        [
          dataEdit["task_category"],
          dataEdit["task_due_date"],
          dataEdit["task_priority"],
          dataEdit["task_reminder"],
          dataEdit["task_repeat_task"],
          id,
          // dataEdit["task_name"],
          // dataEdit["task_description"],
          // dataEdit["task_status"],
          // id,
        ],
        function (error, results) {
          if (error) throw error;
          connection.query(
            `UPDATE task SET name=?, description=?, status=? WHERE id_task = ?;`,
            [
              dataEdit["task_name"],
              dataEdit["task_description"],
              dataEdit["task_status"],
              id,
            ]
          );
          res.send({
            success: true,
            message: "Berhasil edit data!",
            res: results,
            dataSended: dataEdit,
            idSended: "id: " + id,
          });
        }
      );

      connection.release();
    });
  },
  // Delete data karyawan
  deleteTask(req, res) {
    let id = req.body.id_task;
    // DELETE FROM tasksetting WHERE id_task_setting=?;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
        DELETE FROM task WHERE id_task = ?;
        `,
        [id],
        function (error, results) {
          if (error) throw error;
          connection.query(`DELETE FROM tasksetting WHERE id_tasksetting=?;`, [
            id,
          ]);
          res.send({
            success: true,
            message: "Berhasil hapus data!",
          });
        }
      );

      connection.release();
    });
  },

  //login
  // login(req, res) {
  //   let email = req.body.email;
  //   let password = req.body.password;
  //   //print email
  //   console.log(email);
  //   //print password
  //   console.log(password);
  //   pool.getConnection(function (err, connection) {
  //     if (err) throw err;
  //     connection.query(
  //       `
  //       SELECT * FROM user WHERE email = ? AND password = ?;
  //       `,
  //       [email, password],
  //       function (error, results) {
  //         if (error) throw error;
  //         //print results
  //         console.log(results);
  //         res.send({
  //           success: true,
  //           message: "Berhasil ambil data!",
  //           data: results,
  //         });
  //       }
  //     );
  //     connection.release();
  //   });
  // },
  login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    //print email
    console.log(email);
    //print password
    console.log(password);
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
          SELECT * FROM user;
          `,
        [email, password],
        function (error, results) {
          if (error) throw error;
          //print results
          console.log(results);
          res.send({
            success: true,
            message: "Berhasil ambil data!",
            data: results,
          });
        }
      );
      connection.release();
    });
  },
};
