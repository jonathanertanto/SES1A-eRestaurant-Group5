const express = require ("express");
const router = express.Router();
const Meal = require('../../model/meal').model;

router.post("/", async (req, res) => {
    try{
        const data = await Meal.find({});

        if(data.length > 0){
            return res.json({menuItem: data.sort((a, b) => (a.type > b.type) ? -1: 1)});
        }

        const images = [
            "https://uppercutsteakhouse.com/wp-content/uploads/2019/09/menu-dry-agedc.jpg", "https://i.pinimg.com/564x/77/c5/e7/77c5e7acb0f6e244bfeed141f19b8b71.jpg",
            "https://i.pinimg.com/564x/d4/c9/31/d4c9317f618ef2eff5e74cd91240460b.jpg", "https://i.pinimg.com/564x/6c/6e/8d/6c6e8dabd1808b9b17c0f0425e812f60.jpg", 
            "https://i.pinimg.com/474x/96/44/81/964481b56cc24fb0b5cb26163d8c7d1e.jpg", "https://i.pinimg.com/564x/fa/19/22/fa1922802ace93daf1b828251071c4ed.jpg", 
            "https://i.pinimg.com/564x/2d/7d/6c/2d7d6ce126fc1e27234546ec516b4b3b.jpg", "https://i.pinimg.com/564x/90/0e/4b/900e4b973211894ab95539ad8319b061.jpg",
            "https://i.pinimg.com/564x/b9/33/1d/b9331d3bda91816550a2f92adbc99219.jpg", "https://i.pinimg.com/564x/f4/0d/5e/f40d5eb9df1742ab0eee40fc4bb86277.jpg"
        ];
        const names = ["Meal 1", "Meal 2", "Meal 3", "Meal 4", "Meal 5", "Drink 1", "Drink 2", "Drink 3", "Drink 4", "Drink 5"];
        const descriptions = ["Description 1", "Description 2", "Description 3", "Description 4", "Description 5", "Description 6", "Description 7",  "Description 8", "Description 9", "Description 10"];
        const prices = [25, 25, 20, 27, 23, 6, 6, 5.5, 6.5, 7];
        const costs = [8, 8, 6, 9, 7, 2.5, 2.5, 2, 3, 3, 3.5];
        const types = ["f", "f", "f", "f", "f", "d", "d", "d", "d", "d"];
        const menuTypes = ["all", "all", "all", "lunch", "dinner", "all", "all", "all", "lunch", "dinner"];

        const meals = [];
        for(let i=0; i<10; ++i){
            const meal = new Meal({
                image: String(images[i]),
                name: String(names[i]),
                description: String(descriptions[i]),
                price: Number(prices[i]),
                cost: Number(costs[i]),
                type: String(types[i]),
                menuType: String(menuTypes[i])
            });
            meal.save();
            meals.push(meal);
            console.log("Successfully saved the meal");
        }
        return res.json({menuItem: meals.sort((a, b) => (a.type > b.type) ? -1: 1)});

    }catch(error){
        console.log(error);
    }
});

module.exports = router;