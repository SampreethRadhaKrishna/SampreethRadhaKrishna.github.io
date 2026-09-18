# The Journey — master narrative (Draft 8)

This replaces the resume structure of `04-content-v3-draft.md` as the spine of
the site. The v3 file stays as the fact base: every project, repo, date and
image referenced below is detailed there and in `05-assets-and-links.md`.

Mission line, in your words: *"I am here to revolutionize robotics, and I
won't stop till we have completely autonomous robots."*

`[FILL]` = fact only you have. `[VERIFY]` = I inferred it, confirm.

---

## 0. How the page reads

Open Droids first, because that is the good stuff and nobody should scroll
nine chapters to reach it. Then the journey, oldest first, each chapter a
step where a human was removed from the loop. The page ends at "now", where
the story turns from building robots to building the company that builds
them.

**Structure**
1. **Hero**: name, role, "Working toward fully autonomous robots.", one fact line.
2. **Open Droids, first**: the latest and biggest chapter, directly under the hero.
3. **How I got here**: the thread paragraph, then chapters 1–9 oldest first, ending with a one-line bridge back to Open Droids.
4. **Now**: the founder turn, one sentence, then the mission line.
5. **What I believe**: four short convictions.
6. **Contact**.

**Voice rules**
- First person, past tense for chapters, present tense for Now.
- Every chapter names one concrete thing you built or did. No chapter is
  only feelings.
- Claims about the future are stated as intent, not prophecy. "I won't
  stop until" is fine. "I will change the world" is not.
- Never inflate a stage. The sixth-grade robot was a sixth-grade robot.
  Its job in the story is to show the thread started early, not to impress.
- Cut every adjective that a skeptical robotics engineer would roll their
  eyes at.

---

## 1. Hero

Keep it plain. The chapters carry the story; the hero just states who you
are and what you're working toward.

**Name:** Sampreeth Radha Krishna
**Role:** Robotics Software Engineer

**One line (locked):** Working towards fully autonomous robots.

**Second line, factual:**
> San Francisco. Previously Open Droids, Case Western, Accenture.

**Nothing else.** No age, no year count, no countdown readout. If the design
wants a mono status block, limit it to two verifiable lines:
```
San Francisco · building something new
ROS 2 · C++ · Python · MoveIt 2 · Jetson
```

---

## 2. The latest chapter, first

Sits directly under the hero so the strongest material is one scroll away.

### Latest · Nov 2024 – Sep 2026 · Open Droids: robots for good, robots that stay yours
> In November 2024 I joined Open Droids in San Francisco. For the next two years I owned the software across the whole fleet: Droid 1, R1D1, R1D2, R1D3 and R2D3, the dual-arm platform we unveiled at CES 2025 and again at CES 2026.
>
> The company had a founding idea, and I signed on to make it real. Two words: good, and open. Good meant robots that take the work nobody wants, so people can do the work that matters. Open meant something more specific than a license. A robot that lives in your home or your hospital runs on code you can read, and nobody on the other side of the world can reach in, switch it off, put it under curfew, or make it do something worse. If you can't see what your robot runs, it isn't your robot. Every decision on the software side had to hold that line.
>
> We started at home. R2D3 folding laundry, loading a dishwasher, clearing a table: the chores that eat an evening. Two arms, a mobile base, and a camera that finds the sock before the hand goes for it. The videos are on the Open Droids site.
>
> Then healthcare. Picture a nurse's night shift: the restocking, the fetching, the rounds that are nothing but carrying. We built a robot that works as a semi-nurse, an interactive assistant that takes the unwanted chores, including the ones at three in the morning, so the people on the floor can spend their time on patients. That work is under NDA, so there are no pictures here.
>
> Then industry, where the same platform became different robots: industrial cleaning, bin picking on a line, agricultural work in the field. One software foundation, different hands, different job.
>
> And hotels, where a robot can run a facility end to end: check a guest in, deliver towels or a late dinner to a room, restock, patrol the corridors, and dock itself to charge.
>
> Under all of it sat the work I owned. One software stack every robot in the family could run, so a fix landed everywhere at once. A simulator, so the team could build without waiting on hardware. Two-arm control safe enough to hand to a learned policy. And modern vision-language models running on the robot's own computer, not in a cloud someone else controls. That last one is the open promise again, in engineering form.
>
> It also meant handing R2D3 to a hackathon team on a Friday and watching them teach it latte art by Sunday, then releasing the data, the model and the code.

