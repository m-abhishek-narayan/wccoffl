const players = [
  {
    "id": 1,
    "name": "Julie",
    "dob": "09-Jan",
    "details": "Julie is known for her calm nature and creative ideas.",
    "image": "/img/players/Julie.jpg"
  },
  {
    "id": 2,
    "name": "Sriram R",
    "dob": "12-Jan",
    "nickname": "Captain X",
    "details": "Sriram is the group's leader when it comes to planning events.",
    "image": "/img/players/Sriram.png"
  },
  {
    "id": 3,
    "name": "Rahul",
    "dob": "15-Jan",
    "nickname": "Bull Mama",
    "details": "Rahul is the powerhouse of the group with unmatched energy.",
    "image": "/img/players/Rahul.jpg"
  },
  {
    "id": 4,
    "name": "Ram",
    "dob": "27-Jan",
    "nickname": "Rayar",
    "details": "Ram is a silent observer with a witty sense of humor.",
    "image": "/img/players/Ram.png"
  },
  {
    "id": 5,
    "name": "Viswa",
    "dob": "26-Mar",
    "nickname": "Gilma Mama",
    "details": "Viswa brings the spice to every hangout with his sarcasm.",
    "image": "/img/players/Viswa.png"
  },
  {
    "id": 6,
    "name": "Mahen",
    "dob": "11-Apr",
    "nickname": "Data Mama",
    "details": "Mahen is the tech brain who always has facts ready.",
    "image": "/img/players/Mahen.png"
  },
  {
    "id": 7,
    "name": "Ravi",
    "dob": "18-Apr",
    "details": "Ravi is the chill soul who vibes with everyone.",
    "image": "/img/players/Ravi.png"
  },
  {
    "id": 8,
    "name": "Jegan",
    "dob": "11-May",
    "details": "Jegan brings laughter with his natural comedic timing.",
    "image": "/img/players/Jegan.png"
  },
  {
    "id": 9,
    "name": "Shiva",
    "dob": "20-May",
    "nickname": "Pudhu Shoe",
    "details": "Shiva always brings new ideas and freshness to the group.",
    "image": "/img/players/PSS.jpg"
  },
  {
    "id": 10,
    "name": "Madhu",
    "dob": "26-May",
    "nickname": "Pottu Mama",
    "details": "Madhu has a big heart and an even bigger appetite for fun.",
    "image": "/img/players/Madhu.png"
  },
  {
    "id": 11,
    "name": "Arun",
    "dob": "29-May",
    "nickname": "Mr. Cricket",
    "details": "Arun lives and breathes cricket and strategy.",
    "image": "/img/players/Arun.png"
  },
  {
    "id": 12,
    "name": "Maddy",
    "dob": "31-May",
    "nickname": "Balls Mama",
    "details": "Maddy is bold, expressive, and always up for mischief.",
    "image": "/img/players/Maddy.png"
  },
  {
    "id": 13,
    "name": "Karthik",
    "dob": "09-Jun",
    "nickname": "LBK",
    "details": "Karthik is the smooth talker who can charm his way through anything.",
    "image": "/img/players/Lbk.jpg"
  },
  {
    "id": 14,
    "name": "Anand",
    "dob": "14-Jun",
    "nickname": "Kawa Anand",
    "details": "Anand is the classic wisecrack who always gets the last laugh.",
    "image": "/img/players/Anand.jpg"
  },
  {
    "id": 15,
    "name": "Sudharma",
    "dob": "20-Jun",
    "details": "Sudharma is lowkey but always shows up when it counts.",
    "image": "/img/players/Sudharma.png"
  },
  {
    "id": 16,
    "name": "Johnny",
    "dob": "24-Jun",
    "nickname": "Mr. Bunk",
    "details": "Johnny is unpredictable and always entertaining.",
    "image": "/img/players/Johnny.png"
  },
  {
    "id": 17,
    "name": "Arvind",
    "dob": "03-Aug",
    "details": "Arvind keeps the group grounded with practical wisdom.",
    "image": "/img/players/Aravind.png"
  },
  {
    "id": 18,
    "name": "Rajesh Ramadoss",
    "dob": "03-Aug",
    "nickname": "Gucci / Guna Nathar",
    "details": "Rajesh has an eye for style and unmatched storytelling skills.",
    "image": "/img/players/gucci.png"
  },
  {
    "id": 19,
    "name": "YY",
    "dob": "19-Aug",
    "details": "YY is the enigma — always surprising the crew.",
    "image": "/img/players/YY.png"
  },
  {
    "id": 20,
    "name": "Sivaram",
    "dob": "31-Aug",
    "nickname": "Sarakku Mama",
    "details": "Sivaram is the party starter and everyone's hype guy.",
    "image": "/img/players/Siva.png"
  },
  {
    "id": 21,
    "name": "Dinesh",
    "dob": "04-Sep",
    "nickname": "Big D",
    "details": "Dinesh has the loudest laugh and the biggest heart.",
    "image": "/img/players/big d.jpg"
  },
  {
    "id": 22,
    "name": "Sridhar",
    "dob": "12-Sep",
    "nickname": "Mr. White",
    "details": "Sridhar brings logic and structure wherever he goes.",
    "image": "/img/players/Sridhar.png"
  },
  {
    "id": 23,
    "name": "Badri",
    "dob": "25-Sep",
    "details": "Badri is the quiet fixer — solves things without drama.",
    "image": "/img/players/Badri.png"
  },
  {
    "id": 24,
    "name": "Vivek",
    "dob": "28-Sep",
    "nickname": "Dosa Mama",
    "details": "Vivek has legendary cooking skills and life advice.",
    "image": "/img/players/Vivek.png"
  },
  {
    "id": 25,
    "name": "Venkat",
    "dob": "29-Sep",
    "nickname": "Vulture",
    "details": "Venkat watches everything and never misses a beat.",
    "image": "/img/players/Venkat.jpg"
  },
  {
    "id": 26,
    "name": "Thots",
    "dob": "11-Oct",
    "nickname": "Big Mama",
    "details": "Thots keeps everyone laughing, even on a bad day.",
    "image": "/img/players/Thots.png"
  },
  {
    "id": 27,
    "name": "Karthik",
    "dob": "15-Oct",
    "nickname": "Kothanar",
    "details": "This Karthik has the best comebacks and killer timing.",
    "image": "/img/players/Karthik.png"
  },
  {
    "id": 28,
    "name": "Hema",
    "dob": "22-Oct",
    "details": "Hema keeps the chaos under control with her planning.",
    "image": "/img/players/Hema.png"
  },
  {
    "id": 29,
    "name": "Prabhu",
    "dob": "23-Oct",
    "details": "Prabhu brings balance with his deep thoughts and calm nature.",
    "image": "/img/players/Prabhu.png"
  },
  {
    "id": 30,
    "name": "Sriram N",
    "dob": "03-Nov",
    "details": "Sriram N is the creative genius of the group.",
    "image": "/img/players/Sriram N.jpg"
  },
  {
    "id": 31,
    "name": "Swami",
    "dob": "05-Nov",
    "nickname": "Shema Kawa Mama",
    "details": "Swami is unpredictable and always a thrill to have around.",
    "image": "/img/players/Swami.png"
  },
  {
    "id": 32,
    "name": "Karthik Narayan",
    "dob": "10-Nov",
    "nickname": "Vadama",
    "details": "Karthik Narayan brings tradition with a modern twist.",
    "image": "/img/players/cfo.png"
  },
  {
    "id": 33,
    "name": "Jeyanth",
    "dob": "15-Nov",
    "nickname": "Mr. J",
    "details": "Jeyanth adds drama and flair to every conversation.",
    "image": "/img/players/Jeyanth.jpg"
  },
  {
    "id": 34,
    "name": "Naresh",
    "dob": "21-Nov",
    "details": "Naresh is the all-rounder — dependable and cool.",
    "image": "/img/players/Naresh.png"
  },
  {
    "id": 35,
    "name": "Prashanth",
    "dob": "27-Nov",
    "nickname": "Devan",
    "details": "Prashanth has a divine sense of humor and charm.",
    "image": "/img/players/Prashanth.png"
  },
  {
    "id": 36,
    "name": "Karthik G",
    "dob": "30-Nov",
    "details": "Karthik G is all about energy and fast thinking.",
    "image": "/img/players/Karthik.jpg"
  },
  {
    "id": 37,
    "name": "Danny",
    "details": "Danny is mysterious and always full of surprises.",
    "image": "/img/players/Danny.jpg"
  },
  {
    "id": 38,
    "name": "Abhishek",
    "dob": "08-Dec",
    "details": "Abhishek is the mastermind who always has a plan.",
    "image": "/img/players/Abhishek.jpg"
  },
  {
    "id": 39,
    "name": "Aaji",
    "details": "Aaji has the coolest perspective on everything.",
    "image": "/img/players/Aaji.png"
  },
  {
    "id": 40,
    "name": "Vishal",
    "details": "Vishal’s energy is contagious and unforgettable.",
    "image": "/img/players/Vishal.png"
  },
  {
    "id": 41,
    "name": "Vishwajit",
    "details": "Vishwajit is calm, collected, and a natural leader.",
    "image": "/img/players/Vishwajit.png"
  },
  {
    "id": 42,
    "name": "Aadhavan",
    "details": "Aadhavan’s thoughtfulness and loyalty are unmatched.",
    "image": "/img/players/Aadhavan.png"
  },
  {
    "id": 43, 
    "name": "Rajesh", 
"nickname": "Roller",
    "details": "Rajesh is a good left hand batsman ", 
    "image": "/img/players/Rajesh.png" 
  } 
];


export default players;
