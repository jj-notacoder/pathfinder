export const DR_SABATINI = {
  id: "vp_dr_sabatini",
  initials: "RS",
  name: "Dr. Roberto Sabatini",
  role: "Aerospace Engineer",
  yearsExp: 22,
  field: "Aerospace",
  fieldSlug: "aerospace",
  // Crucial requirement: Must also match Engineering filter.
  // Wait, my vault filter logic dynamically filters by `prof.field`. 
  // If the user requires him to appear in BOTH Engineering and Aerospace,
  // I need to modify `getField` logic on the vault page or just make his field "Aerospace & Engineering"?
  // Re-reading user requirement: "This card must appear as the first card in the Engineering filter results and the first card in the Aerospace filter results"
  // Let me add an array for `fields` on his profile just in case, but standard is `field: "Aerospace"`.
  // Actually, I can update the Vault page filter to check `if prof.field === filter || prof.secondaryField === filter`.
  secondaryField: "Engineering",
  questionAsked: "What does it actually feel like to design systems that leave the atmosphere?",
  voiceScript: "Arriving at the telemetry desk at 4:30 AM long before the sun is up, staring down a wall of monitors blinking with real-time pressure data. When you tell people you design systems that go to space, they picture you floating in zero gravity or pushing a giant red launch button. But the visceral reality of this job is an absolutely crushing weight of paranoia. You are sending incredibly fragile human machinery into a complete vacuum that is actively trying to destroy it via extreme radiation, microscopic debris, and thermal shock. My first three hours are spent reviewing cryogenic fuel loading sequence logs. If a single sensor malfunctions and reports ambient temperature inside the fuel line when it should be reading negative two hundred degrees, the automated abort system kicks in and we scrub a fifty-million-dollar launch. The pressure is astronomical. By 10 AM, I am in a brutal systems alignment meeting. The payload team wants to add three kilograms of mass to a satellite bracket. I have to spend the next hour mathematically proving to them that those three kilograms will completely destabilize the orbital insertion trajectory causing the second stage booster to run out of fuel seven seconds early. Everything in aerospace is a zero-sum game of physics. You fight furiously over grams of weight and millimeters of tolerance. In the afternoon, the real work happens inside the simulation sandboxes. We deliberately try to break our own designs. I write code that simulates a micrometeoroid impact on a critical heat shield just to see if the structure survives the atmospheric reentry interface. The failure rate in simulations is terrifying. You leave the control center at 7 PM, totally exhausted from the sheer volume of high-stakes math. You go home, look up at the night sky, and you realize something you personally touched, something you stressed over for six years, is currently orbiting the planet at seventeen thousand miles an hour in total silence. That sudden realization makes every single agonizing compromise entirely worth it.",
  estimatedDuration: Math.round(1840 / 13.5)
};

export const DR_AMELIA = {
  id: "vp_dr_amelia",
  initials: "AJ",
  name: "Dr. Amelia Johansson",
  role: "Spacecraft Systems Engineer",
  yearsExp: 11,
  field: "Aerospace",
  fieldSlug: "aerospace",
  questionAsked: "What does it feel like the moment a spacecraft you designed successfully enters orbit?",
  voiceScript: "You wake up at 5:00 AM, grabbing whatever stale coffee is left in the pot because today is a telemetry verification day and every minute counts. By 6:00 AM, I am sitting in the primary operations center, staring at a massive wall of cascading diagnostic numbers representing a multi-million dollar piece of hardware that is currently rotating on an integration stand in a clean room two miles away. The morning is entirely consumed by systems checks. We meticulously verify that the onboard power distribution panels aren't throwing ghost errors. It is incredibly tedious work. You are essentially proofreading a thousand pages of binary logic, searching for a single flipped bit that could eventually leave the craft dead in the vacuum of space. By noon, we move into simulation reviews. This is where the anxiety kicks in. We run complex orbital mechanics models to see if the attitude control thrusters will fire at the exact millisecond needed to correct for unexpected solar radiation pressure. And then, without fail, an anomaly hits in the afternoon. Today, a thermal sensor on the main bus suddenly spiked to eighty degrees Celsius during a vacuum chamber test. The entire room goes dead silent. You have exactly two hours to diagnose whether the sensor itself is faulty, or if the intricate cooling loops we spent three years designing are catastrophically failing under pressure. It's a brutal, high-stakes puzzle where being wrong costs years of work. You finally trace it back to a loose microscopic pin in the sensor harness. The relief washes over you, but the adrenaline leaves you completely drained. You leave the facility at 8 PM, totally exhausted, looking up at the sky. And when launch day finally comes, and you hear the call that orbital insertion was perfect... there is quite literally nothing else like it on Earth. If you don't love solving puzzles where the penalty for losing a piece is catastrophic failure, this industry will eat you alive.",
  estimatedDuration: Math.round(1805 / 13.5)
};

export const MARCUS_WEBB = {
  id: "vp_marcus",
  initials: "MW",
  name: "Marcus Webb",
  role: "Propulsion Engineer",
  yearsExp: 7,
  field: "Aerospace",
  fieldSlug: "aerospace",
  questionAsked: "What actually goes through your mind when you are testing an engine that could fail catastrophically?",
  voiceScript: "Strapping on the hardhat and walking into the hazard zone at 6:30 AM, the smell of liquid oxygen and RP-1 propellant hits you immediately. We don't start with inspirational speeches; we start with a brutally blunt morning safety briefing. We outline every single way the engine on the test stand could violently tear itself apart today. The physical reality of the test environment is overwhelming. You are dealing with volatile chemicals that want to burn, contained inside high-pressure vessels that are actively trying to explode. When it's time for the hot fire test, we fall back to a reinforced bunker completely encased in concrete walls two feet thick. The psychological weight in that room is immense. You stare at the pressure gauges, your finger hovering near the manual abort toggle, knowing that seven years of design by three hundred engineers comes down to the next fifteen seconds. The countdown hits zero. The engine roars. The entire concrete bunker physically shakes, vibrating deep in your chest cavity, and for a few seconds, you are witnessing controlled chaos turning into sheer thrust. But this afternoon, something didn't go as expected. Five seconds into the burn, a transient pressure spike hit the turbopump. The automated redline system kicked in and slammed the valves shut, aborting the test. A sudden, terrifying silence follows. For the next five hours, you are tearing through high-speed camera footage and telemetry data, desperate to figure out if it was a minor sensor glitch or a fundamental flaw in your turbine blade design. You finally head to your car at night smelling like burnt metal, mentally exhausted. If you want a comfortable nine-to-five where you never have to worry about accidentally blowing up your own hardware, do yourself a favor and stay far away from propulsion.",
  estimatedDuration: Math.round(1705 / 13.5)
};
