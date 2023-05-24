import { Schema, model } from 'mongoose'

// описываем корзину купленных товаров: 'id' + количество
const OrderSchema = new Schema({
    item_id: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

export const Order = model('Orders', OrderSchema)