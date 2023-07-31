const express = require('express');
const router = express.Router();

const User = require('../models/user');

const addUser = async(req, res, next) => {
    try{
        if(!req.body.number) {
            throw new Error('Phone Number is mandatory');
        }

        const name = req.body.name;
        const phoneNumber = req.body.number;
        const email = req.body.email;

        const data = await User.create({
            name: name,
            number: phoneNumber,
            email: email
        })
        console.log(data);
        res.status(201).json({newUserDetail: data});
    } catch(err){
        console.log(err);
        res.status(500).json({error: err});
    }
}

const getUser = async(req, res, next) => {
    try{
        const users = await User.findAll();
        res.status(200).json({allUsers: users});
    } catch(error){
        console.log('Get user is failing', JSON.stringify(error));
        res.status(500).json({error: error});
    }
}

const deleteUser = async(req, res, next) => {
    try{
        if(req.params.id == 'undefined') {
            console.log('Id is missing');
            return res.status(400).json({err: 'Id is missing'});
        }
        const uId = req.params.id;
        await User.destroy({where: {id: uId}});
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {
    addUser,
    getUser,
    deleteUser
}