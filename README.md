# EngineeringPortfolio
A website that serves as an engineering portfolio

I want to create a UI friendly website that allows me to share my engineering projects in a manner that is understandable and impactful. 



See the following links for ideas:
https://jamesbryant.engineer/
https://www.davisryan.tech/
https://www.ramitkrishnan.com/
https://jhsieh.dev/

I want to take the qualities from this websites that make them interactive and impactful and create my own. 

A good engineering portfolio website does two things well:

Shows what you have built (proof of your skills).
Tells the story behind your work (how you think as an engineer).

Homepage

Your homepage should immediately answer three questions:

Who are you?
What do you build?
Why should someone keep reading?

For example:

Hi, I'm Aikam Singh, a Computer Engineering student at the University of Michigan. I design embedded systems, PCBs, and software for real-world engineering projects, with a focus on automotive electronics and low-level systems.

Include:

Professional photo (optional but recommended)
One-sentence introduction
Links to GitHub and LinkedIn
Resume download
Contact button

Featured Projects:
I have a couple engineering projects to include: 
- Steering wheel for Umich solar car team
- Spotify dashboard project (WIP)

Instead of listing projects, create detailed case studies.

Each project should include:

Problem

What problem were you solving?

Requirements

What constraints existed?

For example:

Weight limits
Power budget
Cost
Competition rules
Environmental conditions
Manufacturing limitations

Design Process

Show sketches, diagrams, CAD, and revisions.

Include:

Block diagrams
State machines
PCB screenshots
KiCad layouts
Schematics
3D models
Flowcharts

Employers love seeing iterations.

Technical Details

Talk about your decisions.

For example:

I chose an ESP32 over an STM32 because Wi-Fi support simplified telemetry integration while still providing enough GPIO for the TFT displays.

Or

Switched from OLED to a character display after comparing current consumption during continuous operation.

These decisions demonstrate engineering judgment.

This is what separates engineering from hobby projects.

Challenges

Don't hide mistakes.

Explain:

What went wrong
Why
How you fixed it

Example:

SPI bus contention caused display flickering. After investigating timing issues, I implemented separate chip-select handling and reduced the SPI clock during initialization.

Results

Use numbers.

Instead of

It worked well.

Write

Reduced idle current by 35%, decreased PCB size by 20%, and achieved a stable 30 FPS display update.

Metrics matter.

On the steering wheel for the solar car team page, I want to have photos with text, for now, just keep the text to be placeholder text. I will write in my process later.

Resume

Include a downloadable PDF.

A great project page often includes:

Hero image
Project overview
Specifications
Timeline
Design requirements
Architecture diagram
Schematics
PCB renders
CAD
Firmware overview
Photos of prototypes
Testing
Results
Lessons learned

Also create an HTML version so recruiters don't have to download it.

this website will eventually be hosted through netlify on the aikamsingh.com domain name