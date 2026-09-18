# Assets & Links Inventory

Every picture and URL the new site needs, in one place. Paths are relative
to the repo root. Nothing in `images/` has been moved or deleted.

---

## A. Images currently in `images/` (19 files)

### Used on the old site

| File | Size | What it actually shows | New home | Verdict |
|---|---|---|---|---|
| `profpic.jpg` | 1960×1960, 1.7 MB | Headshot | Hero / header | **Keep.** Re-export at ~800px for web. |
| `hand.jpg` | 4096×2035, 988 KB | Stock robotic hand + network overlay | Old intro hero | **Replace.** Stock art undercuts real work. Use the R2D3 photo (see B). |
| `p11.png` | 915×981 | CAD/URDF render of the 4-DOF ArmCam arm with camera mount | Tier 2 → ArmCam | Keep |
| `p12.png` | 2218×903 | Terminal: YOLO detections + ROS 2 `image_subscriber` logs showing pixel error → joint command | Tier 2 → ArmCam | **Keep, feature it.** This is the proof of the closed loop. Crop to the first block for a card thumbnail. |
| `pnpcv.png` | 659×329 | Rendered scene: primitives + fruit (banana, apple) for detection | Tier 2 → Pick & Place | Keep |
| `p222.gif` | 600×352, 78 frames, 3.3 MB | Simulated arm picking objects off a table (The Construct sim, laptop/cup/can/red ball, bin) | Tier 2 → Pick & Place | Keep, but convert to MP4/WebM (3.3 MB GIF is heavy) |
| `p31.png` | 462×282 | **Stock** ADAS lane-sensing illustration | Tier 2 → ADAS | **Replace** with your own sensor/RViz view if you have one; else drop |
| `p32.png` | 1123×554 | Sim frame: yellow car with deployed black front airbag hitting brick wall | Tier 2 → ADAS | Keep |
| `p41.png` | 224×222 | CV bounding box "fire 0.62" on stovetop flame | Tier 2 → Fire robot | Keep (small; fine as thumbnail) |
| `p42.png` | 553×274 | Occupancy-grid / SLAM map with robot pose axes | Tier 2 → Fire robot | Keep `[VERIFY it belongs to this project]` |

### Present but unused on the old site

| File | Size | What it shows | Verdict |
|---|---|---|---|
| `p22.png` | 880×356 | Real camera: shape classification (slt/rec/rng/sqr/cir/hex, 95–99%) + centroid detection on black blocks | **Use.** Real-hardware CV result; strongest pick-and-place image. Put on Pick & Place card. |
| `p22.gif` | 600×410, 294 frames, 2.9 MB | Gazebo: UR-style 6-DOF arm, red block, approach motion | Optional; convert to video if used |
| `p21.png` | 482×439 | Franka-style arm in RViz with green target box | Optional secondary for Pick & Place / kinematics |
| `ann.jpg` | 647×381 | Stock neural-network graphic | Drop |
| `banner.jpg` | 2160×472 | Template gradient banner | Drop |
| `avatar.jpg` | 279×279 | Template gradient placeholder | Drop |
| `pic01.jpg` `pic02.jpg` `pic03.jpg` | 688×397 | Template gradient placeholders | Drop |

---

## B. Candidate images pulled from Open Droids repos → `content/assets-candidates/`

All from public Apache-2.0 / MIT repos you contribute to. Confirm with the
company before using product renders on a personal site.

| File | Size | What it shows | Suggested use |
|---|---|---|---|
| `r2d3_dual_lift_robot.jpg` | 1280×1280 | Product render of R2D3: dual 7-DOF arms, lift column, RealSense on head, purple accent base | **Hero image / Tier 1 card.** The purple already matches the planned #B026FF theme. |
| `r2d3_camera_demo.png` | 1405×877 | Real screen capture: `dual_rm_driver`/`dual_rm_control` build finishing, RealSense D435 launch, live color + depth frames | Tier 1 → R2D3 ROS 2 Stack card ("real stack, real camera") |
| `r2d3_success.png` | 464×506 | `colcon build` summary: 12 packages incl. 65b/75b MoveIt configs, realsense, dual_rm_driver | Small proof thumbnail or terminal-style loading animation source |
| `open_droids_logo.jpg` | 1600×1600 | Open Droids logo | Experience entry logo (small) |

