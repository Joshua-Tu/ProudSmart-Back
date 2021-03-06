require("./connect");
require("dotenv").config(); //need access to .env
const CourseModel = require("./models/course_model"); //need access to the Course Model
const UserModel = require("./models/user_model"); //need access to the user Model
const faker = require("faker"); //need faker in order to generate data
const _ = require("lodash");

const interestTags = [
  "Internet of things",
  "Machine Learning",
  "Artificial Inteligence",
  "Cloud",
  "Dev Ops",
  "Infrastructure"
];
const materials = ["3 text books", "5 videos", "6 documents"];
const certified = [true, false];
const recommendedPrerequisites = [
  "fundamentals of programming",
  "CS50",
  "fundamentals of C#",
  "fundamentals of GoLang"
];
const keyConcepts = [
  "Learning async JS",
  "Web APIs",
  "Node",
  "Express",
  "Mongo",
  "React"
];

const courseTitles = ["intro", "maths", "stats", "algebra", "grammar"];

const qualifications = [
  "Three Year Bachelor Pass Degree",
  "Four Year Bachelor Pass Degree",
  "Four Year Bachelor Honours Degree",
  "One Year Bachelor Honours Degree",
  "Double Bachelor Degree",
  "Graduate Entry Bachelor Degree",
  "Graduate Certificate",
  "Graduate Diploma",
  "Masters by Coursework Degree",
  "Masters by Research Degree",
  "Doctoral Degrees by Thesis",
  "Higher Doctoral Degree",
  "Honorary Doctoral Degree",
  "Three Year Bachelor Pass Degree",
  "Four Year Bachelor Pass Degree",
  "Four Year Bachelor Honours Degree",
  "One Year Bachelor Honours Degree",
  "Double Bachelor Degree",
  "Graduate Entry Bachelor Degree",
  "Graduate Certificate",
  "Graduate Diploma",
  "Masters by Coursework Degree",
  "Masters by Research Degree",
  "Doctoral Degrees by Thesis",
  "Higher Doctoral Degree",
  "Honorary Doctoral Degree"
];

const profilePictureURL = [
  "https://proudsmarts3bucket.s3.ap-southeast-2.amazonaws.com/profile_pictures/Ruby-1563855984717.png",
  "https://proudsmarts3bucket.s3.ap-southeast-2.amazonaws.com/profile_pictures/GoLang-1563856030327.jpeg",
  "https://proudsmarts3bucket.s3.ap-southeast-2.amazonaws.com/profile_pictures/C%23-1563856065189.jpeg",
  "https://proudsmarts3bucket.s3.ap-southeast-2.amazonaws.com/profile_pictures/C%2B%2B-1563856107692.jpeg",
  "https://proudsmarts3bucket.s3.ap-southeast-2.amazonaws.com/profile_pictures/Dart-1563856135385.jpg",
  "https://proudsmarts3bucket.s3.ap-southeast-2.amazonaws.com/profile_pictures/Java-1563856173627.jpeg",
  "https://proudsmarts3bucket.s3.ap-southeast-2.amazonaws.com/profile_pictures/python-1563856288159.png"
];

const topicsURL = [
  "https://proudsmarts3bucket.s3.ap-southeast-2.amazonaws.com/videos/1-1563854513115.mp4",
  "https://proudsmarts3bucket.s3.ap-southeast-2.amazonaws.com/videos/2-1563854544163.mp4",
  "https://proudsmarts3bucket.s3-ap-southeast-2.amazonaws.com/videos/1-1563771768815.mp4",
  "https://proudsmarts3bucket.s3-ap-southeast-2.amazonaws.com/videos/2-1563790101758.mp4",
  "https://proudsmarts3bucket.s3-ap-southeast-2.amazonaws.com/videos/3-1563782368898.mp4",
  "https://proudsmarts3bucket.s3-ap-southeast-2.amazonaws.com/videos/4-1563845163354.mp4"
];

const generateEducators = async () => {
  const educators = [];
  for (let i = 0; i < 10; i++) {
    console.log(`Creating educator ${i + 1}`);
    const user = new UserModel({
      email: `educator${i + 1}@proudsmart.com`,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: "mrpickles", //this well need to be addressed
      profilePhotoUrl:
        "https://proudsmarts3bucket.s3.ap-southeast-2.amazonaws.com/profile_pictures/academia-1563945421620.jpg",
      interestTags: _.sampleSize(interestTags, 2),
      userType: "educator",
      educatorStatus: "approved",
      //needs to be addressesd
      qualifications: [
        {
          type: "Graduate Diploma",
          date: new Date(),
          institution: "Hogwarts"
        }
      ],
      aboutMe: faker.lorem.paragraph(),
      teachingTags: _.sampleSize(qualifications, 3)
    });
    educators.push(user);
    const saveUser = async () => {
      try {
        await user.save();
      } catch {
        console.log("********ERROR***********");
      }
    };
    saveUser();
  }
  return educators;
};

