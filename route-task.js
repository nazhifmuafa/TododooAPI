const router = require("express").Router();
const {
  task,
  getTask,
  getTaskByID,
  addTask,
  editTask,
  deleteTask,
  login,
} = require("./controller-task");

router.get("/", (req, res) => {
  res.send({
    data: "Hello World",
    message: "Welcome to tododoo application.",
  });
});

// GET localhost:8080/karyawan => Ambil data semua karyawan
router.get("/task", getTask);

// GET localhost:8080/karyawan/2 => Ambil data semua karyawan berdasarkan id = 2
router.get("/task/:id", getTaskByID);

// POST localhost:8080/karyawan/add => Tambah data karyawan ke database
router.post("/task/add", addTask);

// POST localhost:8080/karyawan/2 => Edit data karyawan
router.post("/task/edit", editTask);

// POST localhost:8080/karyawan/delete => Delete data karyawan
router.post("/task/delete", deleteTask);

router.get("/login", login);

module.exports = router;
