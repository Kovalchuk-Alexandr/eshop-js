"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGO = void 0;
exports.MONGO = 'mongodb://127.0.0.1:27017/eshop?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2';
exports.PORT = process.env.PORT || 3000;
