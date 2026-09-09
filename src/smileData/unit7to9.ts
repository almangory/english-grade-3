import { UnitItem } from "../types";

export const units7to9: UnitItem[] = [
  // ==========================================
  // UNIT 7: MY FAMILY
  // ==========================================
  {
    id: 7,
    title: "My Family",
    arabicTitle: "عائلتي",
    color: "bg-teal-50 text-teal-950 border-teal-400",
    icon: "👨‍👩‍👧‍👦",
    words: [
      { id: "w7-1", word: "Mother", arabic: "أم", image: "👩🏾‍💼", example: "This is my mother.", soundText: "This is my mother.", unit: 7 },
      { id: "w7-2", word: "Father", arabic: "أب", image: "👨🏾‍💼", example: "This is my father.", soundText: "This is my father.", unit: 7 },
      { id: "w7-3", word: "Brother", arabic: "أخ", image: "👦🏾", example: "He is my brother.", soundText: "He is my brother.", unit: 7 },
      { id: "w7-4", word: "Sister", arabic: "أخت", image: "👧🏾", example: "She is my sister.", soundText: "She is my sister.", unit: 7 },
      { id: "w7-5", word: "Grandmother", arabic: "جدة", image: "👵🏾", example: "My grandmother is kind.", soundText: "My grandmother is kind.", unit: 7 },
      { id: "w7-6", word: "Grandfather", arabic: "جد", image: "👴🏾", example: "My grandfather is tall.", soundText: "My grandfather is tall.", unit: 7 },
      { id: "w7-7", word: "Baby", arabic: "طفل رضيع", image: "👶🏾", example: "This is my baby sister.", soundText: "This is my baby sister.", unit: 7 },
      { id: "w7-8", word: "Family", arabic: "عائلة / أسرة", image: "👨‍👩‍👦", example: "I love my happy family.", soundText: "I love my happy family.", unit: 7 },
      { id: "w7-9", word: "Breakfast", arabic: "وجبة الإفطار", image: "🍳", example: "We eat breakfast at seven.", soundText: "We eat breakfast at seven.", unit: 7 },
      { id: "w7-10", word: "School", arabic: "مدرسة", image: "🏫", example: "We go to school at eight.", soundText: "We go to school at eight.", unit: 7 },
      { id: "w7-11", word: "Bed", arabic: "سرير", image: "🛏️", example: "We go to bed at nine.", soundText: "We go to bed at nine.", unit: 7 },
      { id: "w7-12", word: "Living room", arabic: "غرفة الجلوس", image: "🛋️", example: "Father is in the living room.", soundText: "Father is in the living room.", unit: 7 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: This is me",
        type: "song",
        content: {
          songText: "This is Me Rhyme (أنشودة أنا وعائلتي):\nThis is me. I'm with my sister.\nThis is me and this is my brother.\nThis is me. I'm with my father.\nThis is me and this is my mother.\n\nMake a card:\nTo Mum with love."
        }
      },
      {
        id: 2,
        title: "Lesson 2: Dalia's Family",
        type: "vocab",
        content: {
          songText: "Dalia's Family Tree (شجرة عائلة داليا):\nThis is a picture of Dalia's family.\nThis is Dalia's mother.\nher father,\nher grandmother,\nher grandfather,\nher brother,\nher sister,\nher little brother,\nher baby sister."
        }
      },
      {
        id: 3,
        title: "Lesson 3: Have you got any brothers?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Eddie", text: "Is your family big?", voice: "Kore" },
            { speaker: "Badr", text: "No, not very big.", voice: "Zephyr" },
            { speaker: "Eddie", text: "Have you got any brothers, Badr?", voice: "Kore" },
            { speaker: "Badr", text: "Yes, I have.", voice: "Zephyr" },
            { speaker: "Eddie", text: "How many brothers have you got?", voice: "Kore" },
            { speaker: "Badr", text: "I've got one brother and one sister. She's very small. She's a baby.", voice: "Zephyr" }
          ],
          songText: "Ask and answer:\nHow many brothers have you got?\nI've got two brothers.\nHow many sisters have you got?\nI've got one sister."
        }
      },
      {
        id: 4,
        title: "Lesson 4: Rami and his Sisters",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Rami", text: "My name is Rami. This is me with my four sisters.", voice: "Kore" },
            { speaker: "Rami", text: "Samia's between me and Sara. Samia has got short hair.", voice: "Kore" },
            { speaker: "Rami", text: "Sara has got long hair.", voice: "Kore" },
            { speaker: "Rami", text: "Lamees is between me and Zeinab. She has got long hair.", voice: "Kore" },
            { speaker: "Rami", text: "Zeinab is tall and has got long hair.", voice: "Kore" }
          ],
          songText: "Phonics ar:\ncar, arm, star, market."
        }
      },
      {
        id: 5,
        title: "Lesson 5: Stand next to your brother",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Teacher", text: "Little brother, stay there.", voice: "Zephyr" },
            { speaker: "Teacher", text: "Father, stand next to little brother.", voice: "Zephyr" },
            { speaker: "Teacher", text: "Grandfather, stand next to little brother.", voice: "Zephyr" },
            { speaker: "Teacher", text: "Big brother, stand next to grandfather.", voice: "Zephyr" }
          ],
          songText: "Prepositions (حروف الجر المكانية):\nbetween (بين),\nin front of (أمام),\nnext to (بجانب),\nunder (تحت),\nin (في / داخل),\non (على / فوق)."
        }
      },
      {
        id: 6,
        title: "Lesson 6: The Baby Chick",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Baby Chick", text: "Chick! Chick! Chick! Chick!", voice: "Zephyr" },
            { speaker: "Cow", text: "Not now, Chick! We eat now. It's 11 o'clock.", voice: "Kore" },
            { speaker: "Baby Chick", text: "Chick! Chick!", voice: "Zephyr" },
            { speaker: "Donkey", text: "Not now, Chick! We go to bed now. It's 8 o'clock.", voice: "Kore" },
            { speaker: "Baby Chick", text: "Chick! Chick!", voice: "Zephyr" },
            { speaker: "Sheep", text: "Not now, Chick! We sleep now. It's 3 o'clock.", voice: "Kore" },
            { speaker: "Baby Chick", text: "Chick! Chick!", voice: "Zephyr" },
            { speaker: "Cow", text: "Yes, Chick, now! We wake up now. It's 6 o'clock!", voice: "Kore" }
          ],
          songText: "The Baby Chick Story (قصة الكتكوت ومواعيد الحيوانات):\nNot now, chick! We eat now. (11 o'clock)\nNot now, chick! We go to bed now. (8 o'clock)\nNot now, chick! We sleep now. (3 o'clock)\nNow, chick! We wake up now. (6 o'clock)"
        }
      },
      {
        id: 7,
        title: "Lesson 7: Adil's Day",
        type: "vocab",
        content: {
          songText: "Adil's Daily Routine (جدول يوم عادل):\nHello, I'm Adil.\nMy brother and I wake up at 6 o'clock.\nWe go to school at 8 o'clock.\nWe eat breakfast at 10 o'clock.\nAfter school we walk home.\nWe go to bed at 9 o'clock.\n\nTalk about your day:\nI wake up at 6 o'clock.\nI go to school at 8 o'clock.\nI eat breakfast at 10 o'clock.\nI go to bed at 9 o'clock."
        }
      },
      {
        id: 8,
        title: "Lesson 8: Family Revision",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "Where is Eman's father?", voice: "Kore" },
            { speaker: "Badr", text: "He's in the living room.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Where is Eman's mother?", voice: "Kore" },
            { speaker: "Badr", text: "She's in the kitchen.", voice: "Zephyr" }
          ],
          songText: "Family Members & Rooms:\nEman's father, Eman's mother, Eman's grandmother, Eman's grandfather, Eman's sister, Eman's brother.\n\nPhonics er:\nmother, brother, under, teacher."
        }
      }
    ]
  },

  // ==========================================
  // UNIT 8: TOYS AND GAMES
  // ==========================================
  {
    id: 8,
    title: "Toys and Games",
    arabicTitle: "الألعاب والدمى",
    color: "bg-rose-50 text-rose-950 border-rose-400",
    icon: "🧸",
    words: [
      { id: "w8-1", word: "Game", arabic: "لعبة", image: "🎮", example: "Let's play a game.", soundText: "Let's play a game.", unit: 8 },
      { id: "w8-2", word: "Toy", arabic: "دمية", image: "🧸", example: "I have a new yellow toy.", soundText: "I have a new yellow toy.", unit: 8 },
      { id: "w8-3", word: "Book", arabic: "كتاب", image: "📚", example: "I can see an English book.", soundText: "I can see an English book.", unit: 8 },
      { id: "w8-4", word: "Street", arabic: "شارع", image: "🛣️", example: "The car is in the street.", soundText: "The car is in the street.", unit: 8 },
      { id: "w8-5", word: "Tree", arabic: "شجرة", image: "🌳", example: "The bird is in the tree.", soundText: "The bird is in the tree.", unit: 8 },
      { id: "w8-6", word: "Feet", arabic: "أقدام", image: "🦶", example: "I can stand on my feet.", soundText: "I can stand on my feet.", unit: 8 },
      { id: "w8-7", word: "Ice cream", arabic: "مثلجات", image: "🍦", example: "I like cold ice cream.", soundText: "I like cold ice cream.", unit: 8 },
      { id: "w8-8", word: "Beach", arabic: "شاطئ البحر", image: "🏖️", example: "I like the sun and the beach.", soundText: "I like the sun and the beach.", unit: 8 },
      { id: "w8-9", word: "Car", arabic: "سيارة", image: "🚗", example: "The car is driving fast.", soundText: "The car is driving fast.", unit: 8 },
      { id: "w8-10", word: "Wheel", arabic: "عجلة", image: "🛞", example: "The wheels go round and round.", soundText: "The wheels go round and round.", unit: 8 },
      { id: "w8-11", word: "Window", arabic: "نافذة", image: "🪟", example: "The windows go up and down.", soundText: "The windows go up and down.", unit: 8 },
      { id: "w8-12", word: "Door", arabic: "باب", image: "🚪", example: "The doors open and close.", soundText: "The doors open and close.", unit: 8 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: What can you see?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "What can you see?", voice: "Kore" },
            { speaker: "Badr", text: "I can see a book. I can see a ball.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Can you remember the toys?", voice: "Kore" },
            { speaker: "Badr", text: "Yes! A car, a kite, and a doll.", voice: "Zephyr" }
          ],
          songText: "Listen, say and play:\nWhat can you see?\nI can see a book.\nI can see a toy.\nI can see a ball."
        }
      },
      {
        id: 2,
        title: "Lesson 2: Simple Commands",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Teacher", text: "Hello, boys. We can play a game now.", voice: "Zephyr" },
            { speaker: "Teacher", text: "Stand up! Come here. Don't stay here.", voice: "Zephyr" },
            { speaker: "Teacher", text: "Go to your desk. Sit down. Thank you.", voice: "Zephyr" },
            { speaker: "Teacher", text: "Write your name.", voice: "Zephyr" }
          ],
          songText: "Commands Game (أوامر المعلم في الفصل):\nStand up.\nCome here.\nDon't stay here.\nGo to your desk.\nSit down.\nWrite your name."
        }
      },
      {
        id: 3,
        title: "Lesson 3: I can do actions!",
        type: "song",
        content: {
          songText: "I Can Do Actions Chant (أنشودة الأفعال والقدرات):\nI can look, I can point and I can read an English book.\nI can talk, I can write and I can walk.\nI can stand and I can run,\nI can hop, I can skip and stop!\n\nCount and say:\nHow many eyes can you see?\nHow many feet can you see?\nHow many people can you see?"
        }
      },
      {
        id: 4,
        title: "Lesson 4: Number Math",
        type: "vocab",
        content: {
          songText: "Math Addition (حساب الجمع بالإنجليزية):\nWhat is 2 and 7 and 6?\n2 and 7 and 6 make 15.\n\nWhat is 9 and 6 and 3?\n9 and 6 and 3 make 18.\n\nPhonics ee:\nsee, feet, tree, street."
        }
      },
      {
        id: 5,
        title: "Lesson 5: Bulbul and Billi Birds",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Bird 1", text: "That's our tree!", voice: "Zephyr" },
            { speaker: "Bird 2", text: "This isn't our tree! It hasn't got any fruit.", voice: "Kore" },
            { speaker: "Bird 1", text: "That tree is tall. Our tree is short.", voice: "Zephyr" },
            { speaker: "Bird 2", text: "This is our tree! It's short and the fruit is small.", voice: "Kore" }
          ],
          songText: "Two Little Birds Rhyme (قصيدة عصفوري الشجرة بلبل وبلي):\nTwo little birds in the tree. This is Bulbul. This is Billi.\nTwo little birds in the air. See them here. See them there.\nTwo little birds in the sky. See them go. See them fly!"
        }
      },
      {
        id: 6,
        title: "Lesson 6: Sand and Sea",
        type: "song",
        content: {
          songText: "I Like Chant (نشيد ما أحب وما لا أحب):\nI like the sand and the sea.\nI like the sun and the beach.\nI like ice cream, I like tea,\nand I don't like fish!\n\nPoint and say:\nI like bananas. I like milk.\nI don't like onions."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Wheels on the Car",
        type: "song",
        content: {
          songText: "The Wheels on the Car Song (أنشودة عجلات السيارة):\nThe wheels on the car go round and round, round and round, round and round.\nThe wheels on the car go round and round, round and round.\nThe windows on the car go up and down, up and down, up and down.\nThe windows on the car go up and down, up and down.\nThe doors on the car open and close, open and close, open and close!\nThe doors on the car open and close, open and close!"
        }
      },
      {
        id: 8,
        title: "Lesson 8: Action Verbs Revision",
        type: "vocab",
        content: {
          songText: "Action Verbs with 'It' (الأفعال الإنجليزية):\nStand with it.\nKick it.\nCatch it.\nThrow it.\nCut it.\nPlant it.\nWater it.\nGrow it.\nSay sentences with Don't: Don't kick it! Don't throw it!\n\nPhonics ea:\neat, beach, read, teacher."
        }
      }
    ]
  },

  // ==========================================
  // UNIT 9: ANIMALS
  // ==========================================
  {
    id: 9,
    title: "Animals",
    arabicTitle: "الحيوانات",
    color: "bg-orange-50 text-orange-950 border-orange-400",
    icon: "🦁",
    words: [
      { id: "w9-1", word: "Hen", arabic: "دجاجة", image: "🐔", example: "The little hen is on the farm.", soundText: "The little hen is on the farm.", unit: 9 },
      { id: "w9-2", word: "Cow", arabic: "بقرة", image: "🐄", example: "The cows are under the tree.", soundText: "The cows are under the tree.", unit: 9 },
      { id: "w9-3", word: "Goat", arabic: "ماعز", image: "🐐", example: "Goats live in the mountains.", soundText: "Goats live in the mountains.", unit: 9 },
      { id: "w9-4", word: "Crocodile", arabic: "تمساح", image: "🐊", example: "Crocodiles live in the River Nile.", soundText: "Crocodiles live in the River Nile.", unit: 9 },
      { id: "w9-5", word: "Hippo", arabic: "فرس النهر", image: "🦛", example: "Hippos can walk in the river.", soundText: "Hippos can walk in the river.", unit: 9 },
      { id: "w9-6", word: "Snake", arabic: "ثعبان", image: "🐍", example: "Snakes live in the hot desert.", soundText: "Snakes live in the hot desert.", unit: 9 },
      { id: "w9-7", word: "Camel", arabic: "جمل", image: "🐪", example: "Camels can walk on sand.", soundText: "Camels can walk on sand.", unit: 9 },
      { id: "w9-8", word: "Lion", arabic: "أسد", image: "🦁", example: "Lions can run in the long grass.", soundText: "Lions can run in the long grass.", unit: 9 },
      { id: "w9-9", word: "Elephant", arabic: "فيل", image: "🐘", example: "Elephants live in green forests.", soundText: "Elephants live in green forests.", unit: 9 },
      { id: "w9-10", word: "Monkey", arabic: "قرد", image: "🐒", example: "Monkeys swing in trees.", soundText: "Monkeys swing in trees.", unit: 9 },
      { id: "w9-11", word: "Whale", arabic: "حوت", image: "🐋", example: "Whales can sing in the deep sea.", soundText: "Whales can sing in the deep sea.", unit: 9 },
      { id: "w9-12", word: "Desert", arabic: "صحراء", image: "🏜️", example: "Camels walk across the desert.", soundText: "Camels walk across the desert.", unit: 9 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Farm Animals Rhyme",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Children", text: "Hello, little hen, how are you?", voice: "Zephyr" },
            { speaker: "Hen", text: "I'm fine, thank you. Cockle-doodle-doo!", voice: "Kore" },
            { speaker: "Children", text: "Hello, little cows, how are you?", voice: "Zephyr" },
            { speaker: "Cows", text: "We're fine, thank you. Moo, moo, moo!", voice: "Kore" },
            { speaker: "Children", text: "Hello, little goats, are you there?", voice: "Zephyr" },
            { speaker: "Goats", text: "Yes, we are! Maaa, maaa, maaa!", voice: "Kore" }
          ],
          songText: "Farm Animals Song (أنشودة حيوانات المزرعة):\nOne little hen on the wall: Cockle-doodle-doo!\nTwo little cows under the tree: Moo, moo, moo!\nThree little goats in the field: Maaa, maaa, maaa!"
        }
      },
      {
        id: 2,
        title: "Lesson 2: Nile Animals",
        type: "vocab",
        content: {
          songText: "Nile Animals Facts (حقائق كائنات نهر النيل):\nWe're Nile fish. We're 1 metre long. We've got sharp teeth. We lay eggs.\n\nWe're Nile crocodiles. We're 5 metres long. We've got sharp teeth. We lay eggs.\n\nWe're Nile hippos. We're 4 metres long. We've got long teeth. We don't lay eggs.\n\nWe're snakes. We are 3 metres long. We haven't got legs. We have got sharp teeth. We lay eggs. We eat frogs and insects."
        }
      },
      {
        id: 3,
        title: "Lesson 3: Map of Sudan & Habitats",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Teacher", text: "This is a map of Sudan. There are deserts, mountains and forests.", voice: "Zephyr" },
            { speaker: "Pupils", text: "We can see rivers and the Red Sea.", voice: "Kore" },
            { speaker: "Teacher", text: "Where do crocodiles live?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Crocodiles live in rivers!", voice: "Kore" },
            { speaker: "Fatma", text: "Monkeys live in forests and camels live in deserts.", voice: "Zephyr" }
          ],
          songText: "Where Animals Live (أين تعيش الحيوانات في بيئات السودان):\nCrocodiles live in rivers.\nMonkeys live in forests.\nCamels live in deserts.\nElephants live in forests.\nGoats live in the mountains.\nSnakes live in deserts."
        }
      },
      {
        id: 4,
        title: "Lesson 4: Animal Abilities",
        type: "song",
        content: {
          songText: "Abilities: Can and Can't (ما تستطيعه الحيوانات وما لا تستطيعه):\nThey can swim. They can't fly.\nElephants can walk and swim. They can't fly.\nBirds can fly and sing.\nFish can swim in the sea.\n\nPhonics ph:\nphone, photo, elephant, alphabet."
        }
      },
      {
        id: 5,
        title: "Lesson 5: Actions Grid",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "Lions can walk. Lions can't fly.", voice: "Kore" },
            { speaker: "Badr", text: "Can lions swim?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Yes, lions can swim and run.", voice: "Kore" },
            { speaker: "Badr", text: "I can swim, I can run and I can jump. What am I?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "A lion!", voice: "Kore" }
          ],
          songText: "Animals Action Grid:\nwalk, swim, hop, jump, talk, fly.\nLions can walk. Lions can't fly.\nParrots can fly and talk.\nBats can fly and jump."
        }
      },
      {
        id: 6,
        title: "Lesson 6: Camels of the Desert",
        type: "vocab",
        content: {
          songText: "Facts About Camels (حقائق عن الجمال):\nCamels have got short tails.\nCamels have got long legs.\nCamels can walk on sand.\nCamels can live in deserts.\nCamels can drink lots of water.\n\nSize:\nCamels are about 2 metres tall.\nThey are about 3 metres long."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Waheed the Camel",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Waheed", text: "Hello Mr Fox, I'm Waheed. I'm a camel. Can you be my friend, please?", voice: "Kore" },
            { speaker: "Fox", text: "No. I don't like camels. Camels are big.", voice: "Zephyr" },
            { speaker: "Waheed", text: "Hello Mr Snake, I'm Waheed. I'm a camel. Can you be my friend, please?", voice: "Kore" },
            { speaker: "Snake", text: "No. I don't like camels. Camels can stand on me!", voice: "Zephyr" },
            { speaker: "Waheed", text: "Hello Mrs Bird, I'm Waheed. I'm a camel. Can you be my friend, please?", voice: "Kore" },
            { speaker: "Bird", text: "No. I don't like camels. Camels can't fly.", voice: "Zephyr" },
            { speaker: "Waheed", text: "Hello, I'm Waheed. I'm a camel. Can you be my friend, please?", voice: "Kore" },
            { speaker: "Bedouin Boy", text: "Yes, I can! Camels can walk on sand. I like camels!", voice: "Zephyr" }
          ],
          songText: "Story of Waheed (قصة الجمل وحيد في الصحراء):\nWaheed asked the Fox: Camels are big.\nWaheed asked the Snake: Camels can stand on me.\nWaheed asked the Bird: Camels can't fly.\nWaheed met the Bedouin boy: Yes, camels can walk on sand. I like camels!"
        }
      },
      {
        id: 8,
        title: "Lesson 8: Animals in Nature",
        type: "song",
        content: {
          songText: "Animals in Nature Poem (قصيدة الحيوانات في الطبيعة):\nA lion can sleep in the long grass.\nA monkey can swing in a tree.\nA hippo can walk in the river.\nA whale can sing in the sea.\n\nA lion can run in the long grass.\nA monkey can climb up a tree.\nA hippo can swim in the river,\nbut a whale can sing in the sea!\n\nPhonics ay:\nsay, day, way, today, play."
        }
      }
    ]
  }
];
