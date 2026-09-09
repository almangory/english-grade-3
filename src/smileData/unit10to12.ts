import { UnitItem } from "../types";

export const units10to12: UnitItem[] = [
  // ==========================================
  // UNIT 10: FOOD AND DRINK
  // ==========================================
  {
    id: 10,
    title: "Food and Drink",
    arabicTitle: "الطعام والشراب",
    color: "bg-lime-50 text-lime-950 border-lime-400",
    icon: "🍉",
    words: [
      { id: "w10-1", word: "Melon", arabic: "بطيخ", image: "🍉", example: "There are some melons in the basket.", soundText: "There are some melons in the basket.", unit: 10 },
      { id: "w10-2", word: "Banana", arabic: "موز", image: "🍌", example: "I have got a yellow banana.", soundText: "I have got a yellow banana.", unit: 10 },
      { id: "w10-3", word: "Onion", arabic: "بصل", image: "🧅", example: "Onions are healthy vegetables.", soundText: "Onions are healthy vegetables.", unit: 10 },
      { id: "w10-4", word: "Carrot", arabic: "جزر", image: "🥕", example: "Carrots are sweet orange vegetables.", soundText: "Carrots are sweet orange vegetables.", unit: 10 },
      { id: "w10-5", word: "Peanuts", arabic: "فول سوداني", image: "🥜", example: "I like roasted peanuts.", soundText: "I like roasted peanuts.", unit: 10 },
      { id: "w10-6", word: "Tomatoes", arabic: "طماطم", image: "🍅", example: "Tomatoes are red and juicy.", soundText: "Tomatoes are red and juicy.", unit: 10 },
      { id: "w10-7", word: "Sugar", arabic: "سكر", image: "🧂", example: "There is some sugar on the shelf.", soundText: "There is some sugar on the shelf.", unit: 10 },
      { id: "w10-8", word: "Orange", arabic: "برتقال", image: "🍊", example: "My favourite drink is orange juice.", soundText: "My favourite drink is orange juice.", unit: 10 },
      { id: "w10-9", word: "Milk", arabic: "حليب", image: "🥛", example: "There is some milk in the fridge.", soundText: "There is some milk in the fridge.", unit: 10 },
      { id: "w10-10", word: "Bread", arabic: "خبز", image: "🍞", example: "Point to the fresh bread.", soundText: "Point to the fresh bread.", unit: 10 },
      { id: "w10-11", word: "Mango", arabic: "مانجو", image: "🥭", example: "Mix the sweet mangoes and water.", soundText: "Mix the sweet mangoes and water.", unit: 10 },
      { id: "w10-12", word: "Tea", arabic: "شاي", image: "🫖", example: "I'd like tea with milk, please.", soundText: "I'd like tea with milk, please.", unit: 10 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Food and Body Rhyme",
        type: "song",
        content: {
          songText: "Food and Body Rhyme (أنشودة الأطعمة وأعضاء الجسم):\nPoint to the lemons, point to the eggs.\nPoint to the tomatoes and point to your legs.\nPoint to the milk, point to the sweets.\nPoint to the bananas and point to your feet.\nPoint to the water, point to the bread.\nPoint to the juice and point to your head!\n\nQuantities:\nThere is some water in the picture.\nThere are some bananas in the picture."
        }
      },
      {
        id: 2,
        title: "Lesson 2: In the Fridge & On the Shelf",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "Where are the peanuts?", voice: "Kore" },
            { speaker: "Badr", text: "They are on the table.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Is there any milk?", voice: "Kore" },
            { speaker: "Badr", text: "There is some milk in the fridge.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Where are the sweets and sugar?", voice: "Kore" },
            { speaker: "Badr", text: "There are some sweets on the shelf. There is some sugar on the shelf.", voice: "Zephyr" }
          ],
          songText: "Look and say:\nThere are some eggs in the fridge.\nThere are some carrots on the table.\nThere are some sweets on the shelf.\nThere is some sugar on the shelf.\nThere is some milk in the fridge."
        }
      },
      {
        id: 3,
        title: "Lesson 3: Fruit or Vegetable?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "OK, Ahmed. What's this? Is it a fruit or vegetable?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "It's a fruit.", voice: "Kore" },
            { speaker: "Badr", text: "It isn't round?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "No, it isn't. It's long.", voice: "Kore" },
            { speaker: "Badr", text: "I think it's a banana!", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Yes, it is!", voice: "Kore" }
          ],
          songText: "Ask and answer:\nIs an apple a fruit or vegetable?\nIt's a fruit.\nIs a carrot a fruit or vegetable?\nIt's a vegetable."
        }
      },
      {
        id: 4,
        title: "Lesson 4: How to Make Mango Juice",
        type: "vocab",
        content: {
          songText: "Making Mango Juice (طريقة عمل عصير المانجو):\n1. Wash your hands and the mangoes.\n2. Cut up the mangoes.\n3. Put them in a mixer.\n4. Add some clean water.\n5. Add some sugar.\n6. Mix the sugar, water and the mangoes.\n7. Put the juice in a glass.\n8. Sit down and drink the juice!\n\nPhonics ow:\nhow, cow, down, now, brown."
        }
      },
      {
        id: 5,
        title: "Lesson 5: The Five Senses",
        type: "song",
        content: {
          songText: "The Five Senses Song (نشيد الحواس الخمس):\nWith my eyes, I can see food.\nWith my nose, I can smell food.\nWith my mouth, I can eat food.\nI can taste the food is good!\n\nAsk and answer:\nWhat's your favourite drink, Cathy?\nMy favourite drink is orange juice.\nWhat's your favourite food?\nMy favourite food is mango."
        }
      },
      {
        id: 6,
        title: "Lesson 6: Fruit and Vegetables Science",
        type: "vocab",
        content: {
          songText: "Science: Fruits vs Vegetables:\nFruit and vegetables are not the same.\nMost fruit is sweet and there are seeds in it.\nA banana is a fruit. A melon is a fruit. An orange is a fruit.\n\nVegetables are different.\nA potato is a vegetable. An onion is a vegetable. A carrot is a vegetable.\nThey haven't got seeds in them."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Sudanese Breakfast",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Dalia", text: "Cathy! Come in! Sit down and eat breakfast.", voice: "Zephyr" },
            { speaker: "Cathy", text: "Hello, Dalia. Thank you.", voice: "Kore" },
            { speaker: "Dalia", text: "We've got eggs, bread, foul and ta'miya.", voice: "Zephyr" },
            { speaker: "Cathy", text: "My favourite breakfast!", voice: "Kore" },
            { speaker: "Dalia", text: "Would you like to drink tea or water?", voice: "Zephyr" },
            { speaker: "Cathy", text: "I'd like tea, please.", voice: "Kore" },
            { speaker: "Dalia", text: "With milk and sugar?", voice: "Zephyr" },
            { speaker: "Cathy", text: "Yes, I'd like sugar and milk, please.", voice: "Kore" }
          ],
          songText: "Polite Requests:\nI'd like tea, please.\nI'd like milk and sugar, please.\nThank you!"
        }
      },
      {
        id: 8,
        title: "Lesson 8: Food Revision",
        type: "vocab",
        content: {
          songText: "Food Classification & Revision:\nFruit: mango, apple, orange, banana, grape.\nVegetable: carrot, onion, potato, garlic.\nNot fruit or vegetable: meat, milk, bread, water.\n\nI like apples. I don't like onions.\n\nPhonics a-e (split digraph):\nname, make, same, game, grape, gate."
        }
      }
    ]
  },

  // ==========================================
  // UNIT 11: OUR ENVIRONMENT
  // ==========================================
  {
    id: 11,
    title: "Our Environment",
    arabicTitle: "بيئتنا",
    color: "bg-rose-50 text-rose-950 border-rose-400",
    icon: "🌳",
    words: [
      { id: "w11-1", word: "Hospital", arabic: "مستشفى", image: "🏥", example: "The hospital is in Nile Street.", soundText: "The hospital is in Nile Street.", unit: 11 },
      { id: "w11-2", word: "Sweets", arabic: "حلويات", image: "🍬", example: "We buy sweets at the shop.", soundText: "We buy sweets at the shop.", unit: 11 },
      { id: "w11-3", word: "Park", arabic: "منتزه / حديقة", image: "🌳", example: "There are green trees in the park.", soundText: "There are green trees in the park.", unit: 11 },
      { id: "w11-4", word: "Rubbish", arabic: "قمامة / مخلفات", image: "🗑️", example: "Don't drop rubbish on the floor.", soundText: "Don't drop rubbish on the floor.", unit: 11 },
      { id: "w11-5", word: "Tidy", arabic: "مرتب / نظيف", image: "🧹", example: "Keep your classroom tidy.", soundText: "Keep your classroom tidy.", unit: 11 },
      { id: "w11-6", word: "Flowers", arabic: "زهور", image: "🌸", example: "Please don't pick the flowers.", soundText: "Please don't pick the flowers.", unit: 11 },
      { id: "w11-7", word: "Clean", arabic: "نظيف", image: "🧼", example: "The air and water are clean.", soundText: "The air and water are clean.", unit: 11 },
      { id: "w11-8", word: "Happy", arabic: "سعيد ومزهر", image: "😊", example: "This green tree is happy.", soundText: "This green tree is happy.", unit: 11 },
      { id: "w11-9", word: "Museum", arabic: "متحف", image: "🏛️", example: "The museum is near the school.", soundText: "The museum is near the school.", unit: 11 },
      { id: "w11-10", word: "Mosque", arabic: "مسجد", image: "🕌", example: "The mosque is in Nile Street.", soundText: "The mosque is in Nile Street.", unit: 11 },
      { id: "w11-11", word: "School", arabic: "مدرسة", image: "🏫", example: "We can study at school.", soundText: "We can study at school.", unit: 11 },
      { id: "w11-12", word: "Zoo", arabic: "حديقة حيوان", image: "🦁", example: "We can see animals at the zoo.", soundText: "We can see animals at the zoo.", unit: 11 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Where is the Museum?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Boy", text: "Excuse me, where's the museum?", voice: "Kore" },
            { speaker: "Girl", text: "The museum? It's in Nile Street. It's near the school.", voice: "Zephyr" },
            { speaker: "Boy", text: "Thank you!", voice: "Kore" },
            { speaker: "Girl", text: "You're welcome!", voice: "Zephyr" }
          ],
          songText: "Places in the Street:\nmuseum, school, Nile Street, zoo, market, mosque, cafe, hospital, park."
        }
      },
      {
        id: 2,
        title: "Lesson 2: What can we do there?",
        type: "vocab",
        content: {
          songText: "Community Places (أماكن مجتمعنا وماذا نفعل فيها):\nWe can study there -> school\nWe can buy food there -> market\nWe can read books there -> library\nWe can see doctors there -> hospital\nWe can buy sweets there -> shop\nWe can walk and play there -> park\nWe can see animals there -> zoo\nWe can catch buses there -> bus station"
        }
      },
      {
        id: 3,
        title: "Lesson 3: In the Park",
        type: "song",
        content: {
          songText: "In the Park Song (أنشودة اللعب في الحديقة والمنتزه):\nWhat can we do, can we do today?\nWe can go to the park, to the park and play.\nThe grass there is green, the sky there is blue.\nThere are trees and the air is clean.\nWe can hop, we can run. We can skip, we can jump.\nWe can talk to our friends, we can sit in the sun.\nWhat can we do? We can play in the park when the sky is dark.\nAnd then we go home to sleep!"
        }
      },
      {
        id: 4,
        title: "Lesson 4: Keep the Park Tidy",
        type: "vocab",
        content: {
          songText: "Park Rules (قواعد نظافة المنتزه):\nIt's a nice day. The sky is blue. You can hear the birds.\nYou go to the park. There is a tall tree in the park.\nThere are some small flowers near the tree.\nWhat's that? There's some rubbish under the tree!\nPick up the rubbish! Put it in the rubbish bin.\n\nDon't drop rubbish.\nDon't pick the flowers.\nKeep the park tidy!\n\nPhonics i-e:\nfive, time, Nile, nine, drive, fine."
        }
      },
      {
        id: 5,
        title: "Lesson 5: Rubbish in the Classroom",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Teacher", text: "There's rubbish in the classroom behind the door.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "It's next to the window and under a chair.", voice: "Kore" },
            { speaker: "Teacher", text: "Don't drop it on the floor! Don't leave it there!", voice: "Zephyr" },
            { speaker: "Teacher", text: "Pick up the paper, please. Put it in the bin.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Yes, Teacher. I put it in the rubbish bin.", voice: "Kore" }
          ],
          songText: "Clean Classroom Campaign (حملة نظافة الفصل):\nThere's rubbish in the classroom.\nThere's rubbish in the classroom behind the door.\nIt's next to the window and under a chair.\nDon't drop it on the floor! Don't leave it there!\nPlastic bags and paper, food, cans and tins.\nPick them up and put them in the rubbish bins!"
        }
      },
      {
        id: 6,
        title: "Lesson 6: Caring for our Environment",
        type: "vocab",
        content: {
          songText: "Rules to Protect Nature (إرشادات حماية البيئة):\nDon't hurt animals.\nTurn off the tap.\nPut your rubbish in the rubbish bin.\nDon't pick the flowers.\nTurn off the lights.\n\nMake a poster:\nYou can help! Keep your school and home clean."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Two Trees Tale",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Sad Tree", text: "I am sad. The air and the water are dirty here.", voice: "Kore" },
            { speaker: "Sad Tree", text: "I can't see the sun or drink the water. There are no leaves on me.", voice: "Kore" },
            { speaker: "Happy Tree", text: "I am happy! The air and the water are clean here.", voice: "Zephyr" },
            { speaker: "Happy Tree", text: "I can see the sun and drink the water. Lots of bees live in my branches.", voice: "Zephyr" },
            { speaker: "Teacher", text: "Remember: Keep your city clean. Keep Sudan clean!", voice: "Zephyr" }
          ],
          songText: "Two Trees Story (قصة الشجرة الحزينة والشجرة السعيدة):\nThis tree is sad. The air and water are dirty. No leaves, flowers or fruit.\nThis tree is happy. The air and water are clean. Lots of new leaves, fruit, and bees!\nRemember: Keep Sudan clean!"
        }
      },
      {
        id: 8,
        title: "Lesson 8: Environment Revision",
        type: "song",
        content: {
          songText: "Chant: Ali, Ali, what can you see? (أنشودة ماذا يرى علي؟):\nAli, Ali, what can you see?\nI can see two little birds. They're with a bee.\nAli, Ali, what can you see?\nI can see three brown monkeys. They're in a tree.\nAli, Ali, what can you see?\nI can see four small fish. They're in the sea.\nAli, Ali, what can you see?\nI can see a yellow star with light for me!\n\nPhonics oo:\nzoo, room, food, school."
        }
      }
    ]
  },

  // ==========================================
  // UNIT 12: EID EL FITR
  // ==========================================
  {
    id: 12,
    title: "Eid El Fitr",
    arabicTitle: "عيد الفطر المبارك",
    color: "bg-cyan-50 text-cyan-950 border-cyan-400",
    icon: "🎉",
    words: [
      { id: "w12-1", word: "Shorts", arabic: "سروال قصير", image: "🩳", example: "There are shorts on the clothes line.", soundText: "There are shorts on the clothes line.", unit: 12 },
      { id: "w12-2", word: "Cap", arabic: "قبعة رأس / كاب", image: "🧢", example: "Whose cap is this? It's Eddie's cap.", soundText: "Whose cap is this? It's Eddie's cap.", unit: 12 },
      { id: "w12-3", word: "Dress", arabic: "فستان", image: "👗", example: "Rayan has got a new Eid dress.", soundText: "Rayan has got a new Eid dress.", unit: 12 },
      { id: "w12-4", word: "Skirt", arabic: "تنورة", image: "👗", example: "There is a long grey skirt.", soundText: "There is a long grey skirt.", unit: 12 },
      { id: "w12-5", word: "Shirt", arabic: "قميص", image: "👕", example: "This is a clean Eid shirt.", soundText: "This is a clean Eid shirt.", unit: 12 },
      { id: "w12-6", word: "Trousers", arabic: "بنطال", image: "👖", example: "Put on your new trousers.", soundText: "Put on your new trousers.", unit: 12 },
      { id: "w12-7", word: "Grandmother", arabic: "جدة", image: "👵🏾", example: "Say Eid Mubarak to Grandmother!", soundText: "Say Eid Mubarak to Grandmother!", unit: 12 },
      { id: "w12-8", word: "Grandfather", arabic: "جد", image: "👴🏾", example: "Say Eid Mubarak to Grandfather!", soundText: "Say Eid Mubarak to Grandfather!", unit: 12 },
      { id: "w12-9", word: "Clothes", arabic: "ملابس العيد", image: "👔", example: "We wear new Eid clothes.", soundText: "We wear new Eid clothes.", unit: 12 },
      { id: "w12-10", word: "Cake", arabic: "كعك العيد", image: "🎂", example: "We bake delicious Eid cake.", soundText: "We bake delicious Eid cake.", unit: 12 },
      { id: "w12-11", word: "Flour", arabic: "دقيق", image: "🌾", example: "Put flour and oil in a bowl.", soundText: "Put flour and oil in a bowl.", unit: 12 },
      { id: "w12-12", word: "Jalabeya", arabic: "جلابية سودانية", image: "🥻", example: "Adam has got a white jalabeya.", soundText: "Adam has got a white jalabeya.", unit: 12 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Clothes on the Line",
        type: "song",
        content: {
          songText: "Clothes Line Rhyme (أنشودة ملابس العيد على حبل الغسيل):\nLook at the garden, what can you see,\nThere on the clothes line under the tree?\nThere are shorts and trousers,\nThere's a red T-shirt,\nThere's an orange dress and a long grey skirt.\nThere's a blouse, there's a shirt,\nThere's a cap, there's a hat,\nThere are two jalabeyas and a small black cat!"
        }
      },
      {
        id: 2,
        title: "Lesson 2: Whose is this?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Teacher", text: "Whose flower is this?", voice: "Zephyr" },
            { speaker: "Fatma", text: "It's Cathy's flower.", voice: "Kore" },
            { speaker: "Teacher", text: "Whose cap is this?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "It's Eddie's cap.", voice: "Kore" },
            { speaker: "Teacher", text: "Whose bag is this?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "It's Fatma's bag.", voice: "Kore" }
          ],
          songText: "Whose is this? (السؤال عن الملكية):\nWhose flower is this? It's Cathy's flower.\nWhose cap is this? It's Eddie's cap.\nWhose dress is this? It's Fatma's dress.\nWhose ball is this? It's Hassan's ball."
        }
      },
      {
        id: 3,
        title: "Lesson 3: Grandma's Eid Clothes",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Grandmother", text: "Eid Mubarak, children! I have got Eid clothes for you.", voice: "Zephyr" },
            { speaker: "Children", text: "Grandma! Thank you!", voice: "Kore" },
            { speaker: "Mother", text: "Have you got a new skirt, Rayan?", voice: "Zephyr" },
            { speaker: "Rayan", text: "No, I haven't got a new skirt, but I have got a new dress. Adam has got a new jalabeya!", voice: "Kore" }
          ],
          songText: "Welcome to Eid Song (أنشودة مرحباً بالعيد السعيد):\nWelcome to Eid everyone!\nHappy Eid everyone!\nA time to eat, a time to greet.\nEid Mubarak, everyone!"
        }
      },
      {
        id: 4,
        title: "Lesson 4: Eid at the Zoo",
        type: "vocab",
        content: {
          songText: "Happy Eid at the Zoo (زيارة حديقة الحيوان في العيد):\nHappy Eid El Fitr! Welcome to the zoo.\nHow many people are there?\nHow many animals are there?\nHow many elephants are there?\nHow many girls are there?\nThere are 5 elephants. There are 10 girls.\n\nPhonics ir and ur:\ngirl, shirt, skirt, turn, hurt, purple."
        }
      },
      {
        id: 5,
        title: "Lesson 5: Visiting Grandma's House",
        type: "song",
        content: {
          songText: "Visiting Grandma on Eid (قصيدة المشي لمعايدة الجدة):\nLook out of the window, what can you see?\nThe flowers in the garden, and the big tall tree.\nGo through the garden, and walk past the shop.\nDon't play with friends, don't run, skip or hop.\nClimb over the wall, you know where you are.\nSay Eid Mubarak to your nice grandma!"
        }
      },
      {
        id: 6,
        title: "Lesson 6: How to Bake an Eid Cake",
        type: "vocab",
        content: {
          songText: "Recipe for Eid Cake (طريقة عمل كعك العيد اللذيذ):\n1. Wash your hands thoroughly.\n2. Put flour, oil, milk, salt and sugar in a bowl.\n3. Mix well.\n4. Add four eggs and mix.\n5. Put into a cake tin.\n6. Cook the cake in the oven for two hours.\n\nActivity:\nDraw or make an Eid bag!"
        }
      },
      {
        id: 7,
        title: "Lesson 7: Eid Morning Schedule",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badria", text: "On Eid El Fitr morning, I wake up early at five o'clock.", voice: "Kore" },
            { speaker: "Badria", text: "I have a cup of tea and some cake at seven o'clock.", voice: "Kore" },
            { speaker: "Badria", text: "Then I put on my new Eid clothes.", voice: "Kore" },
            { speaker: "Badria", text: "I say Eid Mubarak to my grandfather at nine o'clock.", voice: "Kore" },
            { speaker: "Badria", text: "I have breakfast with my family at ten o'clock!", voice: "Kore" }
          ],
          songText: "On Eid El Fitr Morning (جدول صبيحة يوم العيد):\n5 o'clock: Wake up early.\n7 o'clock: Cup of tea and cake.\n8 o'clock: Put on new Eid clothes.\n9 o'clock: Say Eid Mubarak to grandfather.\n10 o'clock: Have breakfast with family."
        }
      },
      {
        id: 8,
        title: "Lesson 8: Eid Manners & Revision",
        type: "vocab",
        content: {
          songText: "Good or Bad at Eid? (آداب العيد):\nIt's good to visit your family at Eid El Fitr.\nIt's good to say Eid Mubarak to everyone.\nIt's good to visit your friends.\nIt's good to eat lots of fruit.\n\nIt's bad to eat lots of sweets.\nIt's bad to pick flowers in parks.\nIt's bad to play in the sun.\nIt's bad to swim in a river.\n\nPresents:\nI'd like a book, please. I don't want a car, thank you.\n\nPhonics ou:\nhouse, mouse, flour, blouse, trousers, mountain."
        }
      }
    ]
  }
];
