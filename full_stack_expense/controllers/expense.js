const express = require('express');
const router = express.Router();

const Expense = require('../models/expense');

const addExpense = async(req, res, next) => {
    try{
        if(!req.body.amount) {
            throw new Error('Amount is mandatory');
        }

        const amt = req.body.amount;
        const details = req.body.details;
        const category = req.body.category;

        const data = await Expense.create({
            amount: amt,
            details: details,
            category: category
        })
        console.log(data);
        res.status(201).json({newExpenseDetail: data});
    } catch(err){
        console.log(err);
        res.status(500).json({error: err});
    }
}

const getExpense = async(req, res, next) => {
    try{
        const expense = await Expense.findAll();
        res.status(200).json({allExpense: expense});
    } catch(error){
        console.log('Get expense is failing', JSON.stringify(error));
        res.status(500).json({error: error});
    }
}

const deleteExpense = async(req, res, next) => {
    try{
        if(req.params.id == 'undefined') {
            console.log('Id is missing');
            return res.status(400).json({err: 'Id is missing'});
        }
        const uId = req.params.id;
        await Expense.destroy({where: {id: uId}});
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {
    addExpense,
    getExpense,
    deleteExpense
}