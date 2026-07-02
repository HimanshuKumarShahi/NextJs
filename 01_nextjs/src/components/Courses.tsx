"use client";

import coursesData from "@/data/music_courses.json";
import { HoverEffect } from "@/components/ui/card-hover-effect";



interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  instructor: string;
  image: string;
  isFeatured: boolean;
}

export default function CoursesPage() {
  const allCourses = coursesData.courses.map((course: Course) => ({
    title: course.title,
    description: course.description,
    link: `/courses/${course.slug}`,
    image: course.image,
    price: course.price,
    instructor: course.instructor,
  }));

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          ALL COURSES ({allCourses.length})
        </h2>
        <p className="mt-4 text-neutral-400 max-w-lg mx-auto">
          Explore our complete library of music production and theory courses.
        </p>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <HoverEffect items={allCourses} />
      </div>
    </div>
  );
}

/*
,
    {
      "id": 9,
      "title": "Mobile App Development",
      "slug": "mobile-dev-expo",
      "description": "Build with React Native.",
      "price": 279.0,
      "instructor": "Navin R.",
      "isFeatured": true,
      "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c"
    },
    {
      "id": 10,
      "title": "AI Agent Development",
      "slug": "ai-agent-dev",
      "description": "Build LLM-powered agents.",
      "price": 399.0,
      "instructor": "Himanshu S.",
      "isFeatured": true,
      "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995"
    },
    {
      "id": 11,
      "title": "Yoga for Beginners",
      "slug": "yoga-basics",
      "description": "Start your wellness journey.",
      "price": 29.0,
      "instructor": "Elena P.",
      "isFeatured": false,
      "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
    },
    {
      "id": 12,
      "title": "Photography Basics",
      "slug": "photo-basics",
      "description": "Master your camera settings.",
      "price": 89.0,
      "instructor": "David L.",
      "isFeatured": false,
      "image": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e"
    },
{
    //   "id": 13,
    //   "title": "Cooking Italian Cuisine",
    //   "slug": "italian-cooking",
    //   "description": "Authentic pasta and pizza.",
    //   "price": 59.0,
    //   "instructor": "Marco G.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    // },
    // {
    //   "id": 14,
    //   "title": "Public Speaking",
    //   "slug": "public-speaking",
    //   "description": "Speak with confidence.",
    //   "price": 79.0,
    //   "instructor": "Emma W.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1475721027785-f749f8752c59"
    // },
    // {
    //   "id": 15,
    //   "title": "Cybersecurity Basics",
    //   "slug": "cyber-sec",
    //   "description": "Stay safe online.",
    //   "price": 219.0,
    //   "instructor": "Paul K.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
    // },
    // {
    //   "id": 16,
    //   "title": "Baking Pastries",
    //   "slug": "baking-master",
    //   "description": "Croissants and tarts.",
    //   "price": 69.0,
    //   "instructor": "Julie R.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff"
    // },
    // {
    //   "id": 17,
    //   "title": "Game Design Unity",
    //   "slug": "unity-game-design",
    //   "description": "Create your first 3D game.",
    //   "price": 299.0,
    //   "instructor": "Tom H.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1556438064-2d7646166914"
    // },
    // {
    //   "id": 18,
    //   "title": "Content Writing",
    //   "slug": "content-writing",
    //   "description": "Write compelling copy.",
    //   "price": 55.0,
    //   "instructor": "Kate M.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1455390582262-044cdead277a"
    // },
    // {
    //   "id": 19,
    //   "title": "Machine Learning",
    //   "slug": "ml-bootcamp",
    //   "description": "Build predictive models.",
    //   "price": 449.0,
    //   "instructor": "Andrew N.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1555949963-aa9fe0c977b8"
    // },
    // {
    //   "id": 20,
    //   "title": "Minimalist Lifestyle",
    //   "slug": "minimalism",
    //   "description": "Simplify your life.",
    //   "price": 35.0,
    //   "instructor": "Leo B.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1484101403633-562f858dc8a6"
    // },
    // {
    //   "id": 21,
    //   "title": "Piano For All",
    //   "slug": "piano-master",
    //   "description": "Classical and Jazz piano.",
    //   "price": 129.0,
    //   "instructor": "Clara S.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0"
    // },
    // {
    //   "id": 22,
    //   "title": "Blockchain Basics",
    //   "slug": "crypto-101",
    //   "description": "Understand decentralized tech.",
    //   "price": 189.0,
    //   "instructor": "Vitalik B.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1518546305927-5a555bb7020d"
    // },
    // {
    //   "id": 23,
    //   "title": "Interior Design",
    //   "slug": "interior-design",
    //   "description": "Decorate like a pro.",
    //   "price": 110.0,
    //   "instructor": "Nina D.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
    // },
    // {
    //   "id": 24,
    //   "title": "JavaScript Deep Dive",
    //   "slug": "js-deep-dive",
    //   "description": "Closures, Prototypes, Async.",
    //   "price": 199.0,
    //   "instructor": "Kyle S.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee"
    // },
    // {
    //   "id": 25,
    //   "title": "Startup Fundamentals",
    //   "slug": "startup-basics",
    //   "description": "From idea to execution.",
    //   "price": 250.0,
    //   "instructor": "Sam A.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1552664730-d307ca884978"
    // },
    // {
    //   "id": 26,
    //   "title": "Graphic Design Figma",
    //   "slug": "figma-mastery",
    //   "description": "Prototyping made easy.",
    //   "price": 135.0,
    //   "instructor": "Luna M.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1586717791821-3f44a563fa2d"
    // },
    // {
    //   "id": 27,
    //   "title": "React Native Expo",
    //   "slug": "expo-mobile",
    //   "description": "Cross-platform mobile apps.",
    //   "price": 220.0,
    //   "instructor": "Simon P.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c"
    // },
    // {
    //   "id": 28,
    //   "title": "Video Editing Premiere",
    //   "slug": "video-editing",
    //   "description": "Cut and color grade films.",
    //   "price": 160.0,
    //   "instructor": "Oscar B.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1574943320219-555e21f5741e"
    // },
    // {
    //   "id": 29,
    //   "title": "Docker & K8s",
    //   "slug": "devops-docker",
    //   "description": "Containerize your world.",
    //   "price": 310.0,
    //   "instructor": "Jeff B.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1667372335967-34f378a846c9"
    // },
    // {
    //   "id": 30,
    //   "title": "SEO Strategies",
    //   "slug": "seo-master",
    //   "description": "Rank #1 on Google.",
    //   "price": 95.0,
    //   "instructor": "Neil P.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1572044162444-ad60f1283731"
    // },
    // {
    //   "id": 31,
    //   "title": "French For Travelers",
    //   "slug": "french-lang",
    //   "description": "Speak basic French.",
    //   "price": 45.0,
    //   "instructor": "Sophie L.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1502602898657-3421760c1d7e"
    // },
    // {
    //   "id": 32,
    //   "title": "E-Commerce Build",
    //   "slug": "shopify-ecommerce",
    //   "description": "Start your online store.",
    //   "price": 175.0,
    //   "instructor": "Chris W.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1557821552-17105176677c"
    // },
    // {
    //   "id": 33,
    //   "title": "Arduino Hardware",
    //   "slug": "arduino-kits",
    //   "description": "Build electronics hardware.",
    //   "price": 125.0,
    //   "instructor": "Ben S.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1553406830-ef2513458d76"
    // },
    // {
    //   "id": 34,
    //   "title": "SQL Databases",
    //   "slug": "sql-mastery",
    //   "description": "Query your data efficiently.",
    //   "price": 150.0,
    //   "instructor": "Maria K.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d"
    // },
    // {
    //   "id": 35,
    //   "title": "Podcast Production",
    //   "slug": "podcast-pro",
    //   "description": "Setup your audio studio.",
    //   "price": 85.0,
    //   "instructor": "James C.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1478737270239-2f02b77fc618"
    // },
    // {
    //   "id": 36,
    //   "title": "Java Fundamentals",
    //   "slug": "java-bootcamp",
    //   "description": "OOP programming basics.",
    //   "price": 180.0,
    //   "instructor": "Navin R.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1596753509867-0c7f09804e8d"
    // },
    // {
    //   "id": 37,
    //   "title": "Painting Landscapes",
    //   "slug": "landscape-paint",
    //   "description": "Oil painting techniques.",
    //   "price": 90.0,
    //   "instructor": "Vincent V.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5"
    // },
    // {
    //   "id": 38,
    //   "title": "Stress Management",
    //   "slug": "stress-relief",
    //   "description": "Find your inner peace.",
    //   "price": 30.0,
    //   "instructor": "Dr. Maya",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773"
    // },
    // {
    //   "id": 39,
    //   "title": "Node.js API Development",
    //   "slug": "node-api",
    //   "description": "RESTful services with Express.",
    //   "price": 200.0,
    //   "instructor": "Hitesh C.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c877eb"
    // },
    // {
    //   "id": 40,
    //   "title": "Swift App Dev",
    //   "slug": "swift-ios",
    //   "description": "iOS app development.",
    //   "price": 280.0,
    //   "instructor": "Steve J.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9"
    // },
    // {
    //   "id": 41,
    //   "title": "Copywriting Secrets",
    //   "slug": "copy-secrets",
    //   "description": "Sell with your words.",
    //   "price": 115.0,
    //   "instructor": "David O.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1542435503-956c469e47f6"
    // },
    // {
    //   "id": 42,
    //   "title": "Data Visualization",
    //   "slug": "dataviz-d3",
    //   "description": "Visualizing complex data.",
    //   "price": 165.0,
    //   "instructor": "Edward T.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    // },
    // {
    //   "id": 43,
    //   "title": "Personal Finance",
    //   "slug": "finance-master",
    //   "description": "Invest for the future.",
    //   "price": 75.0,
    //   "instructor": "Warren B.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1579621970795-87facc2f976d"
    // },
    // {
    //   "id": 44,
    //   "title": "WordPress Dev",
    //   "slug": "wordpress-build",
    //   "description": "No-code website creation.",
    //   "price": 120.0,
    //   "instructor": "Matt M.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
    // },
    // {
    //   "id": 45,
    //   "title": "Game Music Logic",
    //   "slug": "game-audio",
    //   "description": "Composing for games.",
    //   "price": 140.0,
    //   "instructor": "Hans Z.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
    // },
    // {
    //   "id": 46,
    //   "title": "Python for Automation",
    //   "slug": "python-auto",
    //   "description": "Automate boring tasks.",
    //   "price": 130.0,
    //   "instructor": "Al Sweigart",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935"
    // },
    // {
    //   "id": 47,
    //   "title": "Advanced CSS",
    //   "slug": "css-advanced",
    //   "description": "Animations and layouts.",
    //   "price": 110.0,
    //   "instructor": "Sarah D.",
    //   "isFeatured": false,
    //   "image": "https://images.unsplash.com/photo-1507721999472-8ed442164afb"
    // },
    // {
    //   "id": 48,
    //   "title": "Project Management",
    //   "slug": "agile-pm",
    //   "description": "Agile and Scrum methodologies.",
    //   "price": 195.0,
    //   "instructor": "Jeff S.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1552664730-d307ca884978"
    // },
    // {
    //   "id": 49,
    //   "title": "Machine Learning Ops",
    //   "slug": "mlops-scale",
    //   "description": "Deploying ML at scale.",
    //   "price": 400.0,
    //   "instructor": "Cassie K.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
    // },
    // {
    //   "id": 50,
    //   "title": "React Ecosystem",
    //   "slug": "react-ecosystem",
    //   "description": "Learn Next.js and Redux.",
    //   "price": 260.0,
    //   "instructor": "Dan A.",
    //   "isFeatured": true,
    //   "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee"
    // }
*/
