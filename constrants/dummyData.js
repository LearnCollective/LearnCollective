const categories = [
    {
        id: 0,
        title: "Mobile Design",
        thumbnail: require("../assets/images/bg_1.png")
    },
    {
        id: 1,
        title: "3D Modeling",
        thumbnail: require("../assets/images/bg_2.png")
    },
    {
        id: 2,
        title: "Web Designing",
        thumbnail: require("../assets/images/bg_3.png")
    },
    {
        id: 3,
        title: "Illustrations",
        thumbnail: require("../assets/images/bg_4.png")
    },
    {
        id: 4,
        title: "Drawing",
        thumbnail: require("../assets/images/bg_5.png")
    },
    {
        id: 5,
        title: "Animation",
        thumbnail: require("../assets/images/bg_6.png")
    }
]

const courses_list_1 = [
    {
        id: 0,
        title: "Canava Graphic Design Course - Beginner",
        duration: "2h 30m",
        thumbnail: require("../assets/images/thumbnail_1.png")
    },
    {
        id: 1,
        title: "The Complete Presentation and speech",
        duration: "1h 30m",
        thumbnail: require("../assets/images/thumbnail_2.png")
    },{
        id: 3,
        title: "C++ programming ",
        duration: "2h 30m",
        thumbnail: require("../assets/images/thumbnail_1.png")
    },{
        id: 4,
        title: "Java programming ",
        duration: "2h 30m",
        thumbnail: require("../assets/images/thumbnail_1.png")
    },
]

const courses_list_2 = [
    {
        id: 0,
        description: "The Ultimate Ui/Ux Course Beginner to Advanced",
        duration: "2h 30m",
        instructor: "James Morris",
        ratings: 4.9,
        price: 75,
        is_favourite: true,
        image: require("../assets/images/thumbnail_1.png")
    },
    {
        id: 1,
        description: "The Ultimate Ui/Ux Course Beginner to Advanced",
        duration: "2h 30m",
        instructor: "James Morris",
        ratings: 4.9,
        price: 75,
        is_favourite: false,
        image: require("../assets/images/thumbnail_2.png")
    },
    {
        id: 2,
        description: "The Ultimate Ui/Ux Course Beginner to Advanced",
        duration: "2h 30m",
        instructor: "James Morris",
        ratings: 4.9,
        price: 75,
        is_favourite: true,
        image: require("../assets/images/thumbnail_3.png")
    },
    {
        id: 3,
        description: "The Ultimate Ui/Ux Course Beginner to Advanced",
        duration: "2h 30m",
        instructor: "James Morris",
        ratings: 4.9,
        price: 75,
        is_favourite: false,
        image: require("../assets/images/thumbnail_4.png")
    },
    {
        id: 4,
        description: "The Ultimate Ui/Ux Course Beginner to Advanced",
        duration: "2h 30m",
        instructor: "James Morris",
        ratings: 4.9,
        price: 75,
        is_favourite: false,
        image: require("../assets/images/thumbnail_4.png")
    },
    {
        id: 5,
        description: "The Ultimate Ui/Ux Course Beginner to Advanced",
        duration: "2h 30m",
        instructor: "James Morris",
        ratings: 4.9,
        price: 75,
        is_favourite: false,
        image: require("../assets/images/thumbnail_4.png")
    }
]
const sample_video_url ='https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
const top_searches = [
    {
        id: 0,
        label: "Sketch"
    },
    {
        id: 1,
        label: "Modeling"
    },
    {
        id: 2,
        label: "UI/UX"
    },
    {
        id: 3,
        label: "Web"
    },
    {
        id: 4,
        label: "Mobile"
    },
    {
        id: 5,
        label: "Animation"
    },
]
  const PopularCourses= [
      {
        id: 1,
        name: "Introduction to Programming",
        instructor :"Ahmed Hussieny",
        description: "Learn the basics of programming with this introductory course",
        thumbnail: require("../assets/we.png"),
        image: require("../assets/images/thumbnail_4.png"),
        duration: "4 weeks",
        level: "Beginner",
        price: 49.99,
        rating:4.9
      },
      {
        id: 2,
        name: "Data Science",
        instructor :"Ahmed Hussieny",
        description: "Explore the world of data science and learn how to analyze and interpret data",
        thumbnail: require("../assets/we.png"),
        image: require("../assets/images/thumbnail_4.png"),
        duration: "8 weeks",
        level: "Intermediate",
        price: 99.99,
        rating:4.9
      },
      {
        id: 3,
        name: "Web Development",
        instructor :"Ahmed Hussieny",
        description: "Master the skills needed to build dynamic web applications",
        // image: require("../assets/images/"),
        image: require("../assets/images/thumbnail_4.png"),
        duration: "12 weeks",
        level: "Advanced",
        price: 149.99,
        rating:4.9
      },
      {
        id: 4,
        name: "React Native Development",
        instructor :"Ahmed Hussieny",
        description: "React Native Development",
        // image: require("../assets/images/"),
        image: require("../assets/images/thumbnail_4.png"),
        duration: "12 weeks",
        level: "Advanced",
        price: 149.99,
        rating:4.9
      },
      {
        id: 5,
        name: "Web Development",
        instructor :"Ahmed Hussieny",
        description: "ReactJs Development",
        // image: require("../assets/images/"),
        image: require("../assets/images/thumbnail_4.png"),
        duration: "12 weeks",
        level: "Advanced",
        price: 149.99,
        rating:4.9
      }
    ],
