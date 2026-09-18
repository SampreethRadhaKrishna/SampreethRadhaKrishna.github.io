# Current Website Content (verbatim extraction)

Source: `index.html` as of commit `fc11046`. Extracted 2026-09-05.
Only live content is captured here. The commented-out "Elements" template
demo block (lorem ipsum, sample tables, buttons, forms) and the "Contact Me"
placeholder are omitted.

---

## Header / Sidebar

- **Avatar:** `images/profpic.jpg`
- **Name:** Sampreeth Radha Krishna
- **Title:** Robotics Engineer
- **Nav:** Introduction · Education · Work Experience · Projects · (Contact me — commented out)
- **Social:**
  - LinkedIn icon → `#https://www.linkedin.com/in/sampreethradhakrishna` (broken: leading `#`, label reads "Instagram")
  - GitHub icon → `#https://github.com/Sampreeth98` (broken: leading `#`)

---

## Section 1 — Introduction

**Hero image:** `images/hand.jpg`

**Heading:** Sampreeth Radha Krishna
**Subheading:** Robotics Engineer | Computer Vision | Design

> With over two years of experience, I excel in designing advanced robotic
> systems, focusing on computer vision, V-SLAM, and optimization. Proficient
> in C++ and Python, I have extensive experience with ROS2, TensorFlow, and
> PyTorch. My work at Accenture and Bosch Rexroth involved optimizing
> automation processes and integrating control systems. Passionate about
> innovation, I've led projects like high-performance robotic arms and
> autonomous fire-extinguishing robots. I'm adept at utilizing Vision, Lidar,
> and Radar sensors to develop autonomous algorithms for localization,
> perception, learning, and control. I'm eager to leverage my skills to
> create cutting-edge technological solutions.

---

## Section 2 — Education

### Case Western Reserve University
- Master of Science in Mechanical Engineering, Specialization in AI/ML and Robotics
- Cleveland, OH
- Jan 2023 – May 2024

### RNS Institute of Technology
- Bachelor of Engineering in Mechanical Engineering
- Bengaluru, India
- Jul 2016 – Aug 2020

---

## Section 3 — Work Experience

### Accenture — Software Engineer
- Bengaluru, India · Aug 2020 – May 2023
- Keywords: Robotic Process Automation · C++ · Linux · Git · Python · Debugging · Jira · AWS Cloud · Agile Methodologies · Application Deployment · Bring Up · Middleware · Batch · SQL

### Bosch Rexroth — Industrial Intern
- Bengaluru, India · Jun 2019 – Aug 2019
- Keywords: PLC Programming · Automation · Electro-Hydraulic systems · Electro-Pneumaic systems (sic) · Team Leadership · Industrial Automation · Sensors · Cameras · Testing · Maintainance (sic)

---

## Section 4 — Projects

### 1. ArmCam: Robotic Arm with End Effector Camera
- Images: `images/p11.png` (CAD/sim render of 3-link arm with camera mount), `images/p12.png` (terminal: YOLO detections + ROS2 `image_subscriber` node logs showing pixel-center error → joint-state commands)
- Description: Developed a high-performance robotic arm with an end effector depth camera for object tracking and recording.
- Keywords: Cobot Robotic Arm · High FPS · Reinforcement Learning · YOLO Algorithm · Alexa Voice Commands · C++, CMake, Python · ROS2 · Gazebo Simulation · Raspberry Pi · Arduino

### 2. Pick and Place Robot with Alexa Control
- Images: `images/pnpcv.png` (rendered scene of geometric primitives and fruit for detection), `images/p222.gif` (animation; also `p22.png`, `p22.gif`, `p21.png` present but unused)
- Description: Engineered a kuka with a claw end effector for precise object detection and tracking for pick and place operation using Alexa voice commands.
- Keywords: 4 DOF Robotic Arm · Claw End Effector · OpenCV · Object Detection · Inverse Kinematics · Forward Kinematics · Alexa Voice Commands · C++, Python · ROS2 · Raspberry Pi · Arduino

### 3. Collision Detection (ADAS) Robot Car with Impact Prevention with Airbag System
- Images: `images/p31.png` (stock ADAS lane-sensing graphic), `images/p32.png` (sim frame: car with deployed front external airbag hitting wall)
- Description: Developed an innovative external airbag system for vehicles with ADAS using multiple sensors to detect obstacles and assess collision risks.
- Keywords: SLAM/V-SLAM · Ultrasonic Sensors · Cameras · Lidar · Real-time Obstacle Detection · Airbag System · Impact Absorption · Autonomy Algorithms · ROS2 · Raspberry Pi

### 4. Miniature Fire Extinguishing Robot
- Images: `images/p41.png` (CV detection box labelled "fire 0.62" on stovetop flame), `images/p42.png` (occupancy grid / SLAM map with robot pose)
- Description: Designed a miniature fire-fighting robot equipped with autonomous temperature detection and fire identification capabilities.
- Keywords: Autonomous Navigation · Temperature Sensors · SLAM · Computer Vision · Heat Sensor Data · Deep Learning Models · Ultrasonic Sensors · Arduino

---

## Footer
- "© Untitled. All rights reserved. Design: HTML5 UP" (template default, never updated)

---

## Unused assets in `images/`
`ann.jpg`, `avatar.jpg`, `banner.jpg`, `pic01.jpg`, `pic02.jpg`, `pic03.jpg`, `p21.png`, `p22.png`, `p22.gif`

## Issues noticed during extraction
- Both social links are broken (prefixed with `#`); LinkedIn link is labelled "Instagram".
- Image paths use backslashes.
- Typos: "Electro-Pneumaic", "Maintainance", "kuka" lowercase.
- "Over two years of experience" is stale (Accenture alone was ~2y9m; it is now Sept 2026).
- Accenture (ends May 2023) overlaps CWRU start (Jan 2023) by 5 months.
- Nothing describes what you have done since May 2024.
- Footer still says "Untitled".
