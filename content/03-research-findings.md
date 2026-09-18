# Research Findings — public sources (2026-09-05)

What I could verify about you and Open Droids from public sources, what
contradicts the old website, and what I could not reach.

## Access notes
- **LinkedIn** blocks anonymous fetches (HTTP 999) and the Chrome extension was
  not connected, so I could not read your profile directly. Everything
  LinkedIn-derived below comes from search-engine snippets of your profile and
  posts. Exact dates and bullet text are still missing.
- **GitHub**: you have two accounts. `Sampreeth98` (created Jul 2023, CWRU-era
  projects, portfolio repo) and `SampreethRadhaKrishna` (created 23 Nov 2024,
  company `@OpenDroids-robot`, location San Francisco). The second one carries
  all the Open Droids work.

---

## 1. Current role — Open Droids (San Francisco)

| Source | How you are described |
|---|---|
| LinkedIn page title (search snippet) | "Robotics Software Engineer" |
| LinkedIn about/snippets | "Lead Robotics Software Engineer at Open Droids" |
| opendroids.com/team | "Full Stack Robotics Engineer — Specializes in full-stack robotics development, integrating hardware and software systems. Brings expertise in ROS, computer vision, and autonomous systems." |
| GitHub `SampreethRadhaKrishna` | company `@OpenDroids-robot`, location San Francisco |
| LinkedIn about (snippet) | "creating innovative domestic robots that seamlessly integrate hardware and software systems using ROS2, Modern C++, and Python… expertise in Computer Vision and AI" |
| LinkedIn (snippet) | "part of the organizing team at Open Droids hackathon events… holding up the fort all the way to the end" |

**Start date: not found.** Best inference: around Nov 2024 (second GitHub
account created 23 Nov 2024 already tagged with the company). `[VERIFY]`

### Provable contributions (GitHub, org `Open-Droids-robot`)

**`R2D3_ros2`** — the ROS 2 stack for the R2D3 dual-arm mobile manipulator.
You are the #1 contributor (25 commits vs 11 and 1). Timeline:
- 2025-08-06 `R2D3_kickoff` — created the repo and initial workspace
- 2025-09-01 Woosh AMR chassis ROS interface developer notes, base command docs
- 2025-10-07 ROS 2 / MoveIt 2 install scripts
- 2025-10-18→24 Docker dev environment with **multi-distro support (Foxy / Humble / Jazzy)**, docker-compose, Makefile, X11 + PulseAudio passthrough, devcontainer setup
- 2025-11-12 **Gazebo Harmonic (Gz Sim) simulation quickstart**: ros2_control + MoveIt 2 for the 6-DOF (RM65-B) and 7-DOF (RM75-B) arm variants
- 2025-12-03 base step-control interface
- 2026-07-09→11 reviewed/merged teammate PRs (Nav2 pipeline, RTAB-Map SLAM, Jazzy support, bringup package), URDF fixes (start pose, camera + lidar yaw), 2-finger gripper branch

Hardware documented in the README you maintain: RealMan RM75-B 7-axis arms
(RM65-B 6-axis variant), Intel RealSense D435, NVIDIA Jetson Xavier NX,
Woosh AMR chassis, head/lift expansion joints, EG2-4C2 gripper or RM56DFX
dexterous hands, microphone array.

**`od-arm-controllers`** — README: *"Created by SampreethRadhaKrishna @ Open Droids."*
Python arm-control layer for VLA policies: **QP-based inverse kinematics**
with joint-limit and velocity constraints (qpSWIFT), forward kinematics,
**concurrent dual-arm control**, NaN/limit/reachability safety checks,
gripper pick/release, per-arm YAML config (mount angle, work/tool frames).
Runs at 50 Hz against the RealMan SDK.

