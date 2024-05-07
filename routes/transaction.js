const express = require("express");
const { getTransactions, createTransaction, getTransactionById, updateTransaction, deleteTransaction } = require("../controllers/transaction");

const router = express.Router()

router.get("/", getTransactions);
router.post("/", createTransaction);
router.get("/:id", getTransactionById);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);



module.exports = router;