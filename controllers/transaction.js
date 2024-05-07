const Transaction = require('../models/transaction');
const Item = require('../models/item');

const getTransactions = async (req, res) => {
    const transactions = await Transaction.find();
    res.send({"count": transactions.length, "transactions": transactions}).status(200);
};

const createTransaction = async (req, res) => {
    const {Items_sold, Item_id} = req.body;
const item = await Item.findById({"_id": Item_id})
    if(!item) {
        res.send({"error": "Item not found"}).status(404);
    }
    let Total_price = item.price * Items_sold;
    const transaction = new Transaction ({
      Item_name: item.name, 
      Items_sold: Items_sold,
      Total_price: Total_price
    })
await transaction.save();
item.quantity -= Items_sold;
await item.save();

    if(!transaction) { 
        res.send({"error": "Transaction creation failed"}).status(400);
    }
    
    res.send(transaction).status(201);
};

const getTransactionById = async (req, res) => {
    const id = req.params.id;
    try {
      const transaction = await Transaction.findById({ "_id": id});
  
      if (!transaction) {
        res.send({ error: "No Transaction with id: &{id} found!!" }).status(404);
      }
      res.send(transaction).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal server error" });
    }
  };
  
  const updateTransaction = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
  
    try {
      const Transaction = await Transaction.findByIdAndUpdate(id, { ...data }, { new: true });
  
      if (!Transaction) {
        res.send({ error: "Transaction with id:${id} does not exist!!" }).status(404);
      }
      res.send(Transaction).status(201);
    } catch (error) {
      console.log(error);
      res.send({ error: "Internal server error" }).status(500);
    }
};

const deleteTransaction = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete({"_id": id})
    if (!deletedTransaction) {
      res.send({ "error": "Transaction with id: &{id} does not exist!!" }).status(404);
  }
  res.send({ "success": `Transaction: &{id} deleted successfully`}).status(204)
}catch (error) {
  console.log(error);
  res.send({ "error": "Internal server error" }).status(500);
}
};

module.exports = {
    getTransactions,
    createTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};