**Carried forward:** Robots that do good, that stay yours, and that run learned policies on their own compute with no one steering. The closest I'd been to the thing I've wanted since sixth grade.
**Details drawer:** Nov 2024 – Sep 2026, San Francisco. Title: `[FILL: pending your LinkedIn update]`. · Home: laundry, dishwashing, tidying. Videos on opendroids.com. · Healthcare: semi-nurse / interactive nurse assistant for unwanted chores, overnight included. NDA: no images. · Industry: industrial cleaning, bin picking, agricultural robots. · Hotels: whole-facility operation: guest check-in, deliveries (food, towels, items). · Vision: robots for good; robots kept open so no one anywhere can remotely control, curfew, or misuse them. The company's founding vision, and what you worked toward. · One software foundation for the whole robot family. · A full simulation of the dual-arm robot, so anyone can develop without a $60k machine on their desk. · Two-arm control that a learned policy can drive safely: it refuses commands that would hit a joint limit or an unreachable pose. · A vision-language-action model running on the robot's own computer, not in the cloud. · Hackathon teams turning R2D3 into a latte-art robot in a weekend, with data, model and code released openly.

---

## 3. How I got here: the thread (intro, ~70 words)

> Every robot I've built removed one more human from the loop. A fire robot
> that found the heat and put it out on its own. A car that steered around
> what it saw. An arm that keeps a fast-moving target in frame without being
> told where to look.
> A family of robots that run learned policies on their own compute. The
> direction has never changed. Only the scale has.

---

### Chapters (nine, oldest first; the journey ends where the page began)

### Chapter 1 · ~2010 · The first robot
> In sixth grade I built a line-following robot. It worked, and it worked well, which surprised everyone including me. A couple of sensors, a few lines of logic, and a machine that turned left or right because of what it saw on the floor. That was the first time I understood that a robot could make a decision from an observation, and that the decision was something I could write.

**Carried forward:** Logic, algorithms, and the idea that a machine can decide from what it observes.

---


### Chapter 2 · 2016–2018 · Autonomous, or nothing
> In the early years of my mechanical engineering degree I built two robots that didn't need a driver. The first was a fire-fighting robot: temperature sensors to detect a heat source, a drive system to navigate to it, and a pump to spray water on it. Detect, move, act, with no one in the loop.
>
> The second was a collision-avoidance robot: a car that watched its surroundings with ultrasonic sensors and a camera, steered and braked around obstacles on its own, and carried an external airbag as a last line of defense for the crashes it couldn't avoid. Different problems, same shape. The machine sees something, decides, and moves.

**Carried forward:** Perception plus a decision plus an actuator is a robot. Everything since has been that loop, bigger.
**Details drawer:** Fire-fighting robot: temperature sensing, navigation to the heat source, water spray. Arduino. · Collision-avoidance robot: ultrasonic + camera obstacle detection, autonomous avoidance, external airbag for unavoidable impacts. No absorption figures on the site. · Both later rebuilt in ROS 2 at Case Western `[VERIFY: that is what the 2023–24 GitHub code is]`.

---


### Chapter 3 · 2017 · Hindustan Aeronautics Limited (intern)
> My first time inside a real engineering organization was at Hindustan Aeronautics Limited, India's aircraft manufacturer, as an intern working across the Tejas and Rafale programs from design through the manufacturing line, and on Airbus aircraft doors. Robots had been a passion. This was production: thousands of parts, every one traceable, every process signed off, at a scale where "it works on my bench" means nothing. I learned the difference between building something once and building it so it can be built again, a thousand times, identically.

**Carried forward:** The gap between passion and production. Process, traceability, and respect for scale.
**Details drawer:** Tejas and Rafale aircraft, design to manufacturing line. · Airbus aircraft doors.

---


### Chapter 4 · 2017–2019 · Hackathons
> Through college I entered most of the hackathons I could reach around Bangalore. Thirty-six to forty-eight hours, an immense amount of coffee, builds that were rough and demos that mostly worked. What I learned is how much a small team can ship in two days when nobody is waiting for permission, and that I liked being the person who makes the demo work at 3 a.m.

