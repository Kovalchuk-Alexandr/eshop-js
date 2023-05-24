"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
// За счет Schema описываем коллекцию, которая будет создана
const mongoose_1 = require("mongoose");
const ItemsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    leftitems: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
});
// Эспортируем модель 'items', с описанием в 'ItemsSchema' 
exports.Items = (0, mongoose_1.model)('items', ItemsSchema);
