"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const shop_item_1 = require("./models/shop-item");
const order_1 = require("./models/order");
// Подключаем модуль, который позволяет работать с несколькими адресами
const cors = require('cors');
// чтобы работала вставка (request.body) нужно установить модуль
// npm i body-parser, подлючаем модуль
const bodyParser = require('body-parser');
// Создаем приложение
const app = (0, express_1.default)();
// Тестируем подключение к mongodb
try {
    (0, mongoose_1.connect)(config_1.MONGO);
    console.log('DB Connection successed!');
}
catch (err) {
    console.log(err);
}
// Подключаем обработчик - возможность получать данные из форм
app.use(express_1.default.urlencoded({ extended: false }));
// Промежуточный обработчик, дает возможность работь с разными адресами (убирает ошибку)
app.use(cors());
// Обработчик для передачи методом POST через body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// REST API для связки серверной и клиентской стороны
// отслежиаем URL, при переходе по которому, клиентская сторона
// будет получать JSON со всеми записями
// '/api/shop-items' можно прописать любой адресс, (хоть '/') но обычно:
// '/api' + '/shop-items' - по смыслу
app.get('/api/shop-items', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getItems = yield shop_item_1.Items.find().sort({ _id: 1 });
        if (!getItems)
            throw new Error('Items not found!');
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(getItems);
    }
    catch (err) {
        console.log(err);
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err);
    }
}));
// Обработка страницы товара
app.get('/api/shop-items/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // {id: request.params.id} - находим товар у которого 'id'
        // совпадает с 'id', переданным в URL
        const getItem = yield shop_item_1.Items.findOne({ id: request.params.id });
        if (!getItem)
            throw new Error('Items not found!');
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(getItem);
    }
    catch (err) {
        console.log(err);
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err);
    }
}));
app.post('/api/shop-items', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // чтобы работала вставка (request.body) нужно установить модуль
    // npm i body-parser
    try {
        const result = yield order_1.Order.insertMany(request.body);
        if (!result)
            throw new Error('Items not found!');
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err);
    }
}));
// обработчик поиска из поля 'search' на стороне сервера
// создаем индекc 'text' по полям 'name', 'desc' в mongodb
// db.items.createIndex({"name": "text", "desc": "text"})
app.post('/api/shop-items/search', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Находим данные, которые отправили в serch.js через 'body'
        const result = yield shop_item_1.Items.find({ $text: { $search: request.body.search } });
        if (!result)
            throw new Error('Items not found!');
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err);
    }
}));
// Запускаем сервер
app.listen(config_1.PORT, () => console.log('Server started!!!'));