**Carried forward:** Speed, and comfort with unfinished things in front of an audience.

---


### Chapter 5 · 2018–2019 · The solar car
> In my third year I joined Team Dritan Racers: thirty students building an electric solar vehicle from scratch for the ISIE Electric Solar Vehicle Championship 2019. I was on the design and autonomy team, where we built the sensor data processing pipelines that assisted the driver. Chassis, composite body, solar array, drivetrain, electrics: nothing off the shelf. Everything was drawn, fabricated and tested by students on a deadline and a budget that left no room for a second attempt. The championship ends in an endurance race, so the car didn't just have to pass inspection. It had to keep running.
>
> It was the first thing I built that was big enough to hurt someone, on a team big enough that nobody could hold the whole car in their head.

**Carried forward:** Systems thinking across mechanical, electrical and software, and what it takes to move thirty people toward one car.
**Details drawer:** Team Dritan Racers, car A-52, ISIE ESVC 2019 (video posted by ISIE India, Mar 2019). · Your correction: 30-person team, you were on the design and autonomy team. LinkedIn currently says "designed and led"; worth aligning when you update it. · Lightweight composite body; high-efficiency solar panel system; design, fabrication, testing and competition prep on a tight deadline and budget.

---


### Chapter 6 · Summer 2019 · Bosch Rexroth: the machines that never sleep
> At Bosch Rexroth I spent a summer with the actuators robots are built
> from: robotic arms, industrial pneumatics and hydraulics, and the PLCs
> that run them. Industrial automation is autonomy's older sibling:
> reliable, repetitive, and completely blind. The cells I programmed would
> run for years without a mistake, and never once perceive anything. I
> wanted the reliability without the blindness.

**Carried forward:** respect for actuators and control loops that have to run for years. And the gap between "automated" and "autonomous" as the thing I'd spend my career on.
**Details drawer:** PLC programming, electro-hydraulic and electro-pneumatic systems, sensor and camera commissioning, testing and maintenance. Jun–Aug 2019, Bengaluru.
**Image:** Bosch Rexroth logo

---

### Chapter 7 · 2020–2023 · Accenture: two hundred robots at once
> I graduated into 2020 and spent almost three years at Accenture as a software engineer on a warehouse robotics client. Picture two hundred robots on one floor, each with a different job and a different application behind it, all streaming sensor data. My work was keeping that fleet healthy: processing the sensor data at scale, running the cloud infrastructure on AWS that stored it and managed the instances the systems ran on, maintaining the processing algorithms, catching the robots that drifted, and improving the system so they drifted less.
>
> Robotics from the operations side. The unit isn't one robot, it's a fleet, and the enemy isn't a bug, it's downtime.

**Carried forward:** Fleet thinking. Infrastructure, monitoring, and code that other people depend on.
**Details drawer:** Software Engineer, Bengaluru, Aug 2020 – May 2023 (2 yrs 10 mos). · Warehouse robotics client, ~200 robots with different tasks and applications. Sensor data processing at scale; infrastructure and algorithm maintenance; reliability and improvement work. C++/Python on Linux, AWS, SQL, batch, middleware. · Client is under NDA and stays unnamed. The old site labelled this "Robotic Process Automation", which undersold it; that label is gone.

---


### Chapter 8 · 2023–2024 · Case Western: the intelligence layer
> I went to Case Western Reserve for a master's in mechanical engineering focused on AI/ML and robotics, and worked between two labs. Roger Quinn's Biorobotics Lab, where the current work is soft robotic graspers: polymer grippers that pick up things a parallel-jaw gripper never could. And Kathryn Daltorio's Crab Lab, which builds crab-inspired legged robots that walk and swim underwater to find and recover things no diver should have to. Mechanical had given me the body. Accenture had given me the fleet. This was the brain and, it turned out, the hands and the legs.

**Carried forward:** The full stack, finally. Hardware, software, learning, and a wider idea of what a robot can be.
**Details drawer:** M.S. Mechanical Engineering, specialization in AI/ML &amp; Robotics, Cleveland OH, Jan 2023 – May 2024. · Roger Quinn: Arthur P. Armington Professor of Engineering, Distinguished University Professor; has directed the CWRU Biorobotics Laboratory since 1990; recent focus is soft robotic graspers. · Kathryn Daltorio: Associate Professor, Mechanical and Aerospace Engineering; runs the Crab Lab; crab-inspired legged robots including a waterproof 18-DOF robot for locating and recovering underwater unexploded ordnance, Navy-funded.

