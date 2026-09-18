> **Structure superseded by `06-journey-narrative.md` (journey format). This file remains the fact base and detail source.**

# Portfolio Content — Draft 2 (v3)

Built from: old website + GitHub (both accounts) + Open Droids GitHub org +
LinkedIn search snippets + press coverage. See `03-research-findings.md`
for sources. Where LinkedIn and the old site disagreed, LinkedIn wins.

`[FILL: …]` = a real fact from you would make this land harder.
`[VERIFY]` = inferred from public evidence; confirm before it goes live.

---

## 0. Positioning (what changed since Draft 1)

Draft 1 positioned you as a strong grad who builds perception-to-actuation
loops. That is now the *backstory*. The headline is:

**You own the software stack of a commercially shipping dual-arm mobile
manipulator, at a startup that was on stage at CES and in TechCrunch.**

Everything else on the page supports that one sentence:
- R2D3 ROS 2 stack: you created it and are the top contributor
- Dual-arm QP-IK controller for VLA policies: you authored it
- 0.9B vision-language-action model running on the robot's Jetson: you deployed it
- Hackathon teams fine-tuning π0 on your robot: you enabled it
- Before that: CWRU robotics research, 3 years of production software at Accenture

**Believability guardrails**
- Never say "built R2D3". You built its *software stack / ROS 2 integration*.
  The arms are RealMan, the base is Woosh. Say so; it reads as competence,
  not as a downgrade.
- Press coverage is about the robot, not you. Phrase as "the robot covered
  by TechCrunch runs on…", never "featured in TechCrunch".
- "Lead" appears in your LinkedIn about text; the headline says "Robotics
  Software Engineer". Use Lead on the job entry only if it is your actual
  title. `[VERIFY]`
- Student projects move to a second tier. They stay because they show
  range, but they no longer carry the page.

---

## 1. Hero

**Name:** Sampreeth Radha Krishna

**Headline:** Robotics Software Engineer

**Sub-line (pick one):**
- A. I build the software that makes dual-arm robots useful outside the lab.
- B. Perception → planning → dual-arm control, on robots that ship.
- C. ROS 2 · Manipulation · VLA deployment. Currently: Open Droids, San Francisco.

*(My pick: A as the big line, C as the small mono line under it. The
robotic-HUD design can render C like a status readout.)*

**Status readout (HUD style, all verifiable):**
```
ROLE      Lead Robotics Software Engineer @ Open Droids   [VERIFY title]
LOCATION  San Francisco, CA
STACK     ROS 2 (Foxy→Jazzy) · Modern C++ · Python · MoveIt 2 · Nav2 · Jetson
PLATFORM  R2D3 dual-arm mobile manipulator
STATUS    [FILL: "Open to conversations" / "Not looking" / nothing]
```

**Links:** LinkedIn · GitHub (SampreethRadhaKrishna) · GitHub (Sampreeth98, older projects) · Email `[VERIFY public]` · Resume PDF `[FILL]`

---

## 2. About

### Short (hero paragraph)

> I'm a robotics software engineer at Open Droids in San Francisco, where I
> own the ROS 2 stack for R2D3, our dual-arm mobile manipulator. That means
> everything between the sensors and the motors: drivers, simulation,
> motion planning, a QP-based dual-arm IK controller, and the deployment
> path that puts vision-language-action models on the robot's Jetson.
> Before this I did my master's in AI/ML and robotics at Case Western and
> spent three years shipping production software at Accenture. I like the
> part of robotics where the demo has to keep working on Tuesday.

### Long (optional second paragraph)

> My background is mechanical engineering, so I think about robots as
> physical systems first: kinematics, mounting offsets, what the arm does
> when the IK solver returns NaN. Grad school at Case Western added the
> learning side, and Open Droids is where the two met. I've been the person
> who writes the Docker environment so the team can build on three ROS
> distros, the person who writes the chassis interface notes at 1 a.m.
> before a demo, and the person who hands a working robot to a hackathon
> team and watches them teach it latte art by Sunday. I'm most interested
> in the gap between a policy that works in a notebook and a robot that
> works in a kitchen. `[VERIFY "1 a.m." anecdote or replace with a true one]`

### Rejected phrasings
- "cutting-edge", "innovative", "passionate about innovation", "seamlessly"
  (LinkedIn about uses these; the site should not)
- "Full Stack Robotics Engineer" as the headline: fine on the team page,
  reads as buzzword on a personal site. Keep "Robotics Software Engineer".

---

## 3. Experience

### Open Droids — Lead Robotics Software Engineer `[VERIFY title + start]`
San Francisco, CA · `[FILL: Nov 2024?]` – Present

> Open-source dual-arm mobile manipulators for homes, hospitality and
> healthcare. R2D3 unveiled at CES 2025; pilots in rehab centers and
> restaurants.

**Owned the R2D3 ROS 2 software stack** (creator and primary contributor of
the public repo):
- Integrated the full platform under ROS 2: RealMan RM75-B 7-DOF arms
  (and RM65-B 6-DOF variant), Woosh autonomous mobile base, head and lift
  expansion joints, Intel RealSense D435, microphone array, on an NVIDIA
  Jetson Xavier NX.
