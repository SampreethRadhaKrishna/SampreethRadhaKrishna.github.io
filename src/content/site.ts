// Generated from content/06-journey-narrative.md (draft 8) via .lavish/journey.html. Edit the source, not this file.

export type Link = { href: string; label: string };
export type Figure = { src: string; alt: string };
export type Chapter = { id: string; when: string; title: string; story: string[]; carried: string; figures: Figure[]; links: Link[] };

export const hero = {
  name: "Sampreeth Radha Krishna",
  role: "Robotics Software Engineer",
  line: "Working towards fully autonomous robots.",
  fact: "San Francisco. Previously Open Droids, Case Western, Accenture.",
};

export const thread = "Every robot I've built removed one more human from the loop. A fire robot that found the heat and put it out on its own. A car that steered around what it saw. An arm that keeps a fast-moving target in frame without being told where to look. A family of robots that run learned policies on their own compute. The direction has never changed. Only the scale has.";

export const latest: Chapter = {
  "id": "c10",
  "when": "Nov 2024 – Sep 2026",
  "title": "Open Droids: robots for good, robots that stay yours",
  "story": [
    "In November 2024 I joined Open Droids in San Francisco. For the next two years I owned the software across the whole fleet: Droid 1, R1D1, R1D2, R1D3 and R2D3, the dual-arm platform we unveiled at CES 2025 and again at CES 2026.",
    "The company had a founding idea, and I signed on to make it real. Two words: good, and open. Good meant robots that take the work nobody wants, so people can do the work that matters. Open meant something more specific than a license. A robot that lives in your home or your hospital runs on code you can read, and nobody on the other side of the world can reach in, switch it off, put it under curfew, or make it do something worse. If you can't see what your robot runs, it isn't your robot. Every decision on the software side had to hold that line.",
    "We started at home. R2D3 folding laundry, loading a dishwasher, clearing a table: the chores that eat an evening. Two arms, a mobile base, and a camera that finds the sock before the hand goes for it. The videos are on the Open Droids site.",
    "Then healthcare. Picture a nurse's night shift: the restocking, the fetching, the rounds that are nothing but carrying. We built a robot that works as a semi-nurse, an interactive assistant that takes the unwanted chores, including the ones at three in the morning, so the people on the floor can spend their time on patients. That work is under NDA, so there are no pictures here.",
    "Then industry, where the same platform became different robots: industrial cleaning, bin picking on a line, agricultural work in the field. One software foundation, different hands, different job.",
    "And hotels, where a robot can run a facility end to end: check a guest in, deliver towels or a late dinner to a room, restock, patrol the corridors, and dock itself to charge.",
    "Under all of it sat the work I owned. One software stack every robot in the family could run, so a fix landed everywhere at once. A simulator, so the team could build without waiting on hardware. Two-arm control safe enough to hand to a learned policy. And modern vision-language models running on the robot's own computer, not in a cloud someone else controls. That last one is the open promise again, in engineering form.",
    "It also meant handing R2D3 to a hackathon team on a Friday and watching them teach it latte art by Sunday, then releasing the data, the model and the code."
  ],
  "carried": "Robots that do good, that stay yours, and that run learned policies on their own compute with no one steering. The closest I'd been to the thing I've wanted since sixth grade.",
  "figures": [
    {
      "src": "/images/r2d3.png",
      "alt": "R2D3"
    }
  ],
  "links": [
    {
      "href": "https://www.opendroids.com/",
      "label": "opendroids.com (home-chore videos)"
    },
    {
      "href": "https://www.youtube.com/@opendroids",
      "label": "Open Droids on YouTube"
    },
    {
      "href": "https://github.com/Open-Droids-robot/R2D3_ros2",
      "label": "R2D3_ros2"
    },
    {
      "href": "https://github.com/Open-Droids-robot/od-arm-controllers",
      "label": "od-arm-controllers"
    },
    {
      "href": "https://github.com/Open-Droids-robot/X-VLA",
      "label": "X-VLA"
    },
    {
      "href": "https://github.com/Open-Droids-robot/X-VLA/commit/6d17980",
      "label": "tuned-for-r2d3 commit"
    },
    {
      "href": "https://github.com/Open-Droids-robot/R2D3_ros2/blob/main/simulation_quickstart.md",
      "label": "simulation quickstart"
    },
    {
      "href": "https://github.com/Open-Droids-robot/R2D3_ros2/blob/main/woosh_robot_ros_interface_dev_notes.md",
      "label": "Woosh interface notes"
    },
    {
      "href": "https://github.com/Open-Droids-robot",
      "label": "Open Droids org"
    },
    {
      "href": "https://www.opendroids.com/team",
      "label": "opendroids.com/team"
    }
  ]
};

