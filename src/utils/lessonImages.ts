/**
 * Utility to map Sudanese SMILE Syllabus Grade 3 (Book 1) units and lessons
 * to dedicated, high-quality, culturally authentic educational illustrations.
 * Incorporates custom Nano Banana storybook illustrations and tailored educational visuals.
 */

const LESSON_IMAGE_MAP: Record<string, string> = {
  "1-1": "/illustrations/lessons/u1_l1.jpg", // Lesson 1: Hello!
  "1-2": "/illustrations/lessons/u1_l2.jpg", // Lesson 2: Numbers 1 to 4
  "1-3": "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80", // Lesson 3: Numbers 5 to 10
  "1-4": "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80", // Lesson 4: What's your name?
  "1-5": "/illustrations/lessons/u1_l5.jpg", // Lesson 5: This is Eddie
  "1-6": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80", // Lesson 6: Are you Sudanese?
  "1-7": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", // Lesson 7: How are you?
  "1-8": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80", // Lesson 8: Phonics Song
  "2-1": "/illustrations/lessons/u2_l1.jpg", // Lesson 1: Crocodile Chant
  "2-2": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80", // Lesson 2: How old are you?
  "2-3": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80", // Lesson 3: How many frogs?
  "2-4": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80", // Lesson 4: Ten Cats
  "2-5": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80", // Lesson 5: Little Ali is Lost
  "2-6": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // Lesson 6: Ali Finds His Mum
  "2-7": "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80", // Lesson 7: What's the time?
  "2-8": "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80", // Lesson 8: Phonics (m to z)
  "3-1": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80", // Lesson 1: Point to Colours
  "3-2": "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80", // Lesson 2: Colour Bingo
  "3-3": "https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=800&q=80", // Lesson 3: Traffic Lights
  "3-4": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", // Lesson 4: What colour is it?
  "3-5": "/illustrations/lessons/u3_l5.jpg", // Lesson 5: Our Sudanese Flag
  "3-6": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80", // Lesson 6: Cathy's Picture
  "3-7": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80", // Lesson 7: Ali is Lost (Eyes and Hair)
  "3-8": "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=800&q=80", // Lesson 8: Finding Ali
  "4-1": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80", // Lesson 1: Lemons and Melons
  "4-2": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80", // Lesson 2: Who is that boy?
  "4-3": "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80", // Lesson 3: My Body
  "4-4": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80", // Lesson 4: How old are you? (Cards)
  "4-5": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80", // Lesson 5: Animal Features
  "4-6": "/illustrations/lessons/u4_l6.jpg", // Lesson 6: Gonfooth the Hedgehog
  "4-7": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", // Lesson 7: Photos of Sudan
  "4-8": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80", // Lesson 8: Names with A and B
  "5-1": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80", // Lesson 1: Point to the Class
  "5-2": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", // Lesson 2: What's in the bag?
  "5-3": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80", // Lesson 3: Photos from School
  "5-4": "/illustrations/lessons/u5_l4.jpg", // Lesson 4: The Monkey on the Chair
  "5-5": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80", // Lesson 5: Where's my toy?
  "5-6": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80", // Lesson 6: Sukkar's Tail
  "5-7": "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80", // Lesson 7: Where's the ruler?
  "5-8": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", // Lesson 8: Hello, I'm Hassan
  "6-1": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80", // Lesson 1: In the Kitchen
  "6-2": "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80", // Lesson 2: Town Places
  "6-3": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80", // Lesson 3: Where do you live?
  "6-4": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80", // Lesson 4: Sea, Shell and Well
  "6-5": "/illustrations/lessons/u6_l5.jpg", // Lesson 5: Animals and Trees
  "6-6": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80", // Lesson 6: Plant the Seeds
  "6-7": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", // Lesson 7: Where I Live
  "6-8": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", // Lesson 8: My Home is Best
  "7-1": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80", // Lesson 1: This is me
  "7-2": "/illustrations/lessons/u7_l2.jpg", // Lesson 2: Dalia's Family Tree
  "7-3": "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80", // Lesson 3: Have you got any brothers?
  "7-4": "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=800&q=80", // Lesson 4: Rami and his Sisters
  "7-5": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80", // Lesson 5: Stand next to your brother
  "7-6": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80", // Lesson 6: The Baby Chick
  "7-7": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80", // Lesson 7: Adil's Day
  "7-8": "https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=800&q=80", // Lesson 8: Family Revision
  "8-1": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80", // Lesson 1: What can you see?
  "8-2": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", // Lesson 2: Simple Commands
  "8-3": "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80", // Lesson 3: I can do actions!
  "8-4": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80", // Lesson 4: Number Math
  "8-5": "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80", // Lesson 5: Bulbul and Billi Birds
  "8-6": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Lesson 6: Sand and Sea
  "8-7": "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=800&q=80", // Lesson 7: Wheels on the Car
  "8-8": "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80", // Lesson 8: Action Verbs Revision
  "9-1": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80", // Lesson 1: Farm Animals Rhyme
  "9-2": "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80", // Lesson 2: Nile Animals
  "9-3": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80", // Lesson 3: Map of Sudan & Habitats
  "9-4": "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80", // Lesson 4: Animal Abilities
  "9-5": "https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?auto=format&fit=crop&w=800&q=80", // Lesson 5: Actions Grid
  "9-6": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80", // Lesson 6: Camels of the Desert
  "9-7": "/illustrations/lessons/u9_l7.jpg", // Lesson 7: Waheed the Camel
  "9-8": "https://images.unsplash.com/photo-1501535033-a59396afb33d?auto=format&fit=crop&w=800&q=80", // Lesson 8: Animals in Nature
  "10-1": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80", // Lesson 1: Food and Body Rhyme
  "10-2": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80", // Lesson 2: In the Fridge & On the Shelf
  "10-3": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80", // Lesson 3: Fruit or Vegetable?
  "10-4": "/illustrations/lessons/u10_l4.jpg", // Lesson 4: How to Make Mango Juice
  "10-5": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", // Lesson 5: The Five Senses
  "10-6": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80", // Lesson 6: Fruit and Vegetables Science
  "10-7": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", // Lesson 7: Sudanese Breakfast
  "10-8": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", // Lesson 8: Food Revision
  "11-1": "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=800&q=80", // Lesson 1: Where is the Museum?
  "11-2": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", // Lesson 2: What can we do there?
  "11-3": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80", // Lesson 3: In the Park
  "11-4": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80", // Lesson 4: Keep the Park Tidy
  "11-5": "https://images.unsplash.com/photo-1584697964190-7bb0db32e0e9?auto=format&fit=crop&w=800&q=80", // Lesson 5: Rubbish in the Classroom
  "11-6": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80", // Lesson 6: Caring for our Environment
  "11-7": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80", // Lesson 7: Two Trees Tale
  "11-8": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", // Lesson 8: Environment Revision
  "12-1": "/illustrations/lessons/u12_l1.jpg", // Lesson 1: Clothes on the Line
  "12-2": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80", // Lesson 2: Whose is this?
  "12-3": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80", // Lesson 3: Grandma's Eid Clothes
  "12-4": "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80", // Lesson 4: Eid at the Zoo
  "12-5": "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80", // Lesson 5: Visiting Grandma's House
  "12-6": "/illustrations/lessons/u12_l6.jpg", // Lesson 6: How to Bake an Eid Cake
  "12-7": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80", // Lesson 7: Eid Morning Schedule
  "12-8": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", // Lesson 8: Eid Manners & Revision
};

