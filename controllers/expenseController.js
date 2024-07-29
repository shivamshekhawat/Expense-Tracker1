const PDFDocument = require('pdfkit');
const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const { validatePercentageSplit } = require('../utils/validation');

exports.addExpense = async (req, res) => {
  const { splitMethod, participants } = req.body;

  if (splitMethod === 'Percentage' && !validatePercentageSplit(participants)) {
    return res.status(400).send({ error: 'Percentages do not add up to 100%' });
  }

  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getIndividualExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ 'participants.userId': req.params.id });
    res.send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOverallExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.downloadBalanceSheet = async (req, res) => {
  try {
    const users = await User.find();
    const expenses = await Expense.find();
    
    // Create a new PDF document
    const doc = new PDFDocument();
    
    // Pipe the PDF into a writable stream
    res.setHeader('Content-disposition', 'attachment; filename=balance-sheet.pdf');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);
    
    doc.fontSize(18).text('Balance Sheet', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14).text('Users:', { underline: true });
    users.forEach(user => {
      doc.fontSize(12).text(`Name: ${user.name}, Email: ${user.email}, Mobile: ${user.mobile}`);
    });
    
    doc.moveDown();
    doc.fontSize(14).text('Expenses:', { underline: true });
    expenses.forEach(expense => {
      doc.fontSize(12).text(`Description: ${expense.description}, Amount: ${expense.amount}, Split Method: ${expense.splitMethod}`);
    });
    
    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    res.status(500).send(error);
  }
};