**`X-VLA`** (fork of the ICLR 2026 paper *"Soft-Prompted Transformer as
Scalable Cross-Embodiment Vision-Language-Action Model"*, 0.9B params).
Your commit `tuned for r2d3` (2026-07-06) added: `inference_server.py`,
`launch_deploy.sh`, `install_pytorch_jetson.sh`, `benchmark_client.py`,
`debug_preprocessing.py`, and small model edits. I.e. you got a 0.9B VLA
serving actions **on the robot's Jetson**.

**`.github`** — sole author of the Open Droids organization profile README
(mission, stack, "Skillnet > Skynet").

**`r1d1`** — merged a community PR to the R1D1 URDF repo.

### Community / events
- **Physical AI Hackathon, San Francisco**: you provided the R2D3 to the
  team (Riddhima Medatwal, Claire Li, Shreeganesh R., Roey Ben Chaim, Daniel
  Wu) that fine-tuned **π0** on 40 kinesthetic demos with 3 synced cameras
  and deployed it back on hardware with temporal ensembling for latte-art
  pouring. Dataset, model and code were open-sourced.
- **Physical AI Hack 2026** at Founders Inc, SF: R1D2/R2D3 listed as on-site
  robots alongside Unitree G1, Open Duck, LeRobot SO-101.
- LinkedIn snippet says you helped organize/run Open Droids hackathon events.

### Current interests (forks on your account, Jul 2026)
BEHAVIOR-1K (embodied-AI benchmark), DimOS (agentic OS for robots),
ConceptGraphs (3D scene graphs), AI for Industry Challenge toolkit.

---

## 2. Company context — Open Droids (for credibility framing)
- Founded Mar 2024, San Francisco. Founders: Abhishek Gupta (CEO), Jackson
  Jesionowski, Ashish Gupta. Advisors listed include Brock Pierce and
  Christine Peterson; board member ex-Anduril/Palantir.
- **R1D1** single-arm mobile manipulator launched Aug 2024: 6-DOF arm, 62.2 cm
  reach, 3 kg payload, 1.22 m lift, 0.67 m/s, depth camera, auto-docking.
  $18,500.
- **R2D3** dual-arm platform unveiled at **CES 2025** (Venetian Expo).
  ~$55–60k. Covered by TechCrunch, Yahoo Tech, Mashable, The Robot Report
  (27 Dec 2024), ITU AI for Good Global Summit 2025 speaker page.
- Pilots reported in rehabilitation centers, restaurants, hotels; talks with
  Baskin-Robbins and Subway for pre-orders.
- Product line now: R1D1 / R1D2 / R1D3 (single arm), R2D3 (dual arm), DH116
  dexterous hand, data-collection glove.
- Open-source stance: Apache-2.0 / MIT repos, "If your robot is not Open
  Source, it is NOT YOUR ROBOT."

Useful press links:
- https://www.therobotreport.com/open-droids-develops-both-single-dual-arm-mobile-manipulators/
- https://tech.yahoo.com/general/articles/ces-unveiled-2025-opendroids-r2d3-042543404.html
- https://aiforgood.itu.int/speaker/r2d3/
- https://github.com/Open-Droids-robot
- https://www.opendroids.com/team

**No article is *about you* specifically.** Coverage is about the company and
the robot. The honest, still-strong move is: "the robot on stage at CES /
in TechCrunch runs a stack I own."

---

## 3. Contradictions: old website vs LinkedIn/GitHub (LinkedIn wins)

| Topic | Old website | LinkedIn / GitHub | Resolution |
|---|---|---|---|
| Title | "Robotics Engineer" | "Robotics Software Engineer" (headline); "Lead Robotics Software Engineer" (about) | Use **Robotics Software Engineer** as headline; "Lead" on the Open Droids entry `[VERIFY]` |
| Experience | "over two years" | ~2y10m Accenture + ~1y10m Open Droids | "5+ years building software; 2 shipping robots" |
| Current role | none | Open Droids, SF | Add as lead entry |
| Location | implied Cleveland | San Francisco Bay Area | Update |
| HAL | absent | "previous roles at Accenture, Bosch Rexroth and **Hindustan Aeronautics Limited**" | Add; aeronautic systems, before 2019; dates/role `[FILL]` |
| ArmCam | "Cobot", no DOF | 4 DOF; simulated in **Isaac Sim and Gazebo**; "60% faster response than standard CV methods"; profile README says "currently working on it" | Use 4-DOF; keep 60% only if you can explain the baseline |
| ADAS airbag | no number | "capable of absorbing 50–60% of the impact" | Use with `[VERIFY method]` |
| Fire robot | ROS implied | Arduino-based | Say Arduino |
| Pronouns | — | He/Him (GitHub README) | noted |
| Social links | broken `#` links | — | fix |

---

## 4. Still missing (only you can supply)
1. Open Droids start month, and exact title(s) on LinkedIn (was there a
   promotion to Lead? when?).
2. Hindustan Aeronautics Limited: role, dates, one sentence on what you did.
3. LinkedIn experience bullets for Accenture / Bosch / HAL (I have only the
   old site's keyword lists).
4. Anything you did at Open Droids that isn't in public GitHub: deployments,
   CES prep, customer pilots, hardware bring-up, team size you lead.
5. Whether you want the email public.

## 5. Added 2026-09-05 (second pass)
- **Solar car (LinkedIn snippet):** "designed and led the development of an electric solar vehicle from scratch for the ISIE (Imperial Society of Innovative Engineers) Electric Solar Vehicle Championship in 2018–2019… lightweight composite body and a high-efficiency solar panel system… design, fabrication, testing, and competition preparation completed within a tight deadline and budget."
- **User corrections:** fire robot and collision car were built during the bachelor's degree; pneumatics/hydraulics/robotic arms were at Bosch Rexroth, not HAL; hackathons stay generic.