const generateTopics = () => {
  let topics = [];
  for (let i = 0; i < 100; i++) {
    console.log(`Creating topics ${i + 1}`);
    topics.push({
      title: faker.random.word(),
      description: faker.lorem.sentence(),
      videoUrl: _.sample(topicsURL)
    });
  }
  return topics;
};

const generateChapters = topics => {
  let chapters = [];
  for (let i = 0; i < 100; i++) {
    console.log(`Creating chapters ${i + 1}`);
    chapters.push({
      title: faker.random.word(),
      description: faker.lorem.sentence(),
      topics: _.sampleSize(topics, 5)
    });
  }
  return chapters;
};

const generateCourses = async (chapters, educators) => {
  let courses = [];
  for (let i = 0; i < 10; i++) {
    console.log(`Creating courses ${i + 1}`);
    const course = new CourseModel({
      title: _.sampleSize(courseTitles, 1),
      description: faker.lorem.paragraph(),
      educator: "chicken",
      educatorId: educators[_.random(1, educators.length - 1)].id,
      interestTags: _.sampleSize(interestTags, 3),
      materialsUrl: _.sampleSize(profilePictureURL, 2),
      courseProfilePictureUrl: _.sampleSize(profilePictureURL, 1),
      certified: "true",
      recommendedPrerequisites: _.sampleSize(recommendedPrerequisites, 2),
      keyConcepts: _.sampleSize(keyConcepts, 2),
      chapters: _.sampleSize(chapters, 5),
      price: _.random(100),
      approvalStatus: "approved"
    });
    courses.push(course);
    // console.log(course.title, courses.length);
    const saveCourse = async () => {
      try {
        await course.save();
      } catch {
        console.log("********ERROR***********");
      }
    };
    saveCourse();
  }
  return courses;
};

const pickPurchasedCourses = async courses => {
  let purchasedCourses = [];
  for (i = 0; i < _.random(1, courses.length); i++) {
    let randNum = _.random(1, courses.length - 1);
    // console.log(`courses length is ${courses.length}. RandNum is ${randNum}`);
    let randomCourse = courses[randNum];
    purchasedCourses.push({
      courseId: randomCourse.id,
      title: randomCourse.title,
      courseProfilePictureUrl: randomCourse.courseProfilePictureUrl,
      description: randomCourse.description
    });
  }
  return purchasedCourses;
};

const generateUsers = async purchasedCourses => {
  let users = [];
  for (let i = 0; i < 10; i++) {
    console.log(`Creating user ${i + 1}`);
    const user = new UserModel({
      email: `user${i + 1}@proudsmart.com`,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: "mrpickles", //this well need to be addressed
      profilePhotoUrl: faker.internet.url(),
      interestTags: _.sampleSize(interestTags, 2),
      purchasedCourses: _.sampleSize(purchasedCourses, 3)
    });
    // console.log(user.purchasedCourses)
    const saveUser = async () => {
      try {
        await user.save();
      } catch {
        console.log("********ERROR***********");
      }
    };
    saveUser();
    users.push(user);
  }

  return users;
};

const generateAdmin = async () => {
  console.log(`Creating Admin`);
  const admin = new UserModel({
    email: "admin@proudsmart.com",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: "mrpickles", //this well need to be addressed
    profilePhotoUrl: faker.internet.url(),
    interestTags: _.sampleSize(interestTags, 2),
    userType: "admin"
  });
  // console.log(user.purchasedCourses)
  const saveUser = async () => {
    try {
      await admin.save();
    } catch {
      console.log("why is this me");
      console.log("********ERROR***********");
    }
  };
  saveUser();

  return admin;
};

const populateDatabase = async () => {
  const educators = await generateEducators();
  const topics = generateTopics();
  const chapters = generateChapters(topics);
  const courses = await generateCourses(chapters, educators);
  const purchasedCourses = await pickPurchasedCourses(courses);
  const users = await generateUsers(purchasedCourses);
  const admin = await generateAdmin();
};

populateDatabase();

// Promise.all(courses)
//   .then(courses => {
//     console.log(`Seeds file successful, created ${courses.length} courses`);
//   })
//   //   .then(users => {
//   //     console.log(`Seeds file successful, created ${users.length} users`);
//   //   })
//   .catch(err => console.log(`Seeds file had an error: ${err}`))
//   .finally(() => mongoose.disconnect());
