// Чтобы добавить сразу все элементы в БД:
// const items = 
db.items.insertMany([
    {
        _id: 0,
        name: '#прогер',
        leftItems: 10,
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        price: 10.55,
        img: 'hashtag-proger.png',
        category: 't-shirts'
    },
    {
        _id: 1,
        name: 'Сумка JS',
        leftItems: 5,
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        price: 5.99,
        img: 'bag-js.jpeg',
        category: 'bags'
    },
    {
        _id: 2,
        name: 'Худи #прогер',
        leftItems: 30,
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        price: 25.00,
        img: 'hoodie-proger.jpeg',
        category: 'sweaters'
    },
    {
        _id: 3,
        name: 'Кружка #прогер',
        leftItems: 3,
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        price: 3.59,
        img: 'mug-hashtag-4.jpeg',
        category: 'cups'
    },
    {
        _id: 4,
        name: 'Матерая кружка',
        leftItems: 3,
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        price: 3.59,
        img: 'mug-proger.jpeg',
        category: 'cups'
    },
    {
        _id: 5,
        name: 'Футболка Go',
        leftItems: 7,
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        price: 10.55,
        img: 'tshirt-golang-black.jpeg',
        category: 't-shirts'
    },
    {
        _id: 6,
        name: 'Футболка #it-шник',
        leftItems: 15,
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        price: 10.55,
        img: 'tshirt-itshnik.jpeg',
        category: 't-shirts'
    },
    {
        _id: 7,
        name: 'Футболка JS',
        leftItems: 25,
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        price: 10.55,
        img: 'tshirt-js.jpeg',
        category: 't-shirts'
    }
])