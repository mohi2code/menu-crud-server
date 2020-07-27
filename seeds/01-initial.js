const {
  v4: uuidv4
} = require('uuid');

exports.seed = async function (knex) {
  await knex('food').del();
  await knex('category').del();

  const category_ids = {
    Pizzas: uuidv4(),
    Subs: uuidv4(),
    Drinks: uuidv4(),
  }

  await knex('category').insert([{
      id: category_ids.Pizzas,
      name: 'Pizzas'
    },
    {
      id: category_ids.Subs,
      name: 'Subs'
    },
    {
      id: category_ids.Drinks,
      name: 'Drinks'
    }
  ]);

  await knex('food').insert([{
      id: uuidv4(),
      name: 'Tikka Chicken',
      description: `Chicken, mushroom,
      sweet bell pepper, onion,
      tikka sauce, spring onion`,
      category_id: category_ids.Pizzas,
      price: 104,
      image: 'http://psce.pw/SWXNQ',
      calories: 860
    },
    {
      id: uuidv4(),
      name: 'Chicken & Mushroom',
      description: `Chicken, mushroom, tomato,
      onion, Debonairs sauce`,
      category_id: category_ids.Pizzas,
      price: 99,
      image: 'http://psce.pw/UCVRS',
      calories: 810
    },
    {
      id: uuidv4(),
      name: 'TRIPLE-DECKER',
      description: `Three layers, three cheeses: our secret cream cheese,
      ground beef, spare rib, ham, onion, tomato & herb
      pizza sauce & mozzarella, topped with BBQ sauce,
      cheddar & mozzarella`,
      category_id: category_ids.Pizzas,
      price: 99,
      image: 'http://psce.pw/UCVRS',
      calories: 810
    },
    {
      id: uuidv4(),
      name: 'Somethin Meaty',
      description: `Ham, pepperoni, bacon, ground beef, BBQ sauce`,
      category_id: category_ids.Subs,
      price: 79,
      image: 'http://psce.pw/UCCLT',
      calories: 615
    },
    {
      id: uuidv4(),
      name: 'Coca Cola',
      description: `The most refreshing drink.`,
      category_id: category_ids.Drinks,
      price: 25,
      image: 'http://psce.pw/R3226',
      calories: 179
    }
  ]);

};