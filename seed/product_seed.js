import { executeQuery } from "../services/dbService.js";

(async () => {
  await executeQuery(`
    INSERT INTO product (product_name, product_info, cost, stock_quantity, added_by_user_id) VALUES
    ('Espresso', 'Kraftfullt och intensivt, perfekt för en snabb kick.', 30, 10, 1),
    ('Cappuccino', 'En perfekt balans mellan espresso och mjölkskum.', 40, 10, 1),
    ('Americano', 'Espresso med varmt vatten, för en mildare smak.', 32, 10, 1),
    ('Mocha', 'En läcker kombination av kaffe och choklad.', 45, 10, 1),
    ('Flat White', 'En stark espresso med silkeslen mjölk.', 38, 10, 1),
    ('Macchiato', 'Espresso med en skvätt mjölk, för den som vill ha det enkelt.', 35, 10, 1),
    ('Affogato', 'En skopa vaniljglass med en shot varm espresso över.', 50, 10, 1),
    ('Irish Coffee', 'Kaffe med whiskey och grädde, en vuxenfavorit.', 55, 10, 1),
    ('Doppio', 'Dubbel espresso för den som vill ha extra energi.', 36, 10, 1),
    ('Ristretto', 'En koncentrerad espresso med mindre vatten.', 34, 10, 1),
    ('Iced Coffee', 'Kaffe serverat kallt, perfekt för varma dagar.', 30, 10, 1),
    ('Café au Lait', 'Kaffe med varm mjölk, fransk stil.', 37, 10, 1),
    ('Cold Brew', 'Kaffe bryggt med kallt vatten under lång tid.', 38, 10, 1),
    ('Turkish Coffee', 'Kaffe kokt med finmalet kaffe och socker, traditionellt.', 40, 10, 1),
    ('Nitro Coffee', 'Koffein med ett krämigt lager av kväve, serveras kallt.', 42, 10, 1),
    ('Latte', 'Mjölkskum och espresso i perfekt harmoni.', 35, 10, 1),
    ('Affogato', 'Vaniljglass med espresso över.', 50, 10, 1),
    ('Café con Leche', 'Spansk stil kaffe med mjölk.', 36, 10, 1),
    ('Viennese Coffee', 'Kaffe med grädde, en klassiker.', 52, 10, 1),
    ('Hazelnut Coffee', 'Kaffe med hasselnötsmak, krämig och god.', 38, 10, 1),
    ('Vanilla Latte', 'Latte med vaniljsmak.', 40, 10, 1),
    ('Coconut Coffee', 'Kaffe med kokos, söt och tropisk.', 42, 10, 1),
    ('Caramel Macchiato', 'Karamell och espresso, en söt njutning.', 45, 10, 1),
    ('Chai Latte', 'Kryddig chai med mjölk.', 38, 10, 1),
    ('Matcha Latte', 'Grönt te med mjölk, en hälsosam twist.', 40, 10, 1),
    ('Frappe', 'Kall och krämig kaffe med is.', 35, 10, 1),
    ('Kaffe Latte', 'En klassisk latte med stark smak.', 36, 10, 1),
    ('Peanut Butter Coffee', 'Kaffe med jordnötssmör, en unik smak.', 44, 10, 1),
    ('Spiced Coffee', 'Kaffe med en hint av kryddor.', 39, 10, 1),
    ('Lemonade Coffee', 'Kaffe med citron, en uppfriskande kombination.', 37, 10, 1),
    ('Red Eye', 'Kaffe med extra espresso, för den som behöver mer energi.', 34, 10, 1),
    ('Coconut Iced Coffee', 'Kall kaffe med kokosmjölk.', 39, 10, 1),
    ('Pumpkin Spice Latte', 'Säsongens favorit med pumpasmak.', 50, 10, 1);
   `);
})();