export const journey: Chapter[] = [
  {
    "id": "c1",
    "when": "~2010",
    "title": "The first robot",
    "story": [
      "In sixth grade I built a line-following robot. It worked, and it worked well, which surprised everyone including me. A couple of sensors, a few lines of logic, and a machine that turned left or right because of what it saw on the floor. That was the first time I understood that a robot could make a decision from an observation, and that the decision was something I could write."
    ],
    "carried": "Logic, algorithms, and the idea that a machine can decide from what it observes.",
    "figures": [],
    "links": []
  },
  {
    "id": "c2",
    "when": "2016–2018",
    "title": "Autonomous, or nothing",
    "story": [
      "In the early years of my mechanical engineering degree I built two robots that didn't need a driver. The first was a fire-fighting robot: temperature sensors to detect a heat source, a drive system to navigate to it, and a pump to spray water on it. Detect, move, act, with no one in the loop.",
      "The second was a collision-avoidance robot: a car that watched its surroundings with ultrasonic sensors and a camera, steered and braked around obstacles on its own, and carried an external airbag as a last line of defense for the crashes it couldn't avoid. Different problems, same shape. The machine sees something, decides, and moves."
    ],
    "carried": "Perception plus a decision plus an actuator is a robot. Everything since has been that loop, bigger.",
    "figures": [
      {
        "src": "/images/p41.png",
        "alt": "Fire detection on a real flame, from the later rebuild"
      },
      {
        "src": "/images/p32.png",
        "alt": "External airbag deploying on impact, simulation"
      }
    ],
    "links": [
      {
        "href": "https://github.com/Sampreeth98/ROS2-Projects",
        "label": "github.com/Sampreeth98/ROS2-Projects"
      }
    ]
  },
  {
    "id": "c3",
    "when": "2017",
    "title": "Hindustan Aeronautics Limited",
    "story": [
      "My first time inside a real engineering organization was at Hindustan Aeronautics Limited, India's aircraft manufacturer, as an intern working across the Tejas and Rafale programs from design through the manufacturing line, and on Airbus aircraft doors. Robots had been a passion. This was production: thousands of parts, every one traceable, every process signed off, at a scale where \"it works on my bench\" means nothing. I learned the difference between building something once and building it so it can be built again, a thousand times, identically."
    ],
    "carried": "The gap between passion and production. Process, traceability, and respect for scale.",
    "figures": [],
    "links": []
  },
  {
    "id": "c4",
    "when": "2017–2019",
    "title": "Hackathons",
    "story": [
      "Through college I entered most of the hackathons I could reach around Bangalore. Thirty-six to forty-eight hours, an immense amount of coffee, builds that were rough and demos that mostly worked. What I learned is how much a small team can ship in two days when nobody is waiting for permission, and that I liked being the person who makes the demo work at 3 a.m."
    ],
    "carried": "Speed, and comfort with unfinished things in front of an audience.",
    "figures": [],
    "links": []
  },
  {
    "id": "c5",
    "when": "2018–2019",
    "title": "The solar car",
    "story": [
      "In my third year I joined Team Dritan Racers: thirty students building an electric solar vehicle from scratch for the ISIE Electric Solar Vehicle Championship 2019. I was on the design and autonomy team, where we built the sensor data processing pipelines that assisted the driver. Chassis, composite body, solar array, drivetrain, electrics: nothing off the shelf. Everything was drawn, fabricated and tested by students on a deadline and a budget that left no room for a second attempt. The championship ends in an endurance race, so the car didn't just have to pass inspection. It had to keep running.",
      "It was the first thing I built that was big enough to hurt someone, on a team big enough that nobody could hold the whole car in their head."
    ],
    "carried": "Systems thinking across mechanical, electrical and software, and what it takes to move thirty people toward one car.",
    "figures": [
      {
        "src": "/images/solar_thumb.jpg",
        "alt": "Team Dritan Racers, ESVC 2019"
      }
    ],
    "links": [
      {
        "href": "https://www.youtube.com/watch?v=rTtckKDNej4",
        "label": "ESVC19-A-52 Dritan Racers (YouTube)"
      }
    ]
  },
  {
    "id": "c6",
    "when": "Summer 2019",
    "title": "Bosch Rexroth: the machines that never sleep",
    "story": [
      "At Bosch Rexroth I spent a summer with the actuators robots are built from: robotic arms, industrial pneumatics and hydraulics, and the PLCs that run them. Industrial automation is autonomy's older sibling: reliable, repetitive, and completely blind. The cells I programmed would run for years without a mistake, and never once perceive anything. I wanted the reliability without the blindness."
    ],
    "carried": "Respect for actuators and control loops that have to run for years. And the gap between \"automated\" and \"autonomous\" as the thing I'd spend my career on.",
    "figures": [],
    "links": []
  },
  {
    "id": "c7",
    "when": "2020–2023",
    "title": "Accenture: two hundred robots at once",
    "story": [
      "I graduated into 2020 and spent almost three years at Accenture as a software engineer on a warehouse robotics client. Picture two hundred robots on one floor, each with a different job and a different application behind it, all streaming sensor data. My work was keeping that fleet healthy: processing the sensor data at scale, running the cloud infrastructure on AWS that stored it and managed the instances the systems ran on, maintaining the processing algorithms, catching the robots that drifted, and improving the system so they drifted less.",
      "Robotics from the operations side. The unit isn't one robot, it's a fleet, and the enemy isn't a bug, it's downtime."
    ],
    "carried": "Fleet thinking. Infrastructure, monitoring, and code that other people depend on.",
    "figures": [],
    "links": []
  },
  {
    "id": "c8",
    "when": "2023–2024",
    "title": "Case Western: the intelligence layer",
    "story": [
      "I went to Case Western Reserve for a master's in mechanical engineering focused on AI/ML and robotics, and worked between two labs. Roger Quinn's Biorobotics Lab, where the current work is soft robotic graspers: polymer grippers that pick up things a parallel-jaw gripper never could. And Kathryn Daltorio's Crab Lab, which builds crab-inspired legged robots that walk and swim underwater to find and recover things no diver should have to. Mechanical had given me the body. Accenture had given me the fleet. This was the brain and, it turned out, the hands and the legs."
    ],
    "carried": "The full stack, finally. Hardware, software, learning, and a wider idea of what a robot can be.",
    "figures": [],
    "links": [
      {
        "href": "https://github.com/Sampreeth98",
        "label": "github.com/Sampreeth98"
      }
    ]
  },
  {
    "id": "c9",
    "when": "2024",
    "title": "The arm that follows what it sees",
    "story": [
      "The project that pulled it together: a 5-DOF arm with a depth camera on its wrist, built to follow fast-moving objects. YOLO finds the target in every frame, but detection is the easy half. The hard half is motion: a neural network trained to turn a high-frequency stream of target positions into a smooth, clean trajectory instead of a jittery chase, with reinforcement learning to improve it over time. Simulated in Isaac Sim and Gazebo, run on a Raspberry Pi.",
      "Nothing like the fire robot. That one found a heat source that stayed put. This one had to keep a fast-moving target in frame at high frequency: built with Formula 1 in mind, and with an eye on the harder version of the problem, tracking and intercepting drones."
    ],
    "carried": "Closed-loop perception-to-motion at high frequency as the unit of work.",
    "figures": [
      {
        "src": "/images/p11.png",
        "alt": "The arm, CAD render"
      },
      {
        "src": "/images/p22.png",
        "alt": "Shape classification from the wrist camera"
      }
    ],
    "links": [
      {
        "href": "https://github.com/Sampreeth98/ROS2-Projects",
        "label": "github.com/Sampreeth98/ROS2-Projects"
      }
    ]
  }
];