const LESSON_SUDANESE_CARTOON_DESC: Record<string, string> = {
  "1-1": "لوحة نانو بنانا كرتونية مبهجة لطلاب سودانيين بالزي المدرسي يلوحون بالتحية خارج فصل مدرستهم الابتدائية تحت شجرة النيم في يوم مشمس.",
  "1-2": "رسم نانو بنانا تعليمي مرح يعرض الأرقام 1 و 2 و 3 و 4 بألوان زاهية مع تفاحة واحدة وحقيبتين وثلاثة أسرة وأربع قبعات داخل الفصل.",
  "1-3": "مكعبات ملونة وأرقام خشبية زاهية من 5 إلى 10 تساعد تلميذ الصف الثالث على عد الأدوات والمجسمات في ركن الرياضيات.",
  "1-4": "أطفال صغار في ساحة المدرسة يتعرفون على بعضهم البعض بابتسامة ويسألون عن الأسماء بأسلوب ودود ومبهج.",
  "1-5": "لوحة نانو بنانا معبرة لداليا وهي تقدم صديقها إيدي إلى زملائها أحمد وكاثي في باحة المدرسة المليئة بالألعاب والأشجار.",
  "1-6": "خريطة القارة الإفريقية توضح موقع السودان ونهر النيل الخالد لتعليم التلاميذ أسماء الدول والجنسيات.",
  "1-7": "تلاميذ في الصف الثالث يتبادلون التحيات الصباحية بالإنجليزية: 'I am fine, thank you' بوجوه مشرقة ومطمئنة.",
  "1-8": "أنشودة الحروف الصوتية الأولى a و b و c مع بطاقات مصورة للتفاحة والسرير والقطة بطريقة موسيقية ممتعة.",
  "2-1": "لوحة نانو بنana مائية ساحرة لتماسيح صغيرة مبتسمة تسبح في نهر النيل مرقمة من 1 إلى 6 عند الغروب مع مركب شراعي ونخيل.",
  "2-2": "كعكة عيد ميلاد ملونة مع شموع مرقمة يتعلم معها التلاميذ الإجابة عن أعمارهم: 'I am eight years old'.",
  "2-3": "ضفادع خضراء لطيفة تقفز حول بركة مياه صافية بين أوراق الزنبق ليتعلم الأطفال عد الكائنات الحية.",
  "2-4": "قطط أليفة ومرحة تجلس في حديقة المنزل يتعلم التلاميذ عدها من واحد إلى عشرة بلطف ومودة.",
  "2-5": "السوق الشعبي بمدينة أم درمان والمتاجر التراثية حيث يبحث الصغير علي عن أمه بمساعدة شرطي المرور الطيب.",
  "2-6": "مشهد مؤثر وسعيد لعودة الصبي علي لأمه بجوار سوق الدجاج والطيور وابتسامة الراحة والاطمئنان.",
  "2-7": "ساعة حائط كلاسيكية بعقارب واضحة يتعلم منها الطلاب قراءة الوقت بالساعات التامة: 3 o'clock و 7 o'clock.",
  "2-8": "بطاقات الحروف الهجائية الصوتية من m إلى z مع رسومات لرجل وقلم وشمس وشارع لتثبيت الأصوات الإنجليزية.",
  "3-1": "لوحة ألوان زاهية وفرشاة رسم ملونة لتعليم الأطفال الإشارة إلى الأحمر والأصفر والأزرق والأخضر.",
  "3-2": "لعبة بطاقات البينغو التفاعلية مع دوائر ملونة يتنافس فيها تلاميذ الصف الثالث في مطابقة الألوان بسرعة.",
  "3-3": "إشارة المرور ثلاثية الألوان (أحمر للتوقف، أصفر للاستعداد، أخضر للانطلاق) في شارع النيل بالخرطوم.",
  "3-4": "أقلام تلوين شمعية ومائية متنوعة يتعلم بها الطلاب تسمية درجات الألوان البنية والبرتقالية والبيضاء.",
  "3-5": "لوحة نانو بنانا وطنية لتلاميذ سودانيين يرفعون علم السودان بألوانه الأربعة في طابور الصباح المدرسي بفخر وسعادة.",
  "3-6": "رسومات الأطفال الفنية المعلقة على لوحة الفصل والتي رسمتها كاثي وزملائها لبيوتهم وألعابهم.",
  "3-7": "أوصاف ملامح الوجه وألوان العيون البنية والشعر الأسود لتدريب التلاميذ على التعبير الدقيق عن المظهر.",
  "3-8": "اجتماع العائلة والأصدقاء في بهجة بعد العثور على الصبي علي مع تقديم الشكر لمن ساعد في البحث عنه.",
  "4-1": "سلة فاكهة طازجة تحتوي على ليمون أصفر وبطيخ وشمام سوداني لذيذ لتعليم جمل الملكية: 'I have got a lemon'.",
  "4-2": "صورة فوتوغرافية لطفل سوداني وسيم يرتدي قميصاً أنيقاً يتعرف التلاميذ على اسمه وعمره وفصله الدراسي.",
  "4-3": "رسم توضيحي تعليمي لأجزاء الجسم: الرأس، الذراع، اليد، الساق، والقدم مع أنشودة الحركة والنشاط.",
  "4-4": "بطاقات الهوية المدرسية للتلاميذ (هبة، رامي، داليا) توضح العمر والجنسية والفصل بطريقة منظمة.",
  "4-5": "مقارنة مميزات الحيوانات: خرطوم الفيل الطويل، رقبة الزرافة الشامخة، وذيل القرد اللعوب.",
  "4-6": "لوحة نانو بنانا رائعة للقنفذ اللطيف قنفود يجلس تحت نخلة بلح يأكل التمر الحلو ويلوح للطيور المغردة.",
  "4-7": "ألبوم صور تذكارية لمعالم السودان الجميلة: الأهرامات التاريخية، شلالات السبلوقة، ومزارع القصب الخضراء.",
  "4-8": "كراسة تدريبات مدرسية تحتوي على أسماء تبدأ بحرف A و B مثل: آدم، أحمد، علي، وبدر.",
  "5-1": "فصل دراسي مشرق ومجهز بسبورة ومقاعد ونافذة تطل على حديقة المدرسة للإشارة إلى عناصر الغرفة الصفية.",
  "5-2": "حقيبة مدرسية مفتوحة يخرج منها كتاب التلميذ، المسطرة، الممحاة، والمقلمة بالألوان الزاهية.",
  "5-3": "تلاميذ المدرسة في الصف يرفعون أقلامهم الرصاص الملونة بجوار كتب اللغة الإنجليزية في نشاط تفاعلي.",
  "5-4": "لوحة نانو بنانا تعليمية لحروف الجر: قرد صغير فوق الكرسي، قطة بيضاء نائمة تحت الطاولة، وحقيبة بجانب المقعد.",
  "5-5": "لعبة دمية دب قطيفة وسيارة سباق صغيرة يبحث عنها الأطفال داخل خزانة الألعاب المدرسية.",
  "5-6": "القطة سكر ذات الذيل الطويل والأذنين البيضاوين تلعب في فناء المدرسة وتثير بهجة التلاميذ.",
  "5-7": "أدوات القياس المدرسية: مسطرة طويلة صفراء وقلم رصاص حاد على دفتر تخطيط مربعات أنيق.",
  "5-8": "التلميذ حسن من مدينة الفاشر يلقي كلمة تعريفية مهذبة أمام زملائه بالفصل لتبادل الصداقة والترحيب.",
  "6-1": "مطبخ المنزل العائلي الأنيق مع إبريق الشاي والأطباق النظيفة لتعليم غرف وأركان البيت.",
  "6-2": "شوارع المدينة الهادئة مع المستشفى، مكاتب البريد، والمحلات التجارية لتعليم أماكن الحي والبلدة.",
  "6-3": "مساكن الحيوانات والطيور: العش في الشجرة، والخلية للنحل، والمنزل الدافئ للعائلة.",
  "6-4": "شاطئ البحر الأحمر بمدينة بورتسودان مع صدفة بحرية لامعة وبئر ماء عذب وصوت الحرف Sh.",
  "6-5": "لوحة نانو بنانا لشجرة نيم وارفة الظلال في قرية سودانية يعيش فيها قرد وفأر وطيور ويزرع الأطفال شتلات جديدة.",
  "6-6": "أيدي أطفال تعتني بتربة الحديقة وتغرس بذور الأزهار وتسقيها بالماء لتنبت براعم خضراء يانعة.",
  "6-7": "شقة سكنية عصرية مريحة في عمارة بالخرطوم مع شرفة تطل على أشجار النخيل والحديقة.",
  "6-8": "صالة الجلوس الدافئة بالمنزل العائلي مع ستائر جميلة وسجادة تراثية تؤكد أن مسكن العائلة هو الأفضل.",
  "7-1": "تلميذة مبتسمة تقف في حديقة المنزل وترحب بأصدقائها لتعريفهم على عائلتها المترابطة.",
  "7-2": "لوحة نانو بنانا بديعة لشجرة عائلة داليا مع صور مؤطرة للجد الحكيم والجدة والوالدين وبدر وداليا مع أطباق القش التراثية.",
  "7-3": "أخوة صغار يلعبون معاً في فناء المنزل لتعليم صيغة السؤال عن الأخوة والأخوات بالإنجليزية.",
  "7-4": "رامي وأخواته يقرؤون قصة مصورة تحت شجرة الليمون في جلسة أسرية مفعمة بالمحبة.",
  "7-5": "أطفال يقفون بجوار بعضهم بترتيب أنيق لالتقاط صورة عائلية وتطبيق حروف الجر: next to و between.",
  "7-6": "كتكوت أصفر صغير في مزرعة القرية يلتقي بالبقرة والحمار والخروف في قصة مسلية عن المواعيد والأوقات.",
  "7-7": "الجدول اليومي للصبي عادل: الاستيقاظ مبكراً، صلاة الصبح، الذهاب للمدرسة، وحل الواجبات المدرسية.",
  "7-8": "مراجعة شاملة لأسماء أفراد الأسرة في الغرف المختلفة (غرفة المعيشة، المطبخ، والحديقة).",
  "8-1": "صندوق ألعاب ممتلئ بالكرات الملونة والطائرات الورقية والدمى لتشجيع التلاميذ على السؤال عما يرونه.",
  "8-2": "لعبة أوامر المعلم في الفصل: 'Stand up', 'Sit down', 'Clap your hands' وسط حماس ونشاط التلاميذ.",
  "8-3": "أطفال يقفزون ويركضون في الملعب الرياضي للتعبير عن مهاراتهم: 'I can jump, I can run'.",
  "8-4": "عمليات جمع بسيطة وممتعة بالإنجليزية على السبورة: 5 + 3 = 8 باستخدام حبات الفول والأقلام.",
  "8-5": "عصفوران مغردان جميلان (بلبل وبيلي) يقفان على غصن شجرة مزهرة ويغنيان أعذب الألحان.",
  "8-6": "قلاع رملية بديعة يصنعها الأطفال على شاطئ البحر باستخدام المجرفة والدلو الملون.",
  "8-7": "سيارة لعبة صغيرة تسير عجلاتها بنعومة مع أنشودة: 'The wheels on the car go round and round'.",
  "8-8": "بطاقات حركية تفاعلية للأفعال الإنجليزية: المشي، الركض، السباحة، والطيران للمراجعة والتثبيت.",
  "9-1": "مزرعة سودانية جميلة بها أبقار وخراف ودجاج يقتات على العشب الأخضر مع نشيد حيوانات المزرعة.",
  "9-2": "كائنات نهر النيل: فرس النهر يسبح برأسه فوق الماء، وأسماك النيل الفضية، والطيور المائية المهاجرة.",
  "9-3": "خريطة بيئات السودان الجغرافية: الصحراء الشمالية، السافانا الغنية، وجبال البحر الأحمر ومواطن الحيوانات.",
  "9-4": "قدرات الحيوانات المدهشة: الفهد الصياد سريع الجري، والنسر المحلق في الفضاء، والأسد المهيب.",
  "9-5": "جدول تصنيفي تفاعلي يحدد ما يستطيع الحيوان فعله: Walk, Swim, Fly, Jump.",
  "9-6": "جمال الصحراء الأصيلة تسير في قوافل فوق الرمال الذهبية وتتحمل العطش بحكمة وصبر.",
  "9-7": "لوحة نانو بنانا معبرة للجمل وحيد يبتسم على الكثبان الذهبية مع شجرة سنط وعصفورين يغردان وأهرامات البجراوية بالخلف.",
  "9-8": "محمية الدندر الطبيعية بالسودان حيث ترعى الغزلان والزرافات بسلام بين المراعي الخضراء.",
  "10-1": "مائدة طعام صحية ممتلئة بالخضروات الطازجة والفواكه والحليب لبناء عضلات وعظام قوية.",
  "10-2": "ثلاجة المنزل وأرفف المؤونة مرتبة بعناية: البيض والجبن بالداخل والخبز والأرز على الرف.",
  "10-3": "سلتان ملونتان لتصنيف الأطعمة: سلة الفواكه (الموز والبرتقال) وسلة الخضروات (الجزر والطماطم والخيار).",
  "10-4": "لوحة نانو بنانا تعليمية مصورة لخطوات إعداد عصير المانجو السوداني الطازج خطوة بخطوة بالخلاط مع الطفلة داليا.",
  "10-5": "الحواس الخمس في تذوق الأطعمة: البصر للجمال، الشم للروائح الشهية، والتذوق للنكهات اللذيذة.",
  "10-6": "درس علوم مبسط يوضح احتواء الفواكه على بذور ونموها من أزهار الأشجار مقارنة بالخضروات الورقية.",
  "10-7": "مائدة الإفطار السوداني التقليدي اللذيذ: صحن الفول المصلح بزيت السمسم، الطعمية المقرمشة، وشاي اللبن المقنن.",
  "10-8": "مراجعة شاملة لجميع الأطعمة والمشروبات بالإنجليزية مع عبارات الطلب المهذب: 'I would like tea, please'.",
  "11-1": "متحف السودان القومي على شارع النيل بالخرطوم مع تماثيل وحضارة كرمة ومروي القديمة.",
  "11-2": "الأماكن المجتمعية بالمدينة: المكتبة العامة للقراءة، والحديقة للعب، والمسجد للصلاة.",
  "11-3": "منتزه عائلي مخضر وجميل تلعب فيه العائلات والأطفال على الأراجيح والعشب النظيف.",
  "11-4": "أطفال يضعون العلب والأوراق الفارغة في سلة المهملات للحفاظ على نظافة المنتزه وجمال الطبيعة.",
  "11-5": "حملة النظافة المدرسية: طلاب الصف الثالث يتعاونون في ترتيب مقاعد الفصل ومسح السبورة وجمع الأوراق.",
  "11-6": "رعاية البيئة وحمايتها: غرس الأشجار وتوفير مياه الشرب للطيور وعدم قطف الأزهار البرية.",
  "11-7": "قصة الشجرتين: شجرة حزينة جافة وشجرة خضراء سعيدة تظلل المارة وطيور النيل بفيئها.",
  "11-8": "أنشودة الطبيعة: 'Ali, Ali, what can you see?' مع إطلالة خلابة على الطبيعة النيلية الساحرة.",
  "12-1": "لوحة نانو بنانا احتفالية لملابس العيد الجديدة الزاهية معلقة على حبل الغسيل بفناء المنزل مع بهجة الأطفال بالعيد.",
  "12-2": "السؤال عن ملكية ملابس العيد: 'Whose dress is this? It is Dalia's dress' بأجواء احتفالية راقية.",
  "12-3": "ثوب الجدة السوداني الفاخر المطرز بألوان زاهية وتهنئة الأحفاد لها بحلول عيد الفطر السعيد.",
  "12-4": "رحلة العيد السعيدة مع الأسرة إلى حديقة الحيوان ومشاهدة القرود والزرافات والطيور الملونة.",
  "12-5": "زيارة بيت الجدة في صبيحة العيد وتبادل المصافحة والحلويات السودانية في جو من البر والمحبة.",
  "12-6": "لوحة نانو بنانا تراثية دافئة للحبوبة وحفيدتها تنخلان السكر الناعم فوق صينية كعك العيد الدائري في مطبخ سوداني أصيل.",
  "12-7": "برنامج صباح العيد: صلاة العيد في الساحة، ارتداء الملابس الجديدة، وتناول الفطور مع الأهل والأقارب.",
  "12-8": "آداب العيد الإسلامية والاجتماعية: تبادل التهاني 'Happy Eid', إفشاء السلام، والتراحم والعطف على المحتاجين.",
};

/**
 * Returns a beautiful, context-relevant educational image URL for the given unit and lesson combination.
 * Defaults to a beautiful science, reading, or world image if not found in mapping.
 */
export function getLessonImageUrl(unitId: number, lessonId: number): string {
  const key = `${unitId}-${lessonId}`;
  return LESSON_IMAGE_MAP[key] || "/illustrations/lessons/u1_l1.jpg";
}

/**
 * Returns a beautiful Arabic description detailing how this cartoon illustration
 * reflects Sudanese real life, geography, culture, or student environment.
 */
export function getLessonCartoonDesc(unitId: number, lessonId: number): string {
  const key = `${unitId}-${lessonId}`;
  return LESSON_SUDANESE_CARTOON_DESC[key] || "توضيح كرتوني تفاعلي لطلاب السودان بلمسات تعليمية مبهجة.";
}
