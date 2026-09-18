> **Superseded by `04-content-v3-draft.md` (2026-09-05) after pulling LinkedIn/GitHub/press data. Kept for comparison.**

# Portfolio Content v2 — Draft 1

Status: first elevated pass. Everything here is derived from the existing site
plus what the project screenshots actually show. Nothing is invented.
Anything in `[FILL: …]` is a slot where a real number or fact from you would
make the claim land harder. Anything in `[VERIFY]` is an inference I made
from your screenshots that you should confirm before it goes live.

---

## 0. Positioning strategy (read this first)

**The angle:** *An engineer who takes robots from perception to actuation on
real hardware.* Not "robotics + CV + design" (three nouns), but one story:
you see the world (YOLO, OpenCV, lidar, SLAM), you decide (kinematics,
control, RL), and you make the hardware move (ROS2, Raspberry Pi, Arduino,
PLC). Every project on the site already fits that arc. We just say it out
loud.

**Why this is believable:** your ArmCam logs literally show the whole loop in
one screen: YOLO detection → pixel error from image center → joint-state
delta → published command → new pose. That is closed-loop visual servoing,
and it is a far stronger proof point than "High FPS".

**Three rules I applied throughout:**
1. **Verbs over adjectives.** "Built", "tuned", "closed the loop", not
   "advanced", "cutting-edge", "innovative".
2. **Specifics over superlatives.** One real number beats three
   intensifiers. Where I don't have the number, I left a `[FILL]`.
3. **Own the honest version of Accenture.** It was RPA / enterprise
   software, not robotics. Framed correctly it is a strength: three years of
   production discipline (Linux, deployments, on-call debugging, AWS) that
   most fresh robotics grads don't have.

**Project order changed** to lead with the strongest evidence:
ArmCam → Fire-fighting robot → ADAS airbag car → Pick & place.
(Fire robot moves up because it is the only one with a real SLAM map *and*
a real detection frame. Pick & place moves last because its visuals are the
weakest and it overlaps with ArmCam.)

---

## 1. Header / Hero

**Name:** Sampreeth Radha Krishna

**Title line (pick one):**
- A. Robotics Engineer — Perception · Control · Real Hardware
- B. Robotics Engineer. I make robots see, decide, and move.
- C. Robotics Software Engineer — ROS2 / Computer Vision / Autonomy

*(My pick: B for the hero, C for the browser tab / SEO title.)*

**One-line hook under the name:**
> I build the loop between a camera and a motor.

**Alternate hooks:**
> Perception in, motion out. Everything in between is my job.

> From pixels to joint torques, on hardware that actually ships.

**Status line (only if true — see open questions):**
`[FILL: e.g. "Currently: Robotics Engineer @ ___" or "Open to robotics roles — US / remote"]`

**Social:**
- LinkedIn → https://www.linkedin.com/in/sampreethradhakrishna
- GitHub → https://github.com/Sampreeth98
- Email → rk.sampreeth@gmail.com `[VERIFY you want this public]`
- `[FILL: resume PDF link]`

---

## 2. About / Introduction

### Short version (hero paragraph, ~60 words)

> I'm a robotics engineer who works across the whole stack: cameras and lidar
> on one end, ROS2 nodes and motor commands on the other. I've built visually
> servoed robotic arms, SLAM-driven mobile robots, and sensor-fused collision
> systems, and I spent three years before grad school shipping production
> software at Accenture. I like problems where the code has to survive
> contact with real hardware.

### Long version (if the layout wants a second paragraph)

> My background is mechanical engineering, which means I think about robots
> as physical systems first: kinematics, actuators, sensor placement, what
> breaks. My master's at Case Western (AI/ML & Robotics) added the other
> half: deep learning for perception, reinforcement learning for control, and
> ROS2 as the glue. The result is that I'm comfortable in Gazebo and on a
> Raspberry Pi, in a YOLO training loop and in a PLC ladder diagram.
>
> Before Case Western I was a software engineer at Accenture for almost
> three years, working on automation systems in C++ and Python on Linux and
> AWS. That's where I learned what "production" means: deployments, on-call
> debugging, middleware that can't go down. I bring that discipline to
> robotics, where too much code lives and dies in a demo.

### Rejected phrasings (so we don't drift back)
- "excel in designing advanced robotic systems" → says nothing
- "Passionate about innovation" → everyone says this
- "cutting-edge technological solutions" → delete on sight
- "over two years of experience" → stale and undersells; it's 3 yrs industry + 1.5 yrs grad research

---

## 3. Selected Projects

Each project follows the same skeleton so the site can render them as
uniform cards: **Problem → What I built → How it works → Stack → Proof**.

---

### 3.1 ArmCam — Visually Servoed Robotic Arm

**One-liner:** A robotic arm that keeps whatever it's told to look at in the
center of its wrist camera, in real time.

**Problem**
Fixed cameras lose objects the moment they move or get occluded. Mounting
the camera on the end effector solves that, but only if the arm can react
fast enough to what the camera sees.

