"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
// описываем корзину купленных товаров: 'id' + количество
const OrderSchema = new mongoose_1.Schema({
    item_id: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});
exports.Order = (0, mongoose_1.model)('Orders', OrderSchema);
