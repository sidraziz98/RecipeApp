const bcrypt = require('bcrypt');

const data = {
    userRoles: [
        {
            _id: 1,
            role: 'admin'
        },
        {
            _id: 2,
            role: 'user'
        },
    ],
    users: [
        {
            firstName: "Zoha",
            lastName: "Imran",
            email: "zoha@gmail.com",
            password: bcrypt.hashSync('12345678', 8),
            userRole: 1
        },
        {
            firstName: "Sidra",
            lastName: "Aziz",
            email: "sidraziz98@gmail.com",
            password: bcrypt.hashSync('12345678', 8),
            userRole: 1
        },
        {
            firstName: "Sarah",
            lastName: "Imran",
            email: "sarah@gmail.com",
            password: bcrypt.hashSync('12345678', 8),
            userRole: 1
        },
    ],
    recipes: [
        {
            title: "Biryani",
            description: "An authentic Chicken Biryani recipe with simple, easy-to-follow instructions and mouthwatering, traditional Pakistani and Indian flavor.",
            duration: 120,
            instructions: [
                "Prepare the biryani masala (or use store-bought) and marinate the chicken.",
                "Cook the chicken curry. While it’s cooking over low heat, prepare the rice.",
                "Bring a pot of water to a boil and parboil the rice. Drain and set aside.",
                "Layer half of the rice, all of the chicken, and then the remaining rice on top. Add the finishing touches.",
                "Allow steam to develop, then lower the heat and let the flavors meld."
            ],
        },
        {
            title: "Chicken Alfredo Pasta",
            description: "Steaming bowls of pasta, buttery, roasted garlic bread, and tureens of the most flavorful sauces: it’s all right there.",
            duration: 33,
            instructions: [
                "In a pan over medium-high heat, melt butter, then add the chicken breast.",
                "Season with salt, pepper, oregano, and basil. Cook 8-10 minutes or until chicken is fully cooked. Remove from heat and set chicken aside.",
                "In the same pan over medium heat, melt butter and add the garlic. Cook until the garlic begins to soften.",
                "Add half of the flour to the garlic and butter, stirring until incorporated. Then add the rest of the flour and stir.",
                "Pour in the milk a little bit at a time, stirring well in between, until fully incorporated and sauce begins to thicken.",
                "Season with salt, pepper, oregano, and basil, and stir well to incorporate. Add parmesan cheese and stir until melted.",
                "Pour the sauce over cooked penne pasta, add the chicken and mix well. Add parsley and extra parmesan. Mix well."
            ],
        },
        {
            title: "Kfc-Style Zinger Burger",
            description: "Crispy and delicious KFC fame Zinger Burger is loved by all.",
            duration: 20,
            instructions: [
                "In a bowl, whisk the eggs and set aside. Crumble chicken cube in flour.",
                "Take another bowl, add the dry ingredients, including chicken cube flour and mix them well. Rub the dry spices well into the pieces of chicken and dip them in the whisked eggs. Repeat this process three to four times.",
                "Fry chicken till golden brown.",
                "Take round bun and cut in the middle, grease the pan lightly and toast both sides. Put hot milk and then mayonnaise on the buns.",
                "Place the chicken pieces on the buns and put hot sauce over them.",
                "Lastly, put iceberg lettuce and cheese slices and close the bun. Your chicken burgers are ready."
            ],
        },
    ],
    
};

module.exports = data;