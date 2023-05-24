import express, { Application, request, response } from 'express'
import { connect } from 'mongoose'
import { MONGO, PORT } from './config'
import { Items } from './models/shop-item'
import { Order } from './models/order'

// Подключаем модуль, который позволяет работать с несколькими адресами
const cors = require('cors')

// чтобы работала вставка (request.body) нужно установить модуль
// npm i body-parser, подлючаем модуль
const bodyParser = require('body-parser')

// Создаем приложение
const app: Application = express()

// Тестируем подключение к mongodb
try{
    connect(MONGO)
    console.log('DB Connection successed!')
} catch (err) {
    console.log(err)
}

// Подключаем обработчик - возможность получать данные из форм
app.use(express.urlencoded({ extended: false }))
// Промежуточный обработчик, дает возможность работь с разными адресами (убирает ошибку)
app.use(cors())
// Обработчик для передачи методом POST через body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// REST API для связки серверной и клиентской стороны
// отслежиаем URL, при переходе по которому, клиентская сторона
// будет получать JSON со всеми записями
// '/api/shop-items' можно прописать любой адресс, (хоть '/') но обычно:
// '/api' + '/shop-items' - по смыслу
app.get('/api/shop-items', async (request, response) => {
    try {
        const getItems = await Items.find().sort({ _id: 1 })
        if (!getItems) throw new Error('Items not found!')
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(getItems)
    } catch (err) {
        console.log(err)
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err)
       }
})
// Обработка страницы товара
app.get('/api/shop-items/:id', async (request, response) => {
    try {
        // {id: request.params.id} - находим товар у которого 'id'
        // совпадает с 'id', переданным в URL
        const getItem = await Items.findOne({id: request.params.id})
        if (!getItem) throw new Error('Items not found!')
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(getItem)
    } catch (err) {
        console.log(err)
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err)
       }
})

app.post('/api/shop-items', async (request, response) => {
    // чтобы работала вставка (request.body) нужно установить модуль
    // npm i body-parser
    try {
        const result = await Order.insertMany(request.body)
        if (!result) throw new Error('Items not found!')
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(result)
    } catch (err) {
        console.log(err)
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err)
       }
})

// обработчик поиска из поля 'search' на стороне сервера
// создаем индекc 'text' по полям 'name', 'desc' в mongodb
// db.items.createIndex({"name": "text", "desc": "text"})
app.post('/api/shop-items/search', async (request, response) => {
    try {
        // Находим данные, которые отправили в serch.js через 'body'
        const result = await Items.find({$text: {$search: request.body.search} })
        if (!result) throw new Error('Items not found!')
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(result)
    } catch (err) {
        console.log(err)
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err)
       }
})

// Запускаем сервер
app.listen(PORT, () => console.log('Server started!!!'))