**Still needed from you (highest value first):**
1. Photo or short video of the real R2D3 moving under your stack (lab, demo, CES, hackathon).
2. Photo of you with the robot (replaces the stock hand image entirely).
3. Screen recording of Gazebo Harmonic sim with MoveIt 2 planning both arms.
4. Any clip of the X-VLA or π0 policy executing on hardware.
5. Latte-art hackathon photo (ask the team; they credited you publicly).
6. Company logos you have rights to use: Accenture, Bosch Rexroth, HAL, CWRU, RNSIT.

---

## C. Links

### Your profiles
| Label | URL | Notes |
|---|---|---|
| LinkedIn | https://www.linkedin.com/in/sampreethradhakrishna/ | Old site had this behind a broken `#` prefix with label "Instagram" |
| GitHub (current, Open Droids work) | https://github.com/SampreethRadhaKrishna | Primary GitHub link for the site |
| GitHub (older, CWRU projects) | https://github.com/Sampreeth98 | Link from Tier 2 section only |
| Email | rk.sampreeth@gmail.com | `[VERIFY public]` |
| Resume PDF | `[FILL]` | |

### Tier 1 — Open Droids work
| Label | URL |
|---|---|
| R2D3 ROS 2 stack (you: top contributor) | https://github.com/Open-Droids-robot/R2D3_ros2 |
| Dual-arm QP-IK controller (you: creator) | https://github.com/Open-Droids-robot/od-arm-controllers |
| X-VLA tuned for R2D3 | https://github.com/Open-Droids-robot/X-VLA |
| Your `tuned for r2d3` commit | https://github.com/Open-Droids-robot/X-VLA/commit/6d17980 |
| Open Droids GitHub org (profile README by you) | https://github.com/Open-Droids-robot |
| R1D1 URDF repo | https://github.com/Open-Droids-robot/r1d1 |
| R2D3 simulation quickstart | https://github.com/Open-Droids-robot/R2D3_ros2/blob/main/simulation_quickstart.md |
| Woosh base ROS interface notes (by you) | https://github.com/Open-Droids-robot/R2D3_ros2/blob/main/woosh_robot_ros_interface_dev_notes.md |
| X-VLA paper (ICLR 2026) | `[FILL: arXiv link — "Soft-Prompted Transformer as Scalable Cross-Embodiment Vision-Language-Action Model"]` |
| Latte-art π0 team repo / post | `[FILL: ask team for link]` |

### Tier 2 — Graduate work
| Label | URL |
|---|---|
| ROS2-Projects (ArmCam, Pick & Place, ADAS, Fire robot) | https://github.com/Sampreeth98/ROS2-Projects |
| Cats vs Dogs vs Other (transfer learning) | https://github.com/Sampreeth98/Cats-vs-Dogs-vs-Other |
| Big Data / PySpark water-point project | https://github.com/Sampreeth98/Big_Data_Project |
| Image processing (MNIST) | https://github.com/Sampreeth98/Image-Processing-Projects |
| ML projects (fraud) | https://github.com/Sampreeth98/Machine-Learning-Projects |
| Neural nets (churn) | https://github.com/Sampreeth98/Neural-Networks-Projects |

### Company & press (for the "In the wild" strip)
| Label | URL |
|---|---|
| Open Droids | https://www.opendroids.com/ |
| Open Droids team page (lists you) | https://www.opendroids.com/team |
| R2D3 product page | https://www.opendroids.com/ (product section) |
| The Robot Report, 27 Dec 2024 | https://www.therobotreport.com/open-droids-develops-both-single-dual-arm-mobile-manipulators/ |
| Yahoo Tech / TechCrunch, CES Unveiled 2025 | https://tech.yahoo.com/general/articles/ces-unveiled-2025-opendroids-r2d3-042543404.html |
| TechCrunch on X | https://x.com/TechCrunch/status/1876761274979070059 |
| ITU AI for Good Global Summit 2025 | https://aiforgood.itu.int/speaker/r2d3/ |
| Physical AI Hack 2026 (Founders Inc, SF) | https://luma.com/8ca2z1rr |
| Open Droids YouTube | https://www.youtube.com/@opendroids |
| CES 2025 walkthrough video | https://www.youtube.com/watch?v=Zld8HilE8RI |

### Education
| Label | URL |
|---|---|
| Case Western Reserve University | https://case.edu/ |
| RNS Institute of Technology | https://www.rnsit.ac.in/ |

---

## D. Fixes carried over from the old HTML
- All `images\...` backslash paths → forward slashes.
- Remove `#` prefix from LinkedIn and GitHub hrefs; fix "Instagram" label.
- Footer "© Untitled" → your name and year.
