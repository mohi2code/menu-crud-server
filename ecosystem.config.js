module.exports = {
  apps: [{
    name: 'app',
    script: './bin/www',
    env: {
      NODE_ENV: "development",
      DB_CONNECTION_STRING: "postgres://:password@localhost:5432/menu_crud",
      JWT_SECRET: "67gkpojiuygtf6yubiomp5f6g7h8jihg6f5"
    },
  }],
};