course_details = {
    id: 0,
    title: "The Ultimate Ui/Ux Course Beginner to Advanced",
    number_of_students: "33.5k Students",
    duration: "2h 30m",
    instructor: {
        name: "ByProgrammers",
        title: "Full Stack Programmer"
    },
    videos: [
        {
            title: "1. Introduction",
            duration: "1:37",
            size: "10 MB",
            progress: "100%",
            is_playing: false,
            is_complete: true,
            is_lock: false,
            is_downloaded: false,
        },
        {
            title: "2. User Interface",
            duration: "1:15:00",
            size: "200 MB",
            progress: "60%",
            is_playing: true,
            is_complete: false,
            is_lock: false,
            is_downloaded: true,
        },
        {
            title: "3. User Experience",
            duration: "1:27:00",
            size: "230 MB",
            progress: "0%",
            is_playing: false,
            is_complete: false,
            is_lock: true,
            is_downloaded: false,
        }
    ],
    students: [
        {
            id: 0,
            name: "Student 1",
            thumbnail: require("../assets/images/student_1.png")
        },
        {
            id: 1,
            name: "Student 2",
            thumbnail: require("../assets/images/student_2.png")
        },
        {
            id: 2,
            name: "Student 3",
            thumbnail: require("../assets/images/student_3.png")
        },
        {
            id: 3,
            name: "Student 3",
            thumbnail: require("../assets/images/student_3.png")
        }
    ],
    files: [
        {
            id: 0,
            name: "UI Fundamentals",
            author: "Shared by ByProgrammers",
            upload_date: "13th Sep 2021",
            thumbnail: require("../assets/images/pdf.png")
        },
        {
            id: 1,
            name: "UX Checklist",
            author: "Shared by ByProgrammers",
            upload_date: "11th Sep 2021",
            thumbnail: require("../assets/images/doc.png")
        },
        {
            id: 2,
            name: "Sketch File",
            author: "Shared by ByProgrammers",
            upload_date: "7th Sep 2021",
            thumbnail: require("../assets/images/sketch.png")
        }
    ],
    discussions: [
        {
            id: 0,
            profile: require("../assets/images/profile.png"),
            name: "ByProgrammers",
            no_of_comments: "11 comments",
            no_of_likes: "72 likes",
            posted_on: "5 days ago",
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            replies: [
                {
                    id: 0,
                    profile: require("../assets/images/student_1.png"),
                    name: "ByProgrammers",
                    posted_on: "4 days ago",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                },
                {
                    id: 1,
                    profile: require("../assets/images/student_1.png"),
                    name: "ByProgrammers",
                    posted_on: "4 days ago",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                },
                {
                    id: 2,
                    profile: require("../assets/images/student_1.png"),
                    name: "ByProgrammers",
                    posted_on: "4 days ago",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                },
                {
                    id: 3,
                    profile: require("../assets/images/student_1.png"),
                    name: "ByProgrammers",
                    posted_on: "4 days ago",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                },
            ]
        },
        {
            id: 1,
            profile: require("../assets/images/profile.png"),
            name: "ByProgrammers",
            no_of_comments: "21 comments",
            no_of_likes: "372 likes",
            posted_on: "14 days ago",
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            replies: [
                {
                    id: 0,
                    profile: require("../assets/images/student_1.png"),
                    name: "ByProgrammers",
                    posted_on: "7 days ago",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                },
                {
                    id: 1,
                    profile: require("../assets/images/student_1.png"),
                    name: "ByProgrammers",
                    posted_on: "7 days ago",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                },
                {
                    id: 2,
                    profile: require("../assets/images/student_1.png"),
                    name: "ByProgrammers",
                    posted_on: "7 days ago",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                },
            ]
        }
    ]
}

const notificationByDays = [
    {
        title: "Today",
        data: [
            {
                id: 1,
                avatar: require("../assets/images/student_1.png"),
                name: "Admin",
                created_at: "2h 47m ago",
                message: "Asked to join online courses regarding professional web designing."
            },
            {
                id: 2,
                avatar: require("../assets/images/student_2.png"),
                name: "Customer Care",
                created_at: "3h 02m ago",
                message: "Your 50% discount code is: ON50DIS. Apply on checkout."
            },
            {
                id: 3,
                avatar: require("../assets/images/student_3.png"),
                name: "Lilian Ellis",
                created_at: "4h 32m ago",
                message: "Asked assiged you to watch professional videography course."
            }
        ],

    },
    {
        title: "Yesterday",
        data: [
            {
                id: 4,
                avatar: require("../assets/images/student_1.png"),
                name: "Admin",
                created_at: "16h 47m ago",
                message: "You just signed in from another device check inbox for more details."
            },
            {
                id: 5,
                avatar: require("../assets/images/student_2.png"),
                name: "Customer Care",
                created_at: "20h 02m ago",
                message: "Your 50% discount code is: ON50DIS. Apply on checkout."
            },
        ],

    },
]

export default {
    categories,
    courses_list_1,
    courses_list_2,
    top_searches,
    course_details,
    notificationByDays,PopularCourses
}