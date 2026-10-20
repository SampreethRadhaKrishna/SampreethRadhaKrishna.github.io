// ALL site copy lives here. The prose is generated from content/06-journey-narrative.md (draft 8)
// via .lavish/journey.html: change wording in the source first, then here. Components hold no strings.

export type Link = { href: string; label: string };
export type Figure = { src: string; alt: string };
// One journey stop: a one-line account, what it left me with, the organisation's logo, and pictures.
// `credit` names the source of a picture that isn't mine; `illustrative` marks one that shows the
// kind of thing, not the thing itself.
export type Media = { src: string; alt: string; video?: boolean; credit?: Link; illustrative?: boolean };
export type Chapter = { id: string; when: string; title: string; line: string; carried: string; logo?: Media; media: Media[]; links: Link[] };
export type Arena = { label: string; body: string };
// `contain` letterboxes a clip whose framing would be lost to a portrait crop.
export type Clip = { src: string; poster: string; label: string; date?: string; contain?: boolean };
export type Step = { label: string; body: string[] };
export type Latest = {
  id: string;
  when: string;
  name: string;
  tagline: string;
  summary: string;
  facts: string[];
  photo: Figure & { width: number; height: number };
  storyHeading: string;
  reelHeading: string;
  reel: Clip[];
  story: Step[];
  carried: string;
  arenasHeading: string;
  pressHeading: string;
  links: Link[];
};

export const hero = {
  name: "Sampreeth Radha Krishna",
  role: "Robotics Software Engineer",
  // The headline, in the three parts the layout sets differently: lead small in ash,
  // emphasis italic, emphasis + rest large in ember-soft. Reads as one sentence.
  lead: "Working towards",
  emphasis: "fully",
  rest: "autonomous robots.",
  fact: "San Francisco. Previously Open Droids, Case Western, Accenture.",
  // Accessible name for the pinned identity link: the visible name plus what the link does.
  backToTop: "back to top",
};

export const nav = {
  mark: "SRK",
  homeLabel: "home",
  links: [
    { href: "#open-droids", label: "Open Droids" },
    { href: "#journey", label: "Journey" },
    { href: "#now", label: "Now" },
    { href: "#contact", label: "Contact" },
  ] as Link[],
  github: "GitHub",
  linkedin: "LinkedIn",
  email: "Email",
};

// Labels drawn beside the two brains in the fixed scene (rendered by HeroCanvas).
export const heroLabels = { human: "human brain", robot: "robot brain" };

export const journeyIntro = {
  eyebrow: "How I got here",
  carriedLabel: "Took away",
  illustrative: "Illustrative",
  creditsHeading: "Picture credits",
  // Closing line of the last chapter; `link` is rendered as an anchor between `before` and `after`.
  bridge: { before: "Which is what brought me to", link: { href: "#open-droids", label: "Open Droids" }, after: ", at the top of this page." },
};

export const thread = "Every robot I've built removed human effort and helped humans. A fire robot that found the heat and put it out on its own. A car that steered around what it saw. An arm that keeps a fast-moving target in frame without being told where to look. A family of robots that run learned policies on their own compute to do home chores. The direction has never changed. Only the scale has.";

export const latest: Latest = {
  id: "c10",
  when: "Nov 2024–Sep 2026 · San Francisco",
  name: "Open Droids",
  tagline: "Robots for good. Robots that stay yours.",
  summary: "Two years owning the software for a family of robots.",
  facts: ["All robots, one stack", "R2D3 at CES 2025 and 2026", "Models on the robot, not the cloud"],
  photo: {
    src: "/images/open_droids_main.jpg",
    alt: "Sampreeth at a laptop beside the arms of an Open Droids robot",
    width: 1200,
    height: 1600,
  },
  storyHeading: "The story",
  reelHeading: "From the floor",
  reel: [
    { src: "/media/open_droids/booth.mp4", poster: "/media/open_droids/booth.jpg", label: "With R2D3 at the booth" },
    { src: "/media/open_droids/hand.mp4", poster: "/media/open_droids/hand.jpg", label: "Dexterous hand", date: "Mar 2026" },
    { src: "/media/open_droids/glove.mp4", poster: "/media/open_droids/glove.jpg", label: "Glove teleop, mirrored in sim", date: "Mar 2026" },
    { src: "/media/open_droids/teleop.mp4", poster: "/media/open_droids/teleop.jpg", label: "Beat 1X", date: "Nov 2025", contain: true },
    { src: "/media/open_droids/dishwasher.mp4", poster: "/media/open_droids/dishwasher.jpg", label: "Unloading a dishwasher", date: "Mar 2025" },
    { src: "/media/open_droids/hackathon.mp4", poster: "/media/open_droids/hackathon.jpg", label: "The hackathon", date: "Jan 2026" },
    { src: "/media/open_droids/mobile.mp4", poster: "/media/open_droids/mobile.jpg", label: "Droid 1" },
  ],
  story: [
    {
      label: "Took on the whole fleet",
      body: [
        "I owned the software for all our robots: R1D1, R1D2, R1D3 and R2D3.",
      ],
    },
    {
      label: "Built Rogent, one stack for all of them",
      body: [
        "I built Rogent, the software stack every robot in the family runs: a multi-agent orchestration system built, at its core, for fully autonomous tasks.",
        "A fix lands on every robot at once.",
        "The same foundation carried the platform from the home into healthcare, industry and hotels.",
      ],
    },
    {
      label: "Put the robot in simulation",
      body: [
        "I built a full simulation of the dual-arm robot that anyone can develop on and run in their browser, without an $80k machine on their desk.",
      ],
    },
    {
      label: "Made two arms safe for learned policies",
      body: [
        "I wrote two-arm control that a learned policy can drive safely: it refuses any command that would hit a joint limit or an unreachable pose.",
      ],
    },
    {
      label: "Beat 1X",
      body: [
        "Same dishes benchmark, side by side with 1X. Their run took 7 minutes. I teleoperated ours through it in 3:09.",
      ],
    },
    {
      label: "Optimized models to run on device",
      body: [
        "I optimized open-source models to run on the robot's own computer, with control models and policies running at high frequency.",
      ],
    },
    {
      label: "Put it to work at home",
      body: [
        "The stack ran R2D3 through the chores that eat an evening: loading a dishwasher, loading a washing machine, clearing a table.",
      ],
    },
    {
      label: "Handed it to a hackathon",
      body: [
        "I handed R2D3 and R1D2 to a hackathon team on a Friday. By Sunday they were making latte art, and we released the data, the model and the code.",
      ],
    },
  ],
  carried: "Robots that do good, that stay yours, and that run learned policies on their own compute with no one steering. The closest I'd been to the thing I've wanted since sixth grade.",
  arenasHeading: "Where it went",
  pressHeading: "In the press and on X",
  links: [
    { href: "https://www.opendroids.com/", label: "opendroids.com" },
    { href: "https://www.youtube.com/@opendroids", label: "YouTube" },
  ],
};

export const journey: Chapter[] = [
  {
    id: "c1",
    when: "~2010",
    title: "The first robot",
    line: "In sixth grade I built a line follower that turned left or right because of what it saw on the floor. The first decision I ever wrote.",
    carried: "A machine can decide from what it observes.",
    media: [
      {"src": "/images/journey/line_follower_nxt.jpg", "alt": "A 2011 LEGO line follower", "credit": {"href": "https://commons.wikimedia.org/wiki/File:40365_Line_Follower_Robot.jpg", "label": "chauromano, CC BY 2.0"}, "illustrative": true},
    ],
    links: [],
  },
  {
    id: "c2",
    when: "2016–2018",
    title: "Autonomous, or nothing",
    line: "A firefighting robot that found the heat and sprayed it out. A car that steered and braked around obstacles, with an airbag for the crashes it couldn't avoid.",
    carried: "Sense, decide, act. Everything since is that loop, bigger.",
    media: [
      {"src": "/images/p41.png", "alt": "Fire detection on a real flame"},
      {"src": "/images/p32.png", "alt": "External airbag deploying on impact, simulation"},
    ],
    links: [
      { href: "https://github.com/Sampreeth98/ROS2-Projects", label: "ROS2-Projects" },
    ],
  },
  {
    id: "c3",
    when: "2017",
    title: "Hindustan Aeronautics",
    line: "Intern on the Tejas and Rafale programs and on Airbus aircraft doors, from design through the manufacturing line.",
    carried: "Build it so it can be built a thousand times, identically.",
    logo: {"src": "/images/journey/logo_hal.svg", "alt": "Hindustan Aeronautics Limited"},
    media: [
      {"src": "/images/journey/hal_tejas_build.jpg", "alt": "Tejas trainer on the HAL Bangalore assembly floor", "credit": {"href": "https://commons.wikimedia.org/wiki/File:HAL_Tejas_trainer_version_construction.JPG", "label": "Ajai Shukla, CC BY 2.5 IN"}},
      {"src": "/media/journey/tejas_refuel.mp4", "alt": "Tejas, first air-to-air refueling", "video": true, "credit": {"href": "https://commons.wikimedia.org/wiki/File:LCA_Tejas_maiden_air-to-air_refuelling.ogv", "label": "Ministry of Defence, GODL-India"}},
      {"src": "/images/journey/hal_tejas_pair.jpg", "alt": "Two HAL Tejas in formation", "credit": {"href": "https://commons.wikimedia.org/wiki/File:Two_HAL_Tejas_flying_in_formation.jpg", "label": "Indian Air Force, GODL-India"}},
    ],
    links: [],
  },
  {
    id: "c4",
    when: "2017–2019",
    title: "Hackathons",
    line: "Most of the hackathons I could reach around Bangalore. Thirty-six to forty-eight hours, a lot of coffee, demos that mostly worked.",
    carried: "How much a small team ships when nobody waits for permission.",
    media: [
      {"src": "/images/journey/hackathon_hardware.jpg", "alt": "Building hardware at a hackathon", "credit": {"href": "https://commons.wikimedia.org/wiki/File:Hackathon_1_%22Arduino%22_-_Foto_T%C3%A1rlis_Schneider_(19372442659).jpg", "label": "Tárlis Schneider, CC BY-SA 2.0"}, "illustrative": true},
    ],
    links: [],
  },
  {
    id: "c5",
    when: "2018–2019",
    title: "The solar car",
    line: "Team Dritan Racers: thirty students building an electric solar car from scratch for ESVC 2019. I was on design and autonomy, building the sensor pipelines that assisted the driver.",
    carried: "Systems thinking across mechanical, electrical and software.",
    logo: {"src": "/images/journey/logo_dritan.png", "alt": "Team Dritan Racers"},
    media: [
      {"src": "/media/journey/solar_build.mp4", "alt": "Fitting the body and solar panels, 2019", "video": true, "credit": {"href": "https://www.youtube.com/watch?v=rTtckKDNej4", "label": "ISIEINDIA on YouTube"}},
      {"src": "/images/journey/solar_team.jpg", "alt": "The team with the car", "credit": {"href": "https://www.youtube.com/watch?v=rTtckKDNej4", "label": "ISIEINDIA on YouTube"}},
    ],
    links: [
      { href: "https://www.youtube.com/watch?v=rTtckKDNej4", label: "Dritan Racers on YouTube" },
    ],
  },
  {
    id: "c6",
    when: "Summer 2019",
    title: "Bosch Rexroth",
    line: "Robotic arms, pneumatics, hydraulics and the PLCs that run them. Cells that run for years without a mistake, and never see anything.",
    carried: "Automated is not autonomous.",
    logo: {"src": "/images/journey/logo_bosch_rexroth.svg", "alt": "Bosch Rexroth"},
    media: [
      {"src": "/images/journey/rexroth_pumps_bangalore.jpg", "alt": "Rexroth hydraulic pumps, Bangalore", "credit": {"href": "https://commons.wikimedia.org/wiki/File:EXCON_2025,_Bangalore_International_Exhibition_Centre_(514).jpg", "label": "Gpkp, CC BY-SA 4.0"}},
      {"src": "/images/journey/automation_line.jpg", "alt": "A robotic line with pneumatic grippers", "credit": {"href": "https://commons.wikimedia.org/wiki/File:Linia_zrobotyzowana_w_AIUT.png", "label": "Marta Veverica, CC BY-SA 4.0"}, "illustrative": true},
      {"src": "/images/journey/automation_welding.jpg", "alt": "Industrial robots on a body line", "credit": {"href": "https://commons.wikimedia.org/wiki/File:BMW_Leipzig_MEDIA_050719_Download_Karosseriebau_max.jpg", "label": "BMW Werk Leipzig, CC BY-SA 2.0 DE"}, "illustrative": true},
    ],
    links: [],
  },
  {
    id: "c7",
    when: "2020–2023",
    title: "Accenture",
    line: "Software engineer on a warehouse robotics client: two hundred robots on one floor. I kept the fleet healthy, from sensor data at scale to the AWS infrastructure under it.",
    carried: "Fleet thinking. The enemy isn't a bug; it's downtime.",
    media: [
      {"src": "/images/journey/factory_glass.jpg", "alt": "Robotic arms unloading glass sheets on a factory line", "credit": {"href": "https://commons.wikimedia.org/wiki/File:Float_Glass_Unloading.jpg", "label": "ICAPlants, CC BY-SA 3.0"}, "illustrative": true},
      {"src": "/images/journey/factory_palletizing.jpg", "alt": "Robotic arms palletizing crates on a factory floor", "credit": {"href": "https://commons.wikimedia.org/wiki/File:Factory_Automation_Robotics_Palettizing_Bread.jpg", "label": "KUKA Roboter GmbH, public domain"}, "illustrative": true},
    ],
    links: [],
  },
  {
    id: "c8",
    when: "2023–2024",
    title: "Case Western",
    line: "Master of Science in AI/ML and Robotics. Bio-inspired and soft robotics in Roger Quinn's Biorobotics Lab, including soft robotic graspers.",
    carried: "The full stack: hardware, software and learning.",
    logo: {"src": "/images/journey/logo_cwru.svg", "alt": "Case Western Reserve University"},
    media: [
      {"src": "/images/journey/cwru_softworm.jpg", "alt": "A soft, worm-inspired robot from the Biorobotics Lab", "credit": {"href": "https://www.youtube.com/watch?v=lizfM1ZqiAI", "label": "CWRU on YouTube"}},
      {"src": "/images/journey/cwru_crab.jpg", "alt": "A crab-inspired legged robot", "credit": {"href": "https://case.edu/think/spring2024/wild-ideas.html", "label": "Jianfeng Zhou, CWRU Think"}},
      {"src": "/media/journey/cwru_crab.mp4", "alt": "Crab-inspired robots on land and underwater", "video": true, "credit": {"href": "https://www.youtube.com/watch?v=csZAN4yw_aU", "label": "Veale Institute, CWRU"}},
      {"src": "/media/pick_place.mp4", "alt": "Pick and place, simulated", "video": true},
    ],
    links: [
      { href: "https://github.com/Sampreeth98", label: "github.com/Sampreeth98" },
    ],
  },
  {
    id: "c9",
    when: "2024",
    title: "High-speed object-following arm",
    line: "A 5-DOF arm with a depth camera on its wrist. YOLO finds the target, and a trained network turns it into smooth motion at high frequency. Simulated in Isaac Sim and Gazebo, run on a Raspberry Pi.",
    carried: "Perception to motion, in a closed loop, fast.",
    media: [
      {"src": "/images/p11.png", "alt": "The arm, CAD render"},
      {"src": "/media/journey/arm_cam.mp4", "alt": "The arm tracking its target from the wrist camera", "video": true},
    ],
    links: [
      { href: "https://github.com/Sampreeth98/ROS2-Projects", label: "ROS2-Projects" },
    ],
  },
];

// The four arenas of the Open Droids work, in the order the story tells them.
export const arenas: Arena[] = [
  { label: "Home", body: "Laundry, dishwashers, clearing the table." },
  { label: "Healthcare", body: "A semi-nurse for the 3 a.m. chores." },
  { label: "Industry", body: "Cleaning, bin picking, work in the field." },
  { label: "Hotels", body: "Check-in, room deliveries, patrols, self-docking." },
];

// Each item quotes its source verbatim (a headline or a line from the piece); the ticker links to it.
// `title` stands in, unquoted, where the source text can't be read without a login.
export type Press = { href: string; source: string; quote?: string; title?: string };

export const press: Press[] = [
  { href: "https://www.therobotreport.com/open-droids-develops-both-single-dual-arm-mobile-manipulators/", source: "The Robot Report", quote: "The company is on a fast track to bring these solutions to market." },
  { href: "https://mashable.com/article/ces-unveiled-2025-open-droids-r2d3-domestic-robot", source: "Mashable", quote: "Open Droids' R2D3 domestic robot is 'Roomba on crack'" },
  { href: "https://x.com/mashable/status/1876192056114032966", source: "Mashable on X", quote: "Open Droids wants to chart a course in how we use robots for domestic tasks." },
  { href: "https://x.com/TechCrunch/status/1876761274979070059", source: "TechCrunch on X", quote: "Open Droids' R2D3 dual-arm robot aims to handle a ton of household chores." },
  { href: "https://www.youtube.com/watch?v=Zld8HilE8RI", source: "CES 2025 walkthrough", quote: "R2-D3 & R1D1 Open-Source Robots for Home & Hospitality" },
  { href: "https://www.roboticgizmos.com/opendroids-r2d3/", source: "Robotic Gizmos", quote: "Open Droids R2D3 Modular Open Source Dual Arm Robot" },
  { href: "https://x.com/evan_wineland/status/1878920872616239218", source: "Evan Wineland on X", quote: "It's good to see more companies building non-wheeled, general-purpose platforms like @opendroids_" },
  { href: "https://aiforgood.itu.int/speaker/r2d3/", source: "ITU AI for Good", quote: "Built on an open-source platform, our robots are highly customizable." },
  { href: "https://x.com/OpenDroids/status/1990947763853631524", source: "Open Droids on X", quote: "Twice the speed, 99.9% less funding... @OpenDroids wins" },
  { href: "https://x.com/OpenDroids/status/1990949159910912138", source: "Open Droids on X", quote: "We welcome other challengers to the new dishes benchmark." },
  { href: "https://x.com/Scobleizer/status/1991054552381169733", source: "Robert Scoble on X", quote: "Robot wars." },
  { href: "https://luma.com/8ca2z1rr", source: "Physical AI Hack 2026", quote: "Real robots on site, including Unitree G1, Open Droids R1D2/R2D3" },
  { href: "https://www.linkedin.com/feed/update/urn:li:activity:7423378253114974208/", source: "Dhruv Diddi on LinkedIn", title: "The hackathon, January 2026" },
];

export const now = { eyebrow: "Now", story: "Sixteen years of closing the loop between what a robot sees and what it does. Now I'm building a new way to understand manipulation for robotics. That's all I'll say for now.", mission: "I'm here to make robots fully autonomous. I'm not stopping until then!" };

export const contact = {
  line: "Building towards autonomous robots, or funding people who are? Let's talk.",
  email: "rk.sampreeth@gmail.com",
  linkedin: "https://www.linkedin.com/in/sampreethradhakrishna/",
  github: "https://github.com/SampreethRadhaKrishna",
  githubOld: "https://github.com/Sampreeth98",
  linkedinLabel: "LinkedIn",
  githubLabel: "GitHub",
  githubOldLabel: "older projects",
};

export const footer = {
  left: "Sampreeth Radha Krishna · San Francisco",
  right: "30,000 particles, in transit behind every line of this page.",
};