export const arenas: string[] = [
  "Home: laundry, dishwashing, tidying. Videos on opendroids.com.",
  "Healthcare: semi-nurse / interactive nurse assistant for unwanted chores, overnight included. NDA: no images.",
  "Industry: industrial cleaning, bin picking, agricultural robots.",
  "Hotels: whole-facility operation: guest check-in, deliveries (food, towels, items).",
  "Vision: robots for good; robots kept open so no one anywhere can remotely control, curfew, or misuse them. The company's founding vision, and what you worked toward."
];

export const made: string[] = [
  "One software foundation for the whole robot family.",
  "A full simulation of the dual-arm robot, so anyone can develop without a $60k machine on their desk.",
  "Two-arm control that a learned policy can drive safely: it refuses commands that would hit a joint limit or an unreachable pose.",
  "A vision-language-action model running on the robot's own computer, not in the cloud.",
  "Hackathon teams turning R2D3 into a latte-art robot in a weekend, with data, model and code released openly."
];

export const press: Link[] = [
  {
    "href": "https://www.therobotreport.com/open-droids-develops-both-single-dual-arm-mobile-manipulators/",
    "label": "The Robot Report, Dec 2024"
  },
  {
    "href": "https://tech.yahoo.com/general/articles/ces-unveiled-2025-opendroids-r2d3-042543404.html",
    "label": "Yahoo Tech, CES Unveiled 2025"
  },
  {
    "href": "https://x.com/TechCrunch/status/1876761274979070059",
    "label": "TechCrunch on X"
  },
  {
    "href": "https://aiforgood.itu.int/speaker/r2d3/",
    "label": "ITU AI for Good 2025"
  },
  {
    "href": "https://luma.com/8ca2z1rr",
    "label": "Physical AI Hack 2026"
  },
  {
    "href": "https://www.youtube.com/watch?v=Zld8HilE8RI",
    "label": "CES 2025 walkthrough"
  }
];