---


### Chapter 9 · 2024 · The arm that follows what it sees
> The project that pulled it together: a 5-DOF arm with a depth camera on its wrist, built to follow fast-moving objects. YOLO finds the target in every frame, but detection is the easy half. The hard half is motion: a neural network trained to turn a high-frequency stream of target positions into a smooth, clean trajectory instead of a jittery chase, with reinforcement learning to improve it over time. Simulated in Isaac Sim and Gazebo, run on a Raspberry Pi.
>
> Nothing like the fire robot. That one found a heat source that stayed put. This one had to keep a fast-moving target in frame at high frequency: built with Formula 1 in mind, and with an eye on the harder version of the problem, tracking and intercepting drones.

**Carried forward:** Closed-loop perception-to-motion at high frequency as the unit of work.
**Details drawer:** 5-DOF arm, wrist-mounted depth camera, YOLO detection, learned trajectory generation (motion planning and trajectory optimization at high input rate), RL for improvement. ROS 2, C++/Python. Isaac Sim and Gazebo. Raspberry Pi. · Log screenshot shows the loop in one frame: detection → center error → joint states to move. · No speed-improvement claims on the site. `[VERIFY: did it run on the physical arm as well as in sim?]` · Companion project: voice-controlled pick &amp; place (Alexa → ROS 2 → OpenCV → IK/FK → grasp).

---



## 4. Now — the founder turn

> I've spent sixteen years closing the loop between what a robot sees and
> what it does. At Open Droids I got to close it on robots people actually
> buy. Now I'm building a new way to understand manipulation for robotics.
> That's all I'll say about it for now.
>
> I'm here to make robots fully autonomous. I'm not stopping before that.

**Design note:** this section is the only place the mission line appears
in full. It should be the last thing the reader sees before Contact. If the
company can't be named yet, the section still works with "building the
next thing" and a way to reach you.

---

## 5. What I believe (four convictions, one line each)

Write these as engineering positions, not slogans. Candidates, in your
voice; keep the ones that are actually yours:

- **Automated is not autonomous.** A PLC cell runs for ten years and never sees anything. The interesting problems start when the robot has to perceive.
- **The loop is the product.** Perception, decision, actuation. Every impressive robot is that loop running fast and reliably; every disappointing one is that loop broken somewhere.
- **Robots should ship open.** Open hardware and open stacks attract the people who make them better. `[VERIFY: this is Open Droids' stance; keep only if it's genuinely yours]`
- **Demos are easy. Tuesday is hard.** The difference between a video and a product is whether it still works when the founder isn't in the room.

---

## 6. Contact

> Building toward autonomous robots, or funding people who are? Let's talk.

Email (rk.sampreeth@gmail.com, public) · LinkedIn · GitHub

---

## 7. Reconciliations (resolved 2026-09-05)

| # | Item | Resolution |
|---|---|---|
| 1 | Fire robot and collision car | Built during your bachelor's (2016–18). Written as first-year builds, later rebuilt in ROS 2 at CWRU `[VERIFY the rebuild framing]`. |
| 2 | Pneumatics / hydraulics / robotic arms | Bosch Rexroth, Jun–Aug 2019. HAL is aeronautic systems only. |
| 3 | HAL | One stint, before hackathons and the solar car. Role, division and dates still `[FILL]`. |
| 4 | Hackathons | Kept generic by your request. No names, no placements. |
| 5 | Solar car | From LinkedIn: designed and led an electric solar vehicle for the ISIE Electric Solar Vehicle Championship 2018–19; composite body, high-efficiency solar system; delivered on deadline and budget. Result and autonomy work still `[FILL]`. |
| 6 | Founding | Nothing public. Section 4 is a placeholder. |
| 7 | "Since 6th grade" | Year and first robot `[FILL]`. |

## 8. Remaining items (round 6)
All questions answered. Assets still to come from you: real solar car photo; photo or clip of you with the robots. Title at Open Droids pending your LinkedIn update.