- Built the containerized dev environment supporting **ROS 2 Foxy, Humble
  and Jazzy** from one Makefile, with GUI (RViz/Gazebo) and audio
  passthrough, so contributors can build on any Ubuntu 20.04–24.04 host.
- Ported the robot to **Gazebo Harmonic** with ros2_control and MoveIt 2
  configs for both arm variants; wrote the simulation quickstart the
  community uses.
- Wrote the developer-facing interface docs for the Woosh AMR base
  (services, topics, actions) and the base step-control interface.
- Reviewed and merged the team's Nav2 navigation pipeline, RTAB-Map SLAM
  and unified bringup packages; fixed sensor frame calibration (camera and
  lidar yaw) in the URDF.

**Authored the dual-arm controller used for learned policies**
(`od-arm-controllers`):
- QP-based inverse kinematics with joint-limit and velocity constraints,
  forward kinematics, and concurrent left/right arm execution at 50 Hz.
- Safety layer: NaN detection, joint-limit validation, reachability checks
  before any command reaches the hardware.
- Per-arm configuration for mounting angle, work frame and tool offset, so
  the same controller drives both arms of the mirrored dual-arm build.

**Deployed a 0.9B vision-language-action model on the robot**
- Tuned the ICLR 2026 X-VLA cross-embodiment model for R2D3: inference
  server, deployment scripts, Jetson PyTorch install path, benchmark and
  preprocessing debug clients.
- `[FILL: any task it ran, success rate, or latency. Even "runs at N Hz on
  the Xavier NX" is gold here.]`

**Community and events**
- Robot lead for Open Droids at Bay Area physical-AI hackathons: supplied
  and supported R2D3 for the team that fine-tuned π0 on 40 kinesthetic
  demonstrations for latte-art pouring and deployed it back on hardware
  (dataset, model and code open-sourced). `[VERIFY your exact role]`
- Wrote the Open Droids GitHub organization profile and contributor
  onboarding docs.
- `[FILL: CES 2025 prep? customer pilots? demos you ran? team size you
  lead or mentor?]`

### Accenture — Software Engineer
Bengaluru, India · Aug 2020 – May 2023

> Automation systems for enterprise clients; C++ and Python on Linux,
> deployed on AWS.

- Built and maintained automation pipelines (RPA and custom middleware) in
  C++ and Python `[FILL: what the automation did, for which industry]`
- Owned application bring-up and deployment across environments; wrote the
  batch and SQL layers feeding them
- Debugged production incidents under SLA `[FILL: one number]`
- Agile / Jira; AWS for hosting and storage

### Bosch Rexroth — Industrial Automation Intern
Bengaluru, India · Jun 2019 – Aug 2019
- PLC programming for electro-hydraulic and electro-pneumatic systems
- Commissioning and testing of sensor and camera setups on automation cells `[VERIFY]`
- Led a small intern team on `[FILL]`

### Hindustan Aeronautics Limited — `[FILL: role]`
Bengaluru, India · `[FILL: dates, likely 2018]`
- `[FILL: one or two lines. Aerospace manufacturing / assembly / systems
  exposure is a credibility signal; even a short entry helps.]`

---

## 4. Selected Work

Two tiers. Tier 1 is professional and current. Tier 2 is graduate work,
kept short.

### Tier 1 — Open Droids

#### R2D3 ROS 2 Stack
**One-liner:** The open-source software that runs a dual-arm mobile
manipulator, from drivers to motion planning to simulation.
- Problem: a robot assembled from a RealMan dual-arm torso, a Woosh AMR
  base, lift/head joints and a depth camera had no unified ROS 2 story.
- What I built: the workspace, multi-distro Docker environment, Gazebo
  Harmonic simulation with ros2_control + MoveIt 2, base interface docs,
  URDF calibration; reviewed the Nav2 + RTAB-Map integration.
- Proof: public repo, top contributor; simulation quickstart; README.
  `[FILL: photo/video of the real robot moving under this stack]`
- Link: github.com/Open-Droids-robot/R2D3_ros2

#### Dual-Arm QP-IK Controller for VLA Policies
**One-liner:** Cartesian control for two 6/7-DOF arms that learned policies
can call without breaking the robot.
- Problem: VLA models output end-effector poses; the hardware wants joint
  commands, within limits, on two arms at once.
- What I built: QP-based IK with joint-limit and velocity constraints,
  FK, async dual-arm execution, safety checks, gripper control, YAML
  config per arm. 50 Hz loop against the RealMan SDK.
- Proof: repo README credits you as creator.
- Link: github.com/Open-Droids-robot/od-arm-controllers

#### X-VLA on Jetson
**One-liner:** A 0.9B cross-embodiment vision-language-action model served
from the robot itself.
- What I built: R2D3-specific inference server and deployment path,
  Jetson PyTorch install, benchmark and preprocessing debug tooling.
- Proof: fork commits, Jul 2026.
- `[FILL: task demo, Hz, success rate]`