export const now = { story: "I've spent sixteen years closing the loop between what a robot sees and what it does. At Open Droids I got to close it on robots people actually buy. Now I'm building a new way to understand manipulation for robotics. That's all I'll say about it for now.", mission: "I'm here to make robots fully autonomous. I'm not stopping before that." };

export const beliefs: { title: string; body: string }[] = [
  {
    "title": "Automated is not autonomous.",
    "body": "A PLC cell runs for ten years and never sees anything. The interesting problems start when the robot has to perceive."
  },
  {
    "title": "The loop is the product.",
    "body": "Perception, decision, actuation. Every impressive robot is that loop running fast and reliably; every disappointing one is that loop broken somewhere."
  },
  {
    "title": "Robots should ship open.",
    "body": "Open hardware and open stacks attract the people who make them better."
  },
  {
    "title": "Demos are easy. Tuesday is hard.",
    "body": "The difference between a video and a product is whether it still works when the founder isn't in the room."
  }
];

export const contact = {
  line: "Building toward autonomous robots, or funding people who are? Let's talk.",
  email: "rk.sampreeth@gmail.com",
  linkedin: "https://www.linkedin.com/in/sampreethradhakrishna/",
  github: "https://github.com/SampreethRadhaKrishna",
  githubOld: "https://github.com/Sampreeth98",
};