**What I built**
A 3-link arm `[VERIFY DOF count from CAD]` with a depth camera on the end
effector, running a closed perception-to-control loop in ROS2: a YOLO node
detects the target, computes its offset from image center, converts that
error into joint-space deltas, and publishes new joint states. The arm
tracks and records the target as it moves. Voice targets can be issued
through Alexa ("track the cup").

**How it works**
- YOLOv8 `[VERIFY version]` inference on each frame (~35–50 ms/frame on
  the dev machine in the logs shown)
- Pixel error (target centroid − image center) → proportional joint update
  `[VERIFY: is it P-only or something smarter? RL was listed — for what?]`
- Forward kinematics to publish resulting Euler pose for logging/validation
- Simulated first in Gazebo, then deployed to Raspberry Pi + Arduino
  driving the servos `[VERIFY hardware bring-up actually happened]`

**Stack**
ROS2 · C++ · Python · CMake · YOLO · OpenCV · Gazebo · Raspberry Pi · Arduino · Alexa Skills Kit

**Proof**
- Screenshot: live ROS2 log showing detection → center error → joint command
  in one frame
- CAD/URDF render of the arm
- `[FILL: video / GIF of the arm tracking a moving object — this is the single
  highest-value asset you could add to the site]`
- `[FILL: tracking metric, e.g. "re-centers within N frames" or "holds target
  within ±X px at Y fps"]`

**Where "Reinforcement Learning" fits**
The old page lists RL. If RL was used (e.g. learning the servo gains, or a
policy replacing the P-controller), that deserves its own bullet. If it was
explored but not shipped, say "explored RL-based servoing in Gazebo" and no
more. `[VERIFY]`

---

### 3.2 Autonomous Fire-Fighting Robot

**One-liner:** A mobile robot that maps a room, finds a fire, and drives to
it on its own.

**Problem**
Small indoor fires are found by smoke detectors, not by anything that can
go look. The question was whether a cheap mobile platform could localize
itself, detect fire visually and thermally, and navigate to the source
without a human in the loop.

**What I built**
A miniature differential-drive `[VERIFY drive type]` robot with SLAM-based
navigation, a camera running a fire-detection model, and thermal/temperature
sensors for confirmation. The robot builds an occupancy grid of the room,
patrols, and when the vision model and the heat sensor agree, navigates to
the target and triggers the extinguisher `[VERIFY: what was the extinguisher
mechanism — fan, CO2 cartridge, pump?]`.

**How it works**
- SLAM (occupancy grid mapping + localization) for autonomous navigation
- CNN-based fire classifier on the camera stream (screenshot shows a
  detection at 0.62 confidence) `[VERIFY model: custom-trained YOLO? which dataset?]`
- Sensor fusion: vision detection must be corroborated by temperature
  sensor before acting, to suppress false positives from bright lights
  `[VERIFY this gating logic exists — if not, it's a good thing to add and
  then claim]`
- Ultrasonic sensors for close-range obstacle avoidance

**Stack**
SLAM · Computer Vision · Deep Learning · Temperature/IR sensors · Ultrasonic · Arduino · `[VERIFY: ROS on a Pi, or Arduino-only?]`

**Proof**
- Screenshot: live occupancy grid with robot pose
- Screenshot: fire detection bounding box on a real flame
- `[FILL: map size / navigation success rate / detection precision if measured]`

---

### 3.3 ADAS Collision Detection Car with External Airbag

**One-liner:** A scale ADAS testbed that predicts an unavoidable collision
and deploys an external airbag before impact.

**Problem**
Automatic emergency braking helps until physics says it's too late. Once a
collision is unavoidable, the only remaining lever is how the impact is
absorbed. External airbags exist in concept but need a reliable
"unavoidable" decision, fast.

**What I built**
A robot car fitted with lidar, ultrasonic sensors, and a camera, running
obstacle detection and time-to-collision estimation. When TTC drops below a
braking-feasibility threshold, the system fires a front-mounted airbag
mechanism `[VERIFY: physical prototype, simulation only, or both? p32.png
looks like a sim frame]`.

**How it works**
- Multi-sensor obstacle detection (lidar for range, camera for
  classification, ultrasonic for near-field)
- SLAM / V-SLAM for ego-motion estimation `[VERIFY: was SLAM actually used
  for TTC, or was it a separate demo? Don't claim it if it's decorative]`
- Collision-risk state machine: warn → brake → deploy
- ROS2 on Raspberry Pi

**Stack**
ROS2 · Lidar · Camera · Ultrasonic · SLAM · Raspberry Pi · `[FILL: actuation for the airbag]`

**Proof**
- Sim frame of airbag deployment on wall impact
- `[FILL: replace the stock ADAS lane-sensing image (p31.png) with your own
  sensor visualization — a stock image undermines credibility next to real
  screenshots elsewhere]`
- `[FILL: deployment latency or TTC threshold]`

---

### 3.4 Voice-Controlled Pick & Place Arm

**One-liner:** Say "pick up the banana" and a 4-DOF arm finds it, plans a
grasp, and moves it.

**Problem**
Pick-and-place is the canonical arm task, but most student versions are
hard-coded waypoints. The goal was end-to-end: natural-language command →
visual detection → kinematics → grasp.

**What I built**
A 4-DOF arm with a claw end effector `[VERIFY: KUKA model in sim, or
"KUKA-style" custom build?]`. An Alexa skill parses the command, an OpenCV
pipeline detects and localizes the named object, inverse kinematics solves
the joint targets, and the arm executes the pick and place.

**How it works**
- Alexa Skills Kit → intent → ROS2 topic
- OpenCV object detection + pixel-to-world mapping `[VERIFY method: color
  segmentation? ArUco? depth?]`
- Analytical IK / FK for the 4-DOF chain
- Raspberry Pi as ROS2 host, Arduino driving servos

**Stack**
ROS2 · C++ · Python · OpenCV · Inverse/Forward Kinematics · Alexa Skills Kit · Raspberry Pi · Arduino

**Proof**
- GIF of operation (p222.gif)
- Detection scene render
- `[FILL: grasp success rate over N trials]`

---

### Suggested "Also built" strip (optional, one line each)
If you have anything else from CWRU coursework or Accenture that's
shareable, a low-key list here adds depth without needing full write-ups.
`[FILL: e.g. "Kalman-filter lidar odometry (ROS2)", "PID tuning on inverted pendulum", …]`

---

## 4. Experience

### Accenture — Software Engineer
Bengaluru, India · Aug 2020 – May 2023 (2 yrs 10 mos)

> Built and operated automation systems for enterprise clients. C++ and
> Python on Linux, deployed on AWS.

- Developed and maintained automation pipelines (RPA + custom middleware)
  in C++/Python `[FILL: what did the automation actually do? one concrete
  sentence, e.g. "processed X records/day for a banking client"]`
- Owned application bring-up and deployment across environments; wrote the
  batch/SQL layers that fed them
- Debugged production issues under SLA `[FILL: any number — incidents
  resolved, uptime, latency cut]`
- Worked in Agile with Jira; AWS for hosting and storage

*Honest framing note:* "Robotic Process Automation" is software automation,
not robotics. Keep the term (recruiters search it) but don't let it sit next
to "robot" without context. The value here is production engineering
maturity.

### Bosch Rexroth — Industrial Automation Intern
Bengaluru, India · Jun 2019 – Aug 2019

> Hands-on with the actuators robots are built from.

- Programmed PLCs for electro-hydraulic and electro-pneumatic systems
- Commissioned and tested sensor/camera setups on industrial automation
  cells `[VERIFY]`
- Led a small intern team on `[FILL: what project?]`

---

## 5. Skills

Grouped by *what you can do*, not alphabetical soup. Drop anything you
wouldn't be happy to be interviewed on.

| Area | Tools |
|---|---|
| **Perception** | OpenCV, YOLO, PyTorch, TensorFlow, depth cameras, lidar, ultrasonic, thermal |
| **Localization & Mapping** | SLAM, V-SLAM, occupancy grids `[FILL: specific packages — slam_toolbox? ORB-SLAM? Cartographer?]` |
| **Control & Planning** | Forward/inverse kinematics, visual servoing, PID `[VERIFY]`, reinforcement learning |
| **Robotics Middleware** | ROS2, Gazebo, URDF, `[FILL: MoveIt? Nav2?]` |
| **Languages** | C++ (CMake), Python, SQL |
| **Embedded & Industrial** | Raspberry Pi, Arduino, PLC programming, electro-hydraulic / pneumatic systems |
| **Software Engineering** | Linux, Git, AWS, CI/CD `[VERIFY]`, Agile/Jira, production debugging |
| **Mechanical** | CAD `[FILL: which tool]`, mechanism design, 3D printing `[VERIFY]` |

---

## 6. Education

**Case Western Reserve University** — Cleveland, OH
M.S. Mechanical Engineering, specialization in AI/ML & Robotics · Jan 2023 – May 2024
`[FILL: thesis/capstone title if any, GPA if ≥3.7, notable coursework]`

**RNS Institute of Technology** — Bengaluru, India
B.E. Mechanical Engineering · Jul 2016 – Aug 2020
`[FILL: final-year project if robotics-related]`

---

## 7. Contact / CTA

> Building something that has to work outside the lab? Let's talk.

- Email · LinkedIn · GitHub · Resume (PDF)

---

## 8. Open questions for you (answer these and Draft 2 gets sharp)

1. **What have you been doing since May 2024?** This is the biggest hole.
   A current role, a research position, contract work, or a job search all
   need different framing.
2. **ArmCam:** Did it run on real hardware or only Gazebo? Where exactly did
   RL come in? Do you have a video?
3. **Fire robot:** Did the extinguisher actually extinguish anything? Was it
   ROS-based or Arduino-only?
4. **ADAS car:** Physical airbag or simulation only?
5. **Pick & place:** Real KUKA in a lab, or a custom 4-DOF build?
6. **Accenture:** One concrete sentence about what the automation did and
   for whom (industry is fine if the client is confidential).
7. **Any numbers at all** you can stand behind: fps, latency, success rate,
   map size, trials. Even one per project changes the tone from "student
   project" to "engineered system".
8. **Public GitHub repos** for any of these? Linking code is the strongest
   believability signal there is.
9. Do you want the **email visible** on the page?