#### Hackathon Robot Lead — π0 Latte Art
**One-liner:** Handed a hackathon team a working R2D3; they fine-tuned π0
on 40 kinesthetic demos and poured latte art by demo day.
- `[VERIFY your role: robot provider + on-site support? data pipeline?]`
- Proof: team's public write-up credits you for the robot; open-sourced
  dataset/model/code. `[FILL: link to their repo or post, photo]`

### Tier 2 — Graduate & independent work (Case Western, 2023–24)

#### ArmCam — Visually Servoed 4-DOF Arm
Closed perception-to-control loop in ROS 2: YOLO detection → pixel error
from image center → joint-state update → published command. Wrist-mounted
depth camera. Simulated in Isaac Sim and Gazebo; Raspberry Pi + Arduino
target. Alexa voice start/stop.
- Proof: ROS 2 log screenshot showing the loop in one frame; CAD render.
- `[VERIFY: "60% faster response than standard CV methods" from GitHub —
  keep only if you can name the baseline]`
- Link: github.com/Sampreeth98/ROS2-Projects

#### Voice-Controlled Pick & Place (4-DOF)
Alexa intent → ROS 2 → OpenCV centroid detection → analytical IK/FK →
grasp. Claw end effector, base-mounted camera.

#### ADAS Testbed with External Airbag
Lidar + camera + ultrasonic obstacle detection with collision-risk
estimation on ROS 2 / Raspberry Pi; front airbag deployment on unavoidable
impact. GitHub claims 50–60% impact absorption `[VERIFY how measured]`.
Replace the stock ADAS image with your own sensor view.

#### Autonomous Fire-Fighting Robot (Arduino)
Mobile robot with vision-based fire detection corroborated by temperature
sensing, ultrasonic collision avoidance, occupancy-grid mapping screenshot.
`[VERIFY mapping was on this robot]`

#### ML / CV coursework (one line, linked)
Transfer-learning image classifier (AlexNet/ResNet, 30k images), PySpark
water-point prediction on Hadoop, MNIST CNNs, fraud and churn models.
Link: github.com/Sampreeth98

---

## 5. Skills (by capability)

| Area | Tools |
|---|---|
| **Robotics middleware** | ROS 2 (Foxy, Humble, Jazzy), ros2_control, MoveIt 2, Nav2, URDF/xacro, Gazebo Classic + Harmonic, Isaac Sim, RViz |
| **Manipulation** | QP-based IK (qpSWIFT), FK/IK, dual-arm coordination, visual servoing, gripper/dexterous-hand integration |
| **Perception** | OpenCV, YOLO, RealSense depth, lidar, RTAB-Map / SLAM, PyTorch, TensorFlow |
| **Robot learning** | VLA deployment (X-VLA, π0), kinesthetic data collection `[VERIFY]`, embodied-AI benchmarks (BEHAVIOR-1K) `[VERIFY: exploring vs used]` |
| **Languages** | Modern C++ (CMake), Python, SQL |
| **Compute & embedded** | NVIDIA Jetson Xavier NX, Raspberry Pi, Arduino, PLCs |
| **Engineering practice** | Docker / devcontainers, Git, GitHub Actions `[VERIFY]`, Linux, AWS, PR review, technical documentation |
| **Hardware platforms** | RealMan RM65-B / RM75-B arms, Woosh AMR, electro-hydraulic and pneumatic systems |

---

## 6. Education

**Case Western Reserve University** — Cleveland, OH
M.S. Mechanical Engineering, AI/ML & Robotics · Jan 2023 – May 2024
`[FILL: thesis/capstone, notable coursework]`

**RNS Institute of Technology** — Bengaluru, India
B.E. Mechanical Engineering · Jul 2016 – Aug 2020

---

## 7. In the wild (press about the platform, phrased honestly)

> R2D3, the robot this stack runs on, was unveiled at CES 2025 and covered by
> TechCrunch, Yahoo Tech and The Robot Report, and appeared at the ITU AI for
> Good Global Summit 2025.

Links: The Robot Report · Yahoo Tech (CES Unveiled) · AI for Good ·
Open Droids GitHub

*(Only include this block if the CSS treats it as a footnote strip, not a
brag wall. Logos small, text quiet.)*

---

## 8. Contact

> Working on manipulation, VLA deployment, or getting a robot out of the
> lab? I'd like to hear about it.

Email · LinkedIn · GitHub · Resume

---

## 9. Questions for you (Draft 3 needs these)
1. Exact LinkedIn title(s) and start month at Open Droids. Was there a
   promotion to Lead?
2. Hindustan Aeronautics Limited: role, dates, what you did.
3. One number for the VLA deployment (Hz, latency, task success) and one
   for anything at Open Droids you can stand behind.
4. Your role at the latte-art hackathon, and a link to the team's post.
5. Any Open Droids work not on GitHub: CES prep, pilots, demos, people you
   lead.
6. Photos or video of the real R2D3 running under your stack. This single
   asset matters more than any sentence on the page.
7. Email public: yes/no.

---

## 10. Assets and links
Every image (existing and candidate) and every URL is inventoried in
`05-assets-and-links.md`, mapped to the section it belongs in. Read that file
alongside this one when building the site.
