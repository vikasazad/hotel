const data = {
  menu: {
    categories: [
      {
        id: "1",
        name: "CHINA EXPRESS",
        categoryLogo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjlJf3wJAup8vFRxwNpdZZ389A2Pc0YzNHBg&s",
        position: "0",
        menuItems: [
          {
            id: "1",
            name: "Veg Spring Roll",
            position: 1,
            description:
              "Crispy vegetable-filled spring rolls, a classic Chinese appetizer",
            images: [
              "https://mymorningmocha.com/wp-content/uploads/2023/11/vegetable-spring-rolls-recipe.jpg",
              "https://herbsandflour.com/wp-content/uploads/2023/10/Crispy-Vegetable-Spring-Rolls-Recipe-1187x1536.jpg",
              "https://www.sushiya.in/cdn/shop/files/IMG_0853_6b04d8d6-13ca-43d9-aa97-79abf2bca9eb.jpg?v=1689759492",
            ],
            portion: "Single",
            price: { Single: "140" },
            cuisineName: "Chinese",
            categoryName: "Roll",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Appetizer", "Vegetarian"],
          },
          {
            id: "2",
            name: "Veg Chowmein",
            position: 2,
            description:
              "Stir-fried vegetable noodles with authentic Chinese seasoning",
            images: [
              "https://greenbowl2soul.com/wp-content/uploads/2023/03/vegetable-chow-mein.jpg",
              "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/veg-chowmein-min-1300x867.jpg?v=1620296035",
              "https://www.shellyfoodspot.com/wp-content/uploads/2021/08/Veg-singapuri-chowmein-recipe-6-735x785.jpg",
            ],
            portion: "Single",
            price: { Single: "140" },
            cuisineName: "Chinese",
            categoryName: "Noodles",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Noodles", "Vegetarian"],
          },
          {
            id: "3",
            name: "Garlic Noodles",
            position: 3,
            description: "Noodles infused with aromatic garlic flavor",
            images: [
              "https://www.whiskaffair.com/wp-content/uploads/2020/02/Chilli-Garlic-Noodles-2-3.jpg",
              "https://www.connoisseurusveg.com/wp-content/uploads/2022/12/chili-garlic-noodles-sq.jpg",
              "https://i0.wp.com/easygourmetbyjackie.com/wp-content/uploads/2023/12/Buttery-Garlic-Noodles.jpg?fit=2500%2C2500&ssl=1",
            ],
            portion: "Single",
            price: { Single: "150" },
            cuisineName: "Chinese",
            categoryName: "Noodles",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Noodles", "Garlic", "Vegetarian"],
          },
          {
            id: "4",
            name: "Hakka Noodles",
            position: 4,
            description: "Traditional Hakka-style stir-fried vegetable noodles",
            images: [
              "https://thechutneylife.com/wp-content/uploads/2017/09/TYFNgSGl-scaled.jpeg",
              "https://www.whiskaffair.com/wp-content/uploads/2018/03/Chicken-Hakka-Noodles-2-3.jpg",
              "https://shwetainthekitchen.com/wp-content/uploads/2020/07/IMG_0100.jpg",
            ],
            portion: "Single",
            price: { Single: "150" },
            cuisineName: "Chinese",
            categoryName: "Noodles",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Noodles", "Vegetarian"],
          },
          {
            id: "5",
            name: "Veg Fried Rice",
            position: 5,
            description: "Traditional Crunchy vegetables stir-fried rice",
            images: [
              "https://shwetainthekitchen.com/wp-content/uploads/2023/06/veg-fried-rice.jpg",
              "https://www.indianveggiedelight.com/wp-content/uploads/2020/06/veg-fried-rice-featured.jpg",
              "https://www.whiskaffair.com/wp-content/uploads/2018/11/Vegetable-Fried-Rice-2-3.jpg",
            ],
            portion: "Single",
            price: { Single: "160" },
            cuisineName: "Chinese",
            categoryName: "Rice",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Rice", "Vegetarian"],
          },
          {
            id: "6",
            name: "Chilli Paneer",
            position: 6,
            description:
              "Spicy paneer preparation, available in dry or gravy style",
            images: [
              "https://spicecravings.com/wp-content/uploads/2020/07/Chilli-Paneer-4.jpg",
              "https://myfoodstory.com/wp-content/uploads/2021/06/Chilli-Paneer-3.jpg",
              "https://cookrepublic.com/wp-content/uploads/2021/09/chilli-paneer02.jpg",
            ],
            portion: "Single",
            price: { Dry: "160", Gravy: "160" },
            cuisineName: "Indo-Chinese",
            categoryName: "Paneer",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Spicy", "Vegetarian", "Dry/Gravy"],
          },
          {
            id: "7",
            name: "Crispy Chilli Potato",
            position: 7,
            description: "Spicy potato chunks cooked in a flavorful gravy",
            images: [
              "https://static.toiimg.com/photo/52532656.cms",
              "https://www.cookclickndevour.com/wp-content/uploads/2016/04/chilli-potato-recipe-1.jpg",
              "https://i.pinimg.com/736x/83/d0/15/83d0154ccd4f79b37e74bfcc3241aa7b.jpg",
            ],
            portion: "Single",
            price: { Single: "180" },
            cuisineName: "Indo-Chinese",
            categoryName: "Gravy",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Spicy", "Vegetarian"],
          },
          {
            id: "8",
            name: "Honey Chilli Potato",
            position: 8,
            description: "Sweet and spicy potato preparation with honey glaze",
            images: [
              "https://rakskitchen.net/wp-content/uploads/2022/07/honey-chilli.jpg",
              "https://myfoodstory.com/wp-content/uploads/2018/10/Honey-Chilli-Potatoes-1.jpg",
              "https://i0.wp.com/www.howaboutcooking.com/wp-content/uploads/2021/03/honey-chilli-potato.jpg?resize=640%2C400&ssl=1",
            ],
            portion: "Single",
            price: { Single: "190" },
            cuisineName: "Indo-Chinese",
            categoryName: "Potato Dish",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Sweet", "Spicy", "Vegetarian"],
          },
          {
            id: "9",
            name: "Chinese Platter",
            position: 9,
            description:
              "Comprehensive platter with Veg Spring Roll, Noodles, Fried Rice, Manchurian Gravy, and Chilli Potato Gravy",
            images: [
              "https://media-cdn.tripadvisor.com/media/photo-s/12/b9/68/d1/mvimg-20180303-161330.jpg",
              "https://i.pinimg.com/736x/f0/67/98/f0679876b60a240f3228ae736a920a4e.jpg",
              "https://rakskitchen.net/wp-content/uploads/2016/11/Indo-chinese-lunch-menu.jpg",
            ],
            portion: "Single",
            price: { Single: "210" },
            cuisineName: "Chinese",
            categoryName: "Combo",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Combo", "Vegetarian", "Multi-item"],
          },
          {
            id: "10",
            name: "Veg Manchurian",
            position: 10,
            description:
              "Vegetable balls in a rich Manchurian gravy (4 pieces)",
            images: [
              "https://www.cookshideout.com/wp-content/uploads/2014/11/Veg-Manchurian-Low-Fat-FI.jpg",
              "https://www.indianveggiedelight.com/wp-content/uploads/2017/06/gobi-manchurian-featured.jpg",
              "https://www.hookedonheat.com/wp-content/uploads/2006/03/Gobi-Manchurian-HOHV-500x500.jpg",
            ],
            portion: "Dry/Gravy",
            price: { Dry: "210", Gravy: "210" },
            cuisineName: "Indo-Chinese",
            categoryName: "Gravy",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Manchurian", "Vegetarian", "Gravy"],
          },
          {
            id: "11",
            name: "Veg Steamed Momos (6pcs)",
            position: 11,
            description:
              "Traditional vegetable dumplings, steamed to perfection",
            images: [
              "https://hips.hearstapps.com/hmg-prod/images/delish-202210-soupdumplings-205-2-1665605391.jpg?crop=1xw:1xh;center,top&resize=1200:*",
              "https://therecipecritic.com/wp-content/uploads/2023/02/soup_dumplings-1-667x1000.jpg",
              "https://hips.hearstapps.com/hmg-prod/images/delish-202210-soupdumplings-223-1665605397.jpg?crop=0.536xw:1.00xh;0.354xw,0&resize=980:*",
            ],
            portion: "Single",
            price: { Single: "80" },
            cuisineName: "Chinese/Tibetan",
            categoryName: "Dumplings",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Dumplings", "Vegetarian", "Steamed"],
          },
        ],
      },
      {
        id: "2",
        name: "CHATORI CHAAT",
        categoryLogo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlag9_G-LxVguLzQi5164a8iG00U49rDszOA&s",
        position: "0",
        menuItems: [
          {
            id: "12",
            name: "Papdi Chaat",
            position: 12,
            description:
              "Classic Indian street snack with crispy papdi topped with tangy chutneys, yogurt, and spices",
            images: [
              "https://www.yellowthyme.com/wp-content/uploads/2022/10/Chaat-Dip-8-scaled.jpg",
              "https://www.vegrecipesofindia.com/wp-content/uploads/2021/09/papdi-chaat-1.jpg",
              "https://www.vegrecipesofindia.com/wp-content/uploads/2021/09/papdi-chaat-2.jpg",
            ],
            portion: "Single",
            price: { Single: "80" },
            cuisineName: "Indian",
            categoryName: "Chaat",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Street Food", "Vegetarian", "Snack"],
          },
          {
            id: "13",
            name: "Dahi Bhalla",
            position: 13,
            description:
              "Soft puri shells filled with potatoes, topped with yogurt, chutneys, and spices (6 pieces)",
            images: [
              "https://i0.wp.com/binjalsvegkitchen.com/wp-content/uploads/2021/11/Dahi-Vada-H1.jpg?fit=600%2C900&ssl=1",
              "https://www.vegrecipesofindia.com/wp-content/uploads/2018/09/dahi-bhalla-recipe-1.jpg",
              "https://www.cookwithmanali.com/wp-content/uploads/2019/10/Dahi-Bhalla-768x1164.jpg",
            ],
            portion: "Single",
            price: { Single: "80" },
            cuisineName: "Indian",
            categoryName: "Chaat",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Street Food", "Vegetarian", "Yogurt-based"],
          },
          {
            id: "14",
            name: "Aloo Tikki Chaat",
            position: 14,
            description:
              "Crispy potato patties served with tangy chutneys and yogurt",
            images: [
              "https://www.indianveggiedelight.com/wp-content/uploads/2023/07/aloo-tikki-chaat-featured.jpg",
              "https://www.honeywhatscooking.com/wp-content/uploads/2020/10/Aloo-Tikki-Chaat61.jpg",
              "https://i0.wp.com/onewholesomemeal.com/wp-content/uploads/2020/03/Aaloo-Tikki-Chaat_4-1.jpg?w=1000&ssl=1",
            ],
            portion: "Single",
            price: { Single: "80" },
            cuisineName: "Indian",
            categoryName: "Chaat",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Potato", "Street Food", "Vegetarian"],
          },
          {
            id: "15",
            name: "Bhalla Papdi Chaat",
            position: 15,
            description:
              "Traditional chaat with soft bhalla (lentil dumplings), crispy papdi, yogurt, and chutneys",
            images: [
              "https://www.whiskaffair.com/wp-content/uploads/2021/03/Dahi-Papdi-Chaat-2-3.jpg",
              "https://femina.wwmindia.com/content/2024/mar/dahibhallapapdichaatt17112138071711213841.jpg",
              "https://www.archanaskitchen.com//images/archanaskitchen/Indian_Street_Food/Dahi_Bhalla_Puri_Recipe-1.jpg",
            ],
            portion: "Single",
            price: { Single: "80" },
            cuisineName: "Indian",
            categoryName: "Chaat",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Street Food", "Vegetarian", "Complex Chaat"],
          },
          {
            id: "16",
            name: "Raj Kachori",
            position: 16,
            description:
              "Elaborate chaat delicacy - large crispy kachori shell filled with multiple ingredients and topped with chutneys",
            images: [
              "https://www.chefkunalkapur.com/wp-content/uploads/2021/04/Raj-Kachori-scaled.jpg?v=1721441486",
              "https://1.bp.blogspot.com/-dUhG6pMmBZw/UkosUGcTz8I/AAAAAAAAMbc/jVAcdETB_Cw/s640/IMG_9931.JPG",
              "https://www.vegrecipesofindia.com/wp-content/uploads/2018/03/raj-kachori-chaat-recipe-1.jpg",
            ],
            portion: "Single",
            price: { Single: "90" },
            cuisineName: "Indian",
            categoryName: "Chaat",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Street Food", "Vegetarian", "Specialty Chaat"],
          },
          {
            id: "17",
            name: "Pani Puri (6Pcs)",
            position: 17,
            description:
              "Elaborate chaat delicacy - large crispy kachori shell filled with multiple ingredients and topped with chutneys",
            images: [
              "https://static01.nyt.com/images/2024/01/17/multimedia/ND-Pani-Puri-mflg/ND-Pani-Puri-mflg-videoSmall.jpg",
              "https://i2.wp.com/wp-backend.thefearlesscooking.com/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-10-at-4.45.10-PM.jpeg?fit=1536%2C1024&ssl=1",
              "https://www.sidechef.com/recipe/3883dffb-5fa2-4ee9-8054-d8de1409899f.jpg",
            ],
            portion: "Single",
            price: { Single: "90" },
            cuisineName: "Indian",
            categoryName: "Chaat",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Street Food", "Vegetarian", "Specialty Chaat"],
          },
        ],
      },
      {
        id: "3",
        name: "BEVERAGES",
        categoryLogo: "",
        position: "0",
        menuItems: [
          {
            id: "18",
            name: "Lassi (Sweet)",
            position: 18,
            description:
              "Traditional Indian yogurt-based drink, sweetened to perfection",
            images: [
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Salt_lassi.jpg/1200px-Salt_lassi.jpg",
              "https://themagicsaucepan.com/wp-content/uploads/2018/05/20180511-salt-lassi-0061.jpg",
              "https://www.indianveggiedelight.com/wp-content/uploads/2023/01/sweet-lassi-recipe-featured.jpg",
            ],
            portion: "Single",
            price: { Single: "55" },
            cuisineName: "Indian",
            categoryName: "Yogurt Drink",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Dairy", "Sweet", "Traditional"],
          },
          {
            id: "19",
            name: "Chhach",
            position: 19,
            description:
              "Traditional buttermilk, a refreshing and light yogurt-based drink",
            images: [
              "https://5.imimg.com/data5/SELLER/Default/2024/1/377647578/MU/CB/CZ/44307765/butter-milk-masala-chhach.jpg",
              "https://www.1mg.com/hi/patanjali/wp-content/uploads/2019/05/buttermilk-for-belly-fat.jpg",
              "https://images.herzindagi.info/image/2021/Jun/leftover-butter-milk.jpg",
            ],
            portion: "Single",
            price: { Single: "50" },
            cuisineName: "Indian",
            categoryName: "Buttermilk",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Dairy", "Refreshing", "Traditional"],
          },
          {
            id: "20",
            name: "Fresh Lime Soda",
            position: 20,
            description: "Chilled lime soda with a sweet twist",
            images: [
              "https://soufflebombay.com/wp-content/uploads/2017/06/Homemade-Lime-Soda-500x500.jpg",
              "https://vspiceroute.com/wp-content/uploads/2021/03/fresh-lime-soda-2-500x375.jpg",
              "https://www.archanaskitchen.com//images/archanaskitchen/0-Affiliate-Articles/sweet_ime_soda.jpg",
            ],
            portion: "Sweet/Salted",
            price: { Sweet: "40", Salted: "40" },
            cuisineName: "Indian",
            categoryName: "Soda",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Refreshing", "Sweet", "Lime"],
          },
          {
            id: "21",
            name: "Fresh Lime Soda (Mix)",
            position: 21,
            description:
              "Chilled lime soda with a balanced mix of sweet and salt",
            images: [
              "https://soufflebombay.com/wp-content/uploads/2017/06/Homemade-Lime-Soda-500x500.jpg",
              "https://vspiceroute.com/wp-content/uploads/2021/03/fresh-lime-soda-2-500x375.jpg",
              "https://www.archanaskitchen.com//images/archanaskitchen/0-Affiliate-Articles/sweet_ime_soda.jpg",
            ],
            portion: "Single",
            price: { Single: "40" },
            cuisineName: "Indian",
            categoryName: "Soda",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Refreshing", "Mixed Flavor", "Lime"],
          },
          {
            id: "22",
            name: "Cold Coffee",
            position: 22,
            description: "Chilled coffee drink served cold",
            images: [
              "https://mytastycurry.com/wp-content/uploads/2020/04/Cafe-style-cold-coffee-with-icecream.jpg",
              "https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/cold-coffee-recipe-2-500x500.jpg",
              "https://ikneadtoeat.com/wp-content/uploads/2021/08/cold-coffee-with-ice-cream-3.jpg",
            ],
            portion: "Single",
            price: { Single: "60" },
            cuisineName: "International",
            categoryName: "Coffee",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Cold Drink", "Coffee", "Refreshing"],
          },
          {
            id: "23",
            name: "Cold Coffee with Ice Cream",
            position: 23,
            description:
              "Delightful cold coffee topped with a scoop of creamy ice cream",
            images: [
              "https://fleurfoodie.com/wp-content/uploads/2021/12/ijskoffie-2.jpg",
              "https://ikneadtoeat.com/wp-content/uploads/2021/08/cold-coffee-with-ice-cream-3.jpg",
              "https://www.cookwithmanali.com/wp-content/uploads/2022/07/Iced-Mocha.jpg",
            ],
            portion: "Single",
            price: { Single: "80" },
            cuisineName: "International",
            categoryName: "Coffee",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Cold Drink", "Coffee", "Dessert"],
          },
          {
            id: "24",
            name: "Tea",
            position: 24,
            description: "Classic hot beverage, choice of tea or coffee",
            images: [
              "https://i0.wp.com/www.tomatoblues.com/wp-content/uploads/2022/08/vegan-masala-chai-3.jpg?resize=720%2C1087&ssl=1",
              "https://ikneadtoeat.com/wp-content/uploads/2019/01/Masala-Chai-Recipe-1.jpg",
              "https://www.teaforturmeric.com/wp-content/uploads/2021/11/Masala-Chai-Tea-Recipe-Card.jpg",
            ],
            portion: "Single",
            price: { Single: "20" },
            cuisineName: "International",
            categoryName: "Hot Beverages",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Hot Drink", "Beverage"],
          },
          {
            id: "25",
            name: "Hot Coffee",
            position: 25,
            description: "Freshly brewed hot coffee",
            images: [
              "https://www.vegrecipesofindia.com/wp-content/uploads/2018/02/cafe-style-hot-coffee-recipe-1.jpg",
              "https://images.herzindagi.info/image/2024/Aug/How-To-Make-Hot-Coffee-At-Home.jpg",
              "https://img.freepik.com/premium-photo/delicious-hot-coffee-white-cup-with-smoke-dark-wooden-table_5095-2224.jpg",
            ],
            portion: "Single",
            price: { Single: "40" },
            cuisineName: "International",
            categoryName: "Hot Beverages",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Hot Drink", "Coffee"],
          },
          {
            id: "26",
            name: "Mocktails",
            position: 26,
            description:
              "Non-alcoholic mixed beverage with a variety of flavors",
            images: [
              "https://www.simplylowcal.com/wp-content/uploads/2023/01/simple-dragonfruit-mocktail.jpg",
              "https://www.playpartyplan.com/wp-content/uploads/2022/05/strawberry-mocktail-23-e1652367982629.jpg",
              "https://mindfulmocktail.com/wp-content/uploads/2021/02/sunrise-mocktail-recipe.jpeg",
            ],
            portion: "Single",
            price: { Single: "60" },
            cuisineName: "International",
            categoryName: "Mixed Drinks",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Non-Alcoholic", "Mixed Drink", "Refreshing"],
          },
          {
            id: "27",
            name: "Shakes",
            position: 27,
            description:
              "Creamy and thick beverage blended with various flavors",
            images: [
              "https://www.thedeliciouscrescent.com/wp-content/uploads/2022/04/Date-Shake-9.jpg",
              "https://thebigmansworld.com/wp-content/uploads/2024/09/protein-shakes.jpg",
              "https://img.freepik.com/premium-photo/assorted-milk-shakes-with-banana-mango-cream-ice-cream-chocolate-berry-served-glass-side-view-healthy-drink_689047-1424.jpg",
            ],
            portion: "Single",
            price: { Single: "100" },
            cuisineName: "International",
            categoryName: "Milkshakes",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Dairy", "Dessert", "Blended"],
          },
          {
            id: "12",
            name: "Kesar Badam Milk",
            position: 12,
            description: "Rich milk infused with saffron and almonds",
            images: [
              "https://pipingpotcurry.com/wp-content/uploads/2021/08/Hot-badam-milk.jpg",
              "https://foodtrails25.com/wp-content/uploads/2023/07/Kesar-badam-Doodh-500x500.jpg",
              "https://i0.wp.com/foodtrails25.com/wp-content/uploads/2023/07/Kesar-Badam-Milk-1.jpg?resize=720%2C720&ssl=1",
            ],
            portion: "Single",
            price: { Single: "80" },
            cuisineName: "Indian",
            categoryName: "Milk Drinks",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Dairy", "Traditional", "Nutty"],
          },
        ],
      },
      {
        id: "4",
        name: "CONTINENTAL DELIGHT",
        categoryLogo:
          "https://halalmak.com/wp-content/uploads/2018/06/Continental_01v3.png",
        position: "0",
        menuItems: [
          {
            id: "28",
            name: "Veg Burger",
            position: 28,
            description:
              "Classic vegetarian burger with fresh vegetables and patty",
            images: [
              "https://www.noracooks.com/wp-content/uploads/2023/04/veggie-burgers-1-2.jpg",
              "https://farm8.staticflickr.com/7508/15591882863_12df5d1458_o.jpg",
              "https://www.vegrecipesofindia.com/wp-content/uploads/2020/12/burger-recipe-1.jpg",
            ],
            portion: "Single",
            price: { Single: "35" },
            cuisineName: "Continental",
            categoryName: "Burgers",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Vegetarian", "Fast Food", "Burger"],
          },
          {
            id: "29",
            name: "Veg Cheese Burger",
            position: 29,
            description: "Vegetarian burger topped with melted cheese",
            images: [
              "https://www.noracooks.com/wp-content/uploads/2023/04/veggie-burgers-1-2.jpg",
              "https://farm8.staticflickr.com/7508/15591882863_12df5d1458_o.jpg",
              "https://www.vegrecipesofindia.com/wp-content/uploads/2020/12/burger-recipe-1.jpg",
            ],
            portion: "Single",
            price: { Single: "50" },
            cuisineName: "Continental",
            categoryName: "Burgers",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Vegetarian", "Cheese", "Fast Food"],
          },
          {
            id: "30",
            name: "Veg Sandwich",
            position: 30,
            description: "Grilled sandwich with fresh vegetables",
            images: [
              "https://i0.wp.com/www.shanazrafiq.com/wp-content/uploads/2017/04/02-DSC_0097.jpg?w=2400&ssl=1",
              "https://www.indianveggiedelight.com/wp-content/uploads/2017/03/vegetable-mayonnaise-sandwich-featured.jpg",
              "https://www.spicebangla.com/wp-content/uploads/2024/07/vegetable-sandwich-recipe.webp",
            ],
            portion: "Single",
            price: { Single: "25" },
            cuisineName: "Continental",
            categoryName: "Sandwich",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["sandwich", "Vegetarian"],
          },
          {
            id: "31",
            name: "Tomato & Cheese Grilled Sandwich",
            position: 31,
            description:
              "Grilled sandwich with fresh tomatoes and melted cheese",
            images: [
              "https://erhardtseat.com/wp-content/uploads/2021/09/Bacon-Tomato-Grilled-Cheese-Sandwich-Recipe-Pics-10.jpg",
              "https://www.archanaskitchen.com//images/archanaskitchen/World_Sandwiches_Burgers_Wraps/Grilled_Tomato_Cheese_Sandwich_Recipe-1.jpg",
              "https://www.lordbyronskitchen.com/wp-content/uploads/2023/08/4-533x800.jpg",
            ],
            portion: "Single",
            price: { Single: "85" },
            cuisineName: "Continental",
            categoryName: "Sandwich",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Grilled", "Vegetarian", "Cheese"],
          },
          {
            id: "32",
            name: "Amul Cheez Sandwich",
            position: 32,
            description: "Sandwich made with premium Amul cheese",
            images: [
              "https://erhardtseat.com/wp-content/uploads/2021/09/Bacon-Tomato-Grilled-Cheese-Sandwich-Recipe-Pics-10.jpg",
              "https://www.archanaskitchen.com//images/archanaskitchen/World_Sandwiches_Burgers_Wraps/Grilled_Tomato_Cheese_Sandwich_Recipe-1.jpg",
              "https://www.lordbyronskitchen.com/wp-content/uploads/2023/08/4-533x800.jpg",
            ],
            portion: "Single",
            price: { Single: "90" },
            cuisineName: "Continental",
            categoryName: "Sandwich",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Cheese", "Vegetarian", "Premium"],
          },
          {
            id: "33",
            name: "French Fries",
            position: 33,
            description: "Crispy golden potato fries",
            images: [
              "https://urbanfarmie.com/wp-content/uploads/Air-Fryer-French-Fries-1x1-Image-6.jpg",
              "https://www.cookwell.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fg1s4qnmz%2Fproduction%2F82694af53c1e85caca322e435067067806223518-2500x2500.jpg&w=1200&q=75",
              "https://www.recipetineats.com/tachyon/2022/09/Crispy-Fries_8.jpg",
            ],
            portion: "Single",
            price: { Single: "70" },
            cuisineName: "Continental",
            categoryName: "Sides",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Potato", "Vegetarian", "Side Dish"],
          },
          {
            id: "34",
            name: "Tomato Onion Capsicum Pizza",
            position: 34,
            description:
              "Small pizza topped with tomatoes, onions, and capsicum",
            images: [
              "https://images.mrcook.app/recipe-image/0190a1d2-cb0e-7597-803c-917bbbdfdda4?cacheKey=VGh1LCAxMSBKdWwgMjAyNCAxMjo0NDoyOCBHTVQ=",
              "https://rasoikatadka.com/rasoi_cms/wp-content/uploads/2024/04/images-2024-04-10T182659.470.jpeg",
              "https://www.bazarontips.com/image_product/00055001.jpg",
            ],
            portion: "Small/Large",
            price: {
              Small: "80",
              Large: "120",
            },
            cuisineName: "Italian",
            categoryName: "Pizza",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Vegetarian", "Vegetable Toppings", "Pizza"],
          },
          {
            id: "35",
            name: "Cheese Pizza",
            position: 35,
            description: "Small pizza with generous cheese topping",
            images: [
              "https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-cheese-pizza_9.jpg",
              "https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-cheese-pizza-2_8.jpg",
              "https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-cheese-pizza-2_7.jpg",
            ],
            portion: "Small/Large",
            price: {
              Small: "90",
              Large: "130",
            },
            cuisineName: "Italian",
            categoryName: "Pizza",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Vegetarian", "Cheese", "Pizza"],
          },

          {
            id: "36",
            name: "Pasta",
            position: 36,
            description: "Pasta served with choice of white or red sauce",
            images: [
              "https://assets.epicurious.com/photos/5988e3458e3ab375fe3c0caf/1:1/w_1920,c_limit/How-to-Make-Chicken-Alfredo-Pasta-hero-02082017.jpg",
              "https://skinnyspatula.com/wp-content/uploads/2022/01/Pink_Pasta_Sauce2.jpg",
              "https://www.theburntbuttertable.com/wp-content/uploads/2024/04/Pasta-Alfredo-1-3.jpg",
            ],
            portion: "Red/White",
            price: { Red: "140", White: "140" },
            cuisineName: "Italian",
            categoryName: "Pasta",
            nature: "Veg",
            discountType: "",
            discountAmount: "",
            tags: ["Vegetarian", "Pasta", "Customizable Sauce"],
          },
        ],
      },
    ],
  },
};
