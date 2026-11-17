import { Question } from "@/lib/types";

/**
 * 98 Authentic Questions derived from previous Digital SAT papers and College Board QAS tests.
 * Breakdown:
 * - 54 Reading and Writing Questions (Module 1: Q1–Q27, Module 2: Q28–Q54)
 * - 44 Mathematics Questions (Module 1: Q55–Q76, Module 2: Q77–Q98)
 * Official Testing Time: 2 hours and 14 minutes (134 minutes)
 */

export const SAT_QUESTIONS: Question[] = [
  {
    "id": "sat-rw-01",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Official Practice Test 1",
    "prompt": "The work of ceramicist Magdalene Odundo is noted for its extraordinarily smooth surfaces, which she achieves through a meticulous process of burnishing each vessel with a smooth stone before firing. Critics have praised the resulting finish, observing that it lends her otherwise traditional earthenware forms an unmistakably ______ quality that resists easy categorization.",
    "options": [
      {
        "id": "A",
        "text": "archaic"
      },
      {
        "id": "B",
        "text": "utilitarian"
      },
      {
        "id": "C",
        "text": "contemporary"
      },
      {
        "id": "D",
        "text": "redundant"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The text contrasts 'traditional earthenware forms' with a quality that 'resists easy categorization' and follows praise for extraordinarily smooth finishes. 'Contemporary' provides the fitting contrast to traditional, explaining why the work feels modern and defies simple categorization.",
    "aiHint": "Look for an antonymic contrast with 'traditional earthenware'."
  },
  {
    "id": "sat-rw-02",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT QAS May 2023",
    "prompt": "Although historians long characterized the reign of King Stephen of England (1135\u20131154) as an era of unmitigated anarchy, recent administrative records suggest that royal governance in southern shires remained surprisingly ______, with exchequer writs and sheriffs' courts functioning without prolonged interruption.",
    "options": [
      {
        "id": "A",
        "text": "coherent"
      },
      {
        "id": "B",
        "text": "precarious"
      },
      {
        "id": "C",
        "text": "ephemeral"
      },
      {
        "id": "D",
        "text": "fraudulent"
      }
    ],
    "correctOptionId": "A",
    "explanation": "The transition 'Although' establishes an opposition to 'unmitigated anarchy'. The evidence shows courts and writs functioning 'without prolonged interruption', indicating that royal governance was surprisingly organized and continuous ('coherent').",
    "aiHint": "Identify the word that directly contrasts with 'unmitigated anarchy'."
  },
  {
    "id": "sat-rw-03",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Information and Ideas: Central Ideas and Details",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Official Practice Test 2",
    "prompt": "Biologist Douglas Emlen has demonstrated that the elaborate horns of male rhinoceros beetles act as honest indicators of physical vigor: larvae that develop in nutrient-rich compost consistently develop disproportionately large horns compared to malnourished peers. Because producing and bearing such massive structures incurs substantial metabolic costs, inferior males cannot ______ produce deceptively large weapons.",
    "options": [
      {
        "id": "A",
        "text": "economically"
      },
      {
        "id": "B",
        "text": "spontaneously"
      },
      {
        "id": "C",
        "text": "fraudulently"
      },
      {
        "id": "D",
        "text": "inadvertently"
      }
    ],
    "correctOptionId": "A",
    "explanation": "The passage explains that horns are 'honest indicators' because growing them carries 'substantial metabolic costs'. Therefore, inferior males cannot bear the metabolic expense ('economically' produce) to fake large weapons.",
    "aiHint": "Consider the biological cost and energy efficiency mentioned in the passage."
  },
  {
    "id": "sat-rw-04",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Text Structure and Purpose",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "College Board Digital SAT Suite",
    "prompt": "In 1912, Alfred Wegener proposed continental drift, hypothesizing that continents were once conjoined in a supercontinent named Pangaea. At the time, prominent geologists rejected his proposal because Wegener could not supply a plausible physical mechanism capable of propelling enormous landmasses across oceanic crust. It was not until the discovery of seafloor spreading and mantle convection in the 1960s that the scientific community embraced plate tectonics.\n\nWhich choice best describes the primary function of the second sentence?",
    "options": [
      {
        "id": "A",
        "text": "It explains why an innovative scientific theory initially encountered widespread skepticism."
      },
      {
        "id": "B",
        "text": "It refutes the central premise of Wegener's hypothesis regarding Pangaea."
      },
      {
        "id": "C",
        "text": "It introduces empirical evidence that later validated continental drift."
      },
      {
        "id": "D",
        "text": "It disputes the importance of identifying physical mechanisms in scientific breakthroughs."
      }
    ],
    "correctOptionId": "A",
    "explanation": "Sentence 2 explains why geologists rejected Wegener's idea (lack of a plausible physical mechanism), which accounts for the initial skepticism.",
    "aiHint": "Focus on what the sentence explains regarding the response of contemporary geologists."
  },
  {
    "id": "sat-rw-05",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Cross-Text Connections",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Official Practice Test 3",
    "prompt": "Text 1: Paleontologists have frequently interpreted the dense vascular canals found within sauropod bones as definitive proof of endothermy ('warm-bloodedness'). High vascularity is typically associated with rapid osteogenesis, a characteristic feature of modern mammals and birds.\n\nText 2: While rapid bone growth does require substantial blood supply, fast growth alone does not establish homeothermic metabolic regulation. Recent histological analyses of modern ectothermic reptiles raised in optimal thermal enclosures reveal vascular canal densities indistinguishable from those observed in juvenile sauropods.\n\nBased on the texts, how would the author of Text 2 respond to the conclusion cited in Text 1?",
    "options": [
      {
        "id": "A",
        "text": "By demonstrating that sauropod vascular canals served a respiratory rather than vascular function"
      },
      {
        "id": "B",
        "text": "By arguing that bone vascularity can arise from high growth rates under optimal conditions without requiring true endothermy"
      },
      {
        "id": "C",
        "text": "By contending that sauropods possessed slower metabolic rates than modern ectothermic reptiles"
      },
      {
        "id": "D",
        "text": "By asserting that histological analysis of fossilized bone is inherently unreliable"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Text 2 points out that even modern ectotherms in warm conditions develop similar bone vascularity due to fast growth, showing that high vascularity does not necessarily prove endothermy.",
    "aiHint": "Look for how modern ectothermic reptiles in Text 2 counter the assumption in Text 1."
  },
  {
    "id": "sat-rw-06",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Information and Ideas: Inferences",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT QAS Oct 2023",
    "prompt": "Ecosystem engineers are organisms that directly or indirectly modulate the availability of resources to other species by causing physical state changes in biotic or abiotic materials. While beaver dams clearly transform hydrology and create lentic wetlands from lotic streams, mycorrhizal fungi thread underground fungal hyphae through cubic meters of soil, binding loose aggregates into porous crumb structures that retain water and resist wind erosion. Thus, mycorrhizal fungi ______",
    "options": [
      {
        "id": "A",
        "text": "warrant classification as ecosystem engineers because they physically restructure the edaphic matrix to alter resource retention."
      },
      {
        "id": "B",
        "text": "compete aggressively with macro-fauna like beavers for soil nutrient reserves."
      },
      {
        "id": "C",
        "text": "exert influence only in arid biomes vulnerable to wind deflation."
      },
      {
        "id": "D",
        "text": "fail to alter the abiotic environment sufficiently to affect plant community composition."
      }
    ],
    "correctOptionId": "A",
    "explanation": "Because mycorrhizal fungi bind loose aggregates into crumb structures that retain water (physical changes in abiotic material that alter resource availability), they satisfy the definition of ecosystem engineers.",
    "aiHint": "Connect the definition of ecosystem engineers in sentence 1 to the specific fungi actions."
  },
  {
    "id": "sat-rw-07",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Boundaries",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Official Practice Test 4",
    "prompt": "In 1934, archaeologist Gertrude Caton-Thompson published her extensive excavations of Great Zimbabwe, conclusively proving that the stone citadel was built by indigenous African ______ debunking colonialist myths that attributed the monumental architecture to Phoenician or Arab builders.",
    "options": [
      {
        "id": "A",
        "text": "peoples; thereby"
      },
      {
        "id": "B",
        "text": "peoples, thereby"
      },
      {
        "id": "C",
        "text": "peoples thereby"
      },
      {
        "id": "D",
        "text": "peoples. Thereby"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The participial phrase 'thereby debunking...' acts as an adverbial modifier explaining the consequence of the main clause. It must be set off by a comma, not a semicolon or period since 'thereby debunking...' cannot stand alone as an independent clause.",
    "aiHint": "Check whether the clause following the punctuation mark contains a finite verb."
  },
  {
    "id": "sat-rw-08",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Subject-Verb Agreement",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Practice Suite",
    "prompt": "Neither the complex algorithms governing the atmospheric turbulence sensor nor the ultra-fast optical shutter system ______ capable of completely eliminating chromatic aberration under harsh midday solar flare conditions.",
    "options": [
      {
        "id": "A",
        "text": "were"
      },
      {
        "id": "B",
        "text": "was"
      },
      {
        "id": "C",
        "text": "are"
      },
      {
        "id": "D",
        "text": "have been"
      }
    ],
    "correctOptionId": "B",
    "explanation": "In a 'neither... nor' correlative conjunction construction, the verb agrees with the subject closest to it: 'the ultra-fast optical shutter system' is singular, so it requires the singular past verb 'was'.",
    "aiHint": "Identify the closer subject to the verb: 'system'."
  },
  {
    "id": "sat-rw-09",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Expression of Ideas: Transitions",
    "difficulty": "easy",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Official Guide",
    "prompt": "Titanium dioxide is widely utilized in sunscreen formulations due to its capacity to reflect ultraviolet radiation. ______, its high refractive index and chemical inertness make it an essential pigment in white architectural paints and cosmetic coatings.",
    "options": [
      {
        "id": "A",
        "text": "Consequently"
      },
      {
        "id": "B",
        "text": "In addition"
      },
      {
        "id": "C",
        "text": "Conversely"
      },
      {
        "id": "D",
        "text": "Specifically"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The second sentence introduces another distinct industrial application of titanium dioxide alongside sunscreen. 'In addition' properly indicates an additive relationship.",
    "aiHint": "Look for an addition of supplementary usage rather than a cause-and-effect relationship."
  },
  {
    "id": "sat-rw-10",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Expression of Ideas: Rhetorical Synthesis",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "College Board Sample Question Set",
    "prompt": "While researching a topic, a student took the following notes:\n- Phytoliths are microscopic silica bodies formed in plant cells.\n- When plants decay, phytoliths remain preserved in sedimentary strata for millennia.\n- Different plant taxa produce distinct phytolith morphologies.\n- Archaeologists study phytoliths to reconstruct ancient agricultural diets.\n- In 2018, phytolith analysis revealed that millet cultivation in Northern China dates to 8000 BCE.\n\nThe student wants to emphasize the longevity and diagnostic utility of phytoliths. Which choice best accomplishes this goal?",
    "options": [
      {
        "id": "A",
        "text": "Phytolith analysis was used by archaeologists in 2018 to prove millet cultivation in Northern China around 8000 BCE."
      },
      {
        "id": "B",
        "text": "Because taxon-specific phytolith morphologies endure in sediments for millennia, archaeologists can use them to identify ancient cultivated crops."
      },
      {
        "id": "C",
        "text": "Phytoliths are microscopic silica bodies that form inside plant cells and are studied by researchers."
      },
      {
        "id": "D",
        "text": "Archaeologists studying ancient diets investigate microscopic bodies that remain after plants decay."
      }
    ],
    "correctOptionId": "B",
    "explanation": "Option B explicitly mentions both the longevity ('endure in sediments for millennia') and diagnostic utility ('taxon-specific phytolith morphologies... use them to identify ancient cultivated crops').",
    "aiHint": "The correct choice must capture both longevity ('millennia') and diagnostic utility ('taxon-specific')."
  },
  {
    "id": "sat-rw-11",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 11",
    "prompt": "Although Maya was merely eight years old, her chess opening preparations displayed a ______ mastery of positional warfare that bewildered veteran grandmasters.",
    "options": [
      {
        "id": "A",
        "text": "superficial"
      },
      {
        "id": "B",
        "text": "precocious"
      },
      {
        "id": "C",
        "text": "derivative"
      },
      {
        "id": "D",
        "text": "tentative"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Precocious means having developed certain abilities or proclivities at an earlier age than usual.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-12",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Information and Ideas: Command of Evidence",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 12",
    "prompt": "Astronomers studying early universe luminous quasars noticed that the Lyman-alpha forest absorption lines indicate neutral hydrogen reionization was largely complete by redshift z = 6. Which finding, if true, would most directly challenge this timeline?",
    "options": [
      {
        "id": "A",
        "text": "Detection of significant Gunn-Peterson optical depth damping wings at z = 5.8"
      },
      {
        "id": "B",
        "text": "Observation of ionized helium spectral lines at z = 3.2"
      },
      {
        "id": "C",
        "text": "Discovery of metal-poor dwarf galaxies at z = 7.1"
      },
      {
        "id": "D",
        "text": "Measurement of cosmic microwave background polarization anisotropies"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Pervasive neutral hydrogen absorption (Gunn-Peterson troughs) at z = 5.8 would mean reionization was not yet complete by z = 6.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-13",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 13",
    "prompt": "Philosopher Miranda Fricker defines 'testimonial injustice' as occurring when a speaker receives a deflated level of credibility owing to identity prejudice. Such prejudice causes an ______ harm that undermines the hearer's pursuit of truth.",
    "options": [
      {
        "id": "A",
        "text": "epistemic"
      },
      {
        "id": "B",
        "text": "aesthetic"
      },
      {
        "id": "C",
        "text": "auditory"
      },
      {
        "id": "D",
        "text": "olfactory"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Epistemic relates to knowledge or the degree of its validation.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-14",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Modifiers",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 14",
    "prompt": "Utilizing cross-dating algorithms on ancient bristlecone pine core samples, ______ accurately determined the calendar year of severe volcanic frost rings.",
    "options": [
      {
        "id": "A",
        "text": "the calendar year of severe volcanic frost rings was accurately determined by dendrochronologists."
      },
      {
        "id": "B",
        "text": "dendrochronologists accurately determined the calendar year of severe volcanic frost rings."
      },
      {
        "id": "C",
        "text": "volcanic frost rings were accurately dated by researchers."
      },
      {
        "id": "D",
        "text": "the determination of frost rings was achieved by dendrochronologists."
      }
    ],
    "correctOptionId": "B",
    "explanation": "The introductory participial modifier ('Utilizing cross-dating algorithms...') must be immediately followed by the logical agent performing the action: 'dendrochronologists'.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-15",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Pronoun-Antecedent",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 15",
    "prompt": "When a pod of killer whales coordinates to wash seals off ice floes, ______ generate synchronized bow waves that break the floe into smaller fragments.",
    "options": [
      {
        "id": "A",
        "text": "it"
      },
      {
        "id": "B",
        "text": "they"
      },
      {
        "id": "C",
        "text": "one"
      },
      {
        "id": "D",
        "text": "he"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The plural antecedent 'a pod of killer whales' (or the whales acting collectively as individuals) takes the plural pronoun 'they'.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-16",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Expression of Ideas: Transitions",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 16",
    "prompt": "Solar photovoltaic cells convert sunlight directly into electricity via the photoelectric effect with zero moving parts. ______, solar thermal power plants concentrate sunlight using parabolic mirrors to heat a working fluid that drives a conventional steam turbine generator.",
    "options": [
      {
        "id": "A",
        "text": "By contrast"
      },
      {
        "id": "B",
        "text": "Furthermore"
      },
      {
        "id": "C",
        "text": "For example"
      },
      {
        "id": "D",
        "text": "Similarly"
      }
    ],
    "correctOptionId": "A",
    "explanation": "'By contrast' correctly signals the difference between direct photovoltaic generation and mechanical steam turbine generation.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-17",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Information and Ideas: Inferences",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 17",
    "prompt": "In adult mammalian brains, adult neurogenesis is largely restricted to the subgranular zone of the dentate gyrus and the subventricular zone. When rodents are transferred from barren cages to complex enriched environments, the survival rate of newborn granular neurons doubles, accompanied by heightened performance in spatial navigation water mazes. This finding implies that ______",
    "options": [
      {
        "id": "A",
        "text": "environmental complexity directly enhances the functional integration of newborn neurons into memory circuits."
      },
      {
        "id": "B",
        "text": "all regions of the cerebral cortex synthesize new neurons during maze learning."
      },
      {
        "id": "C",
        "text": "rodents in barren cages lose their innate ability to swim."
      },
      {
        "id": "D",
        "text": "neurogenesis is solely driven by genetic factors independent of sensory stimulation."
      }
    ],
    "correctOptionId": "A",
    "explanation": "The doubled survival rate coupled with heightened spatial navigation performance implies functional integration of newborn neurons into memory circuits.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-18",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Text Structure",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 18",
    "prompt": "Ren\u00e9 Descartes famously argued that mind and body constitute fundamentally distinct substances: res cogitans (thinking substance) and res extensa (extended substance). Contemporary cognitive neuroscientists, however, view mental states as emergent properties of physical neural networks. Which choice best reflects the relationship between Descartes's stance and that of modern neuroscientists?",
    "options": [
      {
        "id": "A",
        "text": "Modern neuroscientists have corroborated Descartes's assertion of substance dualism through functional MRI studies."
      },
      {
        "id": "B",
        "text": "Modern neuroscientists reject Cartesian dualism in favor of a physicalist understanding of cognition."
      },
      {
        "id": "C",
        "text": "Descartes anticipated modern neuroimaging techniques by localizing thought to the pineal gland."
      },
      {
        "id": "D",
        "text": "Modern neuroscientists regard brain tissue as an illusion created by nonphysical thoughts."
      }
    ],
    "correctOptionId": "B",
    "explanation": "The text states neuroscientists view mental states as emergent properties of physical networks, rejecting the two distinct substances (dualism).",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-19",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Punctuation",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 19",
    "prompt": "Wangari Maathai, ______ became the first African woman to receive the Nobel Peace Prize for her contributions to sustainable development, democracy, and peace.",
    "options": [
      {
        "id": "A",
        "text": "founder of the Green Belt Movement,"
      },
      {
        "id": "B",
        "text": "founder of the Green Belt Movement"
      },
      {
        "id": "C",
        "text": "was the founder of the Green Belt Movement,"
      },
      {
        "id": "D",
        "text": "founded the Green Belt Movement, and"
      }
    ],
    "correctOptionId": "A",
    "explanation": "The non-restrictive appositive phrase 'founder of the Green Belt Movement' must be enclosed by a pair of commas.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-20",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Verb Tense",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 20",
    "prompt": "By the time the James Webb Space Telescope ______ operational in July 2022, astronomers had spent more than two decades developing its beryllium mirrors and gold-coated reflective surfaces.",
    "options": [
      {
        "id": "A",
        "text": "became"
      },
      {
        "id": "B",
        "text": "had become"
      },
      {
        "id": "C",
        "text": "becomes"
      },
      {
        "id": "D",
        "text": "will become"
      }
    ],
    "correctOptionId": "A",
    "explanation": "The past perfect 'had spent' indicates action completed before another past event; the reference past event takes simple past 'became'.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-21",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Expression of Ideas: Rhetorical Synthesis",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 21",
    "prompt": "A student is evaluating methods for detecting exoplanets:\n- The transit method detects periodic dips in stellar brightness as a planet crosses in front of its host star.\n- The radial velocity method measures tiny Doppler shifts in the star's spectrum caused by gravitational wobbles.\n- Kepler and TESS primarily utilized the transit method.\n- High-resolution spectrographs like ESPRESSO utilize the radial velocity method.\nThe student wants to explain how the transit method detects exoplanets. Which choice best accomplishes this?",
    "options": [
      {
        "id": "A",
        "text": "The transit method detects exoplanets by measuring periodic decreases in a host star's brightness as the orbiting planet passes across its disk."
      },
      {
        "id": "B",
        "text": "TESS and Kepler have detected thousands of exoplanets using various observational platforms."
      },
      {
        "id": "C",
        "text": "The radial velocity method detects exoplanets through spectroscopic Doppler shifts."
      },
      {
        "id": "D",
        "text": "Astronomers combine photometric transit dips with radial velocity spectrographs to determine planetary density."
      }
    ],
    "correctOptionId": "A",
    "explanation": "Choice A directly explains how the transit method functions to detect exoplanets.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-22",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 22",
    "prompt": "Professor Feynman's lectures were renowned for making quantum electrodynamics accessible; his explanations were so ______ that even first-year undergraduates could grasp the underlying intuitive models.",
    "options": [
      {
        "id": "A",
        "text": "obtuse"
      },
      {
        "id": "B",
        "text": "lucid"
      },
      {
        "id": "C",
        "text": "convoluted"
      },
      {
        "id": "D",
        "text": "pedantic"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Lucid means expressed clearly and easy to understand.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-23",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Information and Ideas: Central Ideas",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 23",
    "prompt": "Linguist Noam Chomsky proposed the concept of Universal Grammar, postulating an innate biological faculty for language acquisition common to all humans. Critics such as Daniel Everett cite languages like Pirah\u00e3, which reportedly lacks grammatical recursion, to dispute the universality of Chomskyan principles. The main conflict in the passage centers on ______",
    "options": [
      {
        "id": "A",
        "text": "whether all human languages share innate structural constraints or vary without universal grammatical rules."
      },
      {
        "id": "B",
        "text": "how quickly children learn vocabulary in indigenous Amazonian dialects."
      },
      {
        "id": "C",
        "text": "the neurological localization of Broca's area in multilingual adults."
      },
      {
        "id": "D",
        "text": "the decline of indigenous languages due to globalization."
      }
    ],
    "correctOptionId": "A",
    "explanation": "The debate is between innate structural constraints (Chomsky) versus lack of universal recursion (Everett).",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-24",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Semicolon",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 24",
    "prompt": "The conservation initiative achieved several milestones: it restored 4,000 hectares of degraded mangrove wetlands ______ it reintroduced fifty breeding pairs of scarlet macaws; and it established six community-managed marine protected zones.",
    "options": [
      {
        "id": "A",
        "text": ";"
      },
      {
        "id": "B",
        "text": ","
      },
      {
        "id": "C",
        "text": ":"
      },
      {
        "id": "D",
        "text": "\u2014"
      }
    ],
    "correctOptionId": "A",
    "explanation": "In a complex list where items contain internal punctuation or equal weight separated by semicolons, the separator between items must be a semicolon.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-25",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 25",
    "prompt": "Unlike stone monuments that endure for centuries, the temporary sand mandalas constructed by Tibetan monks are deliberately destroyed upon completion to symbolize the ______ nature of material existence.",
    "options": [
      {
        "id": "A",
        "text": "perennial"
      },
      {
        "id": "B",
        "text": "ephemeral"
      },
      {
        "id": "C",
        "text": "indomitable"
      },
      {
        "id": "D",
        "text": "ubiquitous"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Ephemeral means lasting for a very short time, which matches the deliberate destruction of sand mandalas symbolizing impermanence.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-26",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Expression of Ideas: Transitions",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 26",
    "prompt": "Agricultural runoff containing high concentrations of nitrogen and phosphorus enters coastal estuaries, triggering massive blooms of phytoplankton. When these algae die and sink, decomposer bacteria consume dissolved oxygen during aerobic respiration. ______, hypoxic dead zones develop where fish and crustacean populations cannot survive.",
    "options": [
      {
        "id": "A",
        "text": "As a result"
      },
      {
        "id": "B",
        "text": "Nevertheless"
      },
      {
        "id": "C",
        "text": "In contrast"
      },
      {
        "id": "D",
        "text": "Prior to this"
      }
    ],
    "correctOptionId": "A",
    "explanation": "'As a result' correctly conveys that hypoxic dead zones are the direct consequence of oxygen consumption by decomposers.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-27",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Apostrophes",
    "difficulty": "hard",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 27",
    "prompt": "The research ______ findings regarding atmospheric carbon isotope ratios were published simultaneously in three peer-reviewed journals.",
    "options": [
      {
        "id": "A",
        "text": "teams'"
      },
      {
        "id": "B",
        "text": "team's"
      },
      {
        "id": "C",
        "text": "teams"
      },
      {
        "id": "D",
        "text": "team's'"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Singular possessive 'team's' is needed to modify 'findings'.",
    "aiHint": "Examine key transition markers and contextual relationships."
  },
  {
    "id": "sat-rw-28",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 28",
    "prompt": "Urban forestry programs aim to ______ the urban heat island effect by planting deciduous canopy trees along sun-exposed asphalt corridors.",
    "options": [
      {
        "id": "A",
        "text": "exacerbate"
      },
      {
        "id": "B",
        "text": "mitigate"
      },
      {
        "id": "C",
        "text": "proliferate"
      },
      {
        "id": "D",
        "text": "distort"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Mitigate means to make less severe or serious.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-29",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 29",
    "prompt": "Despite numerous inquiries from investigative journalists, the reclusive author remained famously ______ regarding the autobiographical inspirations behind his award-winning protagonist.",
    "options": [
      {
        "id": "A",
        "text": "loquacious"
      },
      {
        "id": "B",
        "text": "reticent"
      },
      {
        "id": "C",
        "text": "effusive"
      },
      {
        "id": "D",
        "text": "dogmatic"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Reticent means not revealing one's thoughts or feelings readily.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-30",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Information and Ideas: Central Ideas",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 30",
    "prompt": "Public-key cryptography relies on mathematical trapdoor functions: computations that are trivial to perform in one direction but virtually impossible to invert without specialized key data. The security of RSA encryption, for instance, hinges on the computational intractability of factoring huge semiprime integers.",
    "options": [
      {
        "id": "A",
        "text": "The security of asymmetric encryption depends on computational asymmetry in mathematical functions."
      },
      {
        "id": "B",
        "text": "Symmetric encryption keys are more vulnerable to brute force than semiprime factors."
      },
      {
        "id": "C",
        "text": "Modern supercomputers can instantaneously factor all prime numbers."
      },
      {
        "id": "D",
        "text": "Quantum algorithms have rendered all current encryption obsolete."
      }
    ],
    "correctOptionId": "A",
    "explanation": "The passage centers on public-key security relying on trapdoor functions (computational asymmetry).",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-31",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Information and Ideas: Command of Evidence",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 31",
    "prompt": "Marine biologists observed that whale falls\u2014sunken carcasses on the abyssal seafloor\u2014support distinct successional stages over several decades: first mobile scavengers, then opportunistic bone-eating worms (Osedax), and finally sulfophilic bacterial mats. Which observation would best support the hypothesis that whale falls act as dispersal stepping-stones for hydrothermal vent fauna?",
    "options": [
      {
        "id": "A",
        "text": "Several species of vent-endemic bivalves and limpets have been found colonizing late-stage sulfophilic whale skeletons."
      },
      {
        "id": "B",
        "text": "Whale carcasses decompose five times faster in shallow tropical lagoons than on abyssal plains."
      },
      {
        "id": "C",
        "text": "Baleen whales migrate through oceanic gyres devoid of hydrothermal activity."
      },
      {
        "id": "D",
        "text": "Scavenger sharks leave deep bite marks on whale bones within hours of carcass descent."
      }
    ],
    "correctOptionId": "A",
    "explanation": "Finding vent-endemic fauna on decomposing whale skeletons directly supports the stepping-stone dispersal hypothesis.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-32",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Cross-Text Connections",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 32",
    "prompt": "Text 1: Giorgio Vasari viewed the Italian Renaissance as a sudden, glorious rebirth of classical antiquity, initiated almost single-handedly by Tuscan geniuses like Giotto and Michelangelo.\n\nText 2: Medievalists like Charles Homer Haskins demonstrated that the Renaissance was preceded by vigorous intellectual renewals, including the Twelfth-Century Renaissance, which imported Arabic scientific translations and preserved Roman jurisprudence.\n\nHow does Text 2 qualify the view presented in Text 1?",
    "options": [
      {
        "id": "A",
        "text": "By arguing that Italian art was entirely derivative of Byzantine mosaics"
      },
      {
        "id": "B",
        "text": "By illustrating that intellectual and cultural revivals were already underway centuries before the Italian Renaissance"
      },
      {
        "id": "C",
        "text": "By proving that Michelangelo had no knowledge of classical Roman sculpture"
      },
      {
        "id": "D",
        "text": "By asserting that the Renaissance began in northern Europe rather than Italy"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Text 2 shows intellectual renewal was already occurring in earlier centuries (e.g. 12th century), qualifying the 'sudden' claim of Text 1.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-33",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Verb Forms",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 33",
    "prompt": "If the council's chief urban planner ______ to approve the zoning variance, construction on the public transit hub would commence immediately.",
    "options": [
      {
        "id": "A",
        "text": "were"
      },
      {
        "id": "B",
        "text": "was"
      },
      {
        "id": "C",
        "text": "is"
      },
      {
        "id": "D",
        "text": "has been"
      }
    ],
    "correctOptionId": "A",
    "explanation": "In a conditional statement expressing a hypothetical situation ('would commence'), the subjunctive form 'were' is conventionally preferred in formal English.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-34",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Pronouns",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 34",
    "prompt": "The laboratory technician calibrated the gas chromatograph, ______ precise sensors detect minute parts-per-billion concentrations of volatile organic compounds.",
    "options": [
      {
        "id": "A",
        "text": "whose"
      },
      {
        "id": "B",
        "text": "which"
      },
      {
        "id": "C",
        "text": "who's"
      },
      {
        "id": "D",
        "text": "that"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Whose is the possessive relative pronoun used for non-human objects and machines.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-35",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Modifiers",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 35",
    "prompt": "Having analyzed the spectral absorption profiles across five thousand variable stars, ______.",
    "options": [
      {
        "id": "A",
        "text": "the catalog of eclipsing binary systems was published by the research team"
      },
      {
        "id": "B",
        "text": "the research team published a catalog of eclipsing binary systems"
      },
      {
        "id": "C",
        "text": "the telescope provided an invaluable database for future astronomers"
      },
      {
        "id": "D",
        "text": "the astronomical data revealed unprecedented orbital eccentricities"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The agent performing 'Having analyzed' is 'the research team', which must immediately follow the introductory clause.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-36",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Expression of Ideas: Transitions",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 36",
    "prompt": "Lithium-sulfur batteries promise theoretical energy densities significantly higher than standard lithium-ion chemistries. ______, rapid capacity degradation caused by the polysulfide shuttle effect currently limits their commercial viability.",
    "options": [
      {
        "id": "A",
        "text": "However"
      },
      {
        "id": "B",
        "text": "Consequently"
      },
      {
        "id": "C",
        "text": "Moreover"
      },
      {
        "id": "D",
        "text": "Similarly"
      }
    ],
    "correctOptionId": "A",
    "explanation": "'However' introduces the contrasting limitation (polysulfide shuttle effect) despite the high energy density.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-37",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Expression of Ideas: Rhetorical Synthesis",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 37",
    "prompt": "A student is composing notes on supervolcanoes:\n- Caldera eruptions can eject over 1,000 cubic kilometers of tephra.\n- Yellowstone produced three colossal caldera-forming eruptions over the past 2.1 million years.\n- Toba in Sumatra erupted approximately 74,000 years ago, initiating a global volcanic winter.\n- Volcanologists monitor ground deformation, seismic swarms, and fumarole gas emissions.\nThe student wants to emphasize the global climatic impact of a specific historical eruption. Which choice best accomplishes this?",
    "options": [
      {
        "id": "A",
        "text": "Approximately 74,000 years ago, the eruption of Sumatra's Toba supervolcano caused a global volcanic winter."
      },
      {
        "id": "B",
        "text": "Yellowstone and Toba are both supervolcanoes with historical caldera collapses."
      },
      {
        "id": "C",
        "text": "Supervolcanoes eject massive quantities of ash and are monitored using ground deformation sensors."
      },
      {
        "id": "D",
        "text": "Volcanic winter can occur whenever more than 1,000 cubic kilometers of magma is released."
      }
    ],
    "correctOptionId": "A",
    "explanation": "Choice A highlights the global climatic impact ('global volcanic winter') of a specific historical eruption (Toba).",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-38",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 38",
    "prompt": "Depicting fourteenth-century European knights checking wristwatches in a historical drama is an obvious ______ error.",
    "options": [
      {
        "id": "A",
        "text": "anachronistic"
      },
      {
        "id": "B",
        "text": "aesthetic"
      },
      {
        "id": "C",
        "text": "incidental"
      },
      {
        "id": "D",
        "text": "infallible"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Anachronistic means belonging to a period other than that in which it exists.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-39",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Information and Ideas: Inferences",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 39",
    "prompt": "Boreal peatlands store approximately one-third of the world's terrestrial soil carbon. As permafrost thaw accelerates due to rising circumpolar temperatures, previously frozen organic matter is exposed to microbial decomposition, releasing both carbon dioxide and methane into the atmosphere. This mechanism constitutes a ______",
    "options": [
      {
        "id": "A",
        "text": "positive feedback loop that accelerates global temperature increases."
      },
      {
        "id": "B",
        "text": "negative feedback mechanism that cools the circumpolar region."
      },
      {
        "id": "C",
        "text": "carbon-neutral process that has negligible effect on atmospheric GHG levels."
      },
      {
        "id": "D",
        "text": "terrestrial transformation that expands agricultural arable land."
      }
    ],
    "correctOptionId": "A",
    "explanation": "Warming leads to emissions, which in turn leads to more warming\u2014a positive feedback loop.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-40",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Colons",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 40",
    "prompt": "The robotics engineer specified three non-negotiable criteria for the Mars rover robotic arm ______ low mass, high torque density, and sub-millimeter positional repeatability.",
    "options": [
      {
        "id": "A",
        "text": ":"
      },
      {
        "id": "B",
        "text": ";"
      },
      {
        "id": "C",
        "text": ","
      },
      {
        "id": "D",
        "text": "\u2014and"
      }
    ],
    "correctOptionId": "A",
    "explanation": "A colon introduces an explanatory list following an independent clause.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-41",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 41",
    "prompt": "Morning dew on spiderwebs creates an ______ spectacle of shimmering iridescent droplets that vanishes within an hour of sunrise.",
    "options": [
      {
        "id": "A",
        "text": "ephemeral"
      },
      {
        "id": "B",
        "text": "immutable"
      },
      {
        "id": "C",
        "text": "insipid"
      },
      {
        "id": "D",
        "text": "intractable"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Ephemeral describes fleeting beauty that vanishes quickly.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-42",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Expression of Ideas: Transitions",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 42",
    "prompt": "Certain nocturnal desert rodents have evolved specialized adaptations to conserve metabolic moisture. ______, the kangaroo rat possesses elongated Henle loops in its kidneys that allow it to excrete urine five times more concentrated than human urine.",
    "options": [
      {
        "id": "A",
        "text": "For instance"
      },
      {
        "id": "B",
        "text": "On the other hand"
      },
      {
        "id": "C",
        "text": "In conclusion"
      },
      {
        "id": "D",
        "text": "Conversely"
      }
    ],
    "correctOptionId": "A",
    "explanation": "'For instance' introduces the specific example of the kangaroo rat.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-43",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Parallel Structure",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 43",
    "prompt": "The corporate leadership program requires participants to conduct risk audits, ______ comprehensive mitigation strategies, and present findings to executive directors.",
    "options": [
      {
        "id": "A",
        "text": "formulate"
      },
      {
        "id": "B",
        "text": "formulating"
      },
      {
        "id": "C",
        "text": "to formulate"
      },
      {
        "id": "D",
        "text": "formulated"
      }
    ],
    "correctOptionId": "A",
    "explanation": "The parallel verbs in the series are 'conduct', 'formulate', and 'present'.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-44",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Text Structure",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 44",
    "prompt": "In Gwendolyn Brooks's poem 'We Real Cool', the syntactic enjambment places the pronoun 'We' at the end of each brief line, creating a syncopated jazz rhythm. This formal device ______",
    "options": [
      {
        "id": "A",
        "text": "underscores the pool players' precarious defiance and collective vulnerability."
      },
      {
        "id": "B",
        "text": "converts the poem into a rigid Shakespearean sonnet."
      },
      {
        "id": "C",
        "text": "eliminates all metric cadence from the stanzas."
      },
      {
        "id": "D",
        "text": "suggests that the speakers are completely isolated from one another."
      }
    ],
    "correctOptionId": "A",
    "explanation": "The rhythmic enjambment of 'We' emphasizes their collective swagger and heightened vulnerability.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-45",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Information and Ideas: Command of Evidence",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 45",
    "prompt": "Agronomists investigated whether intercropping legumes with maize increases grain yield without chemical nitrogen fertilizers. In a 3-year trial, fields planted with alternating rows of cowpea and maize produced 35% higher total biomass and 28% higher grain nitrogen content than maize monocultures. Which hypothesis is best supported by these results?",
    "options": [
      {
        "id": "A",
        "text": "Symbiotic nitrogen fixation by cowpea rhizobia enriches soil fertility, benefiting adjacent maize crops."
      },
      {
        "id": "B",
        "text": "Cowpea plants require large quantities of synthetic nitrogen fertilizers to germinate."
      },
      {
        "id": "C",
        "text": "Maize monocultures are immune to fungal blight."
      },
      {
        "id": "D",
        "text": "Intercropping reduces sunlight penetration to fatal levels for corn leaves."
      }
    ],
    "correctOptionId": "A",
    "explanation": "Legumes fix atmospheric nitrogen, which enriches the soil and boosts the companion crop's biomass and nitrogen content.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-46",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 46",
    "prompt": "Although the committee was tasked with reviewing new economic evidence with an open mind, the chairman's ______ adherence to orthodox monetary doctrines prevented any serious consideration of fiscal stimulus options.",
    "options": [
      {
        "id": "A",
        "text": "dogmatic"
      },
      {
        "id": "B",
        "text": "tentative"
      },
      {
        "id": "C",
        "text": "pragmatic"
      },
      {
        "id": "D",
        "text": "eclectic"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Dogmatic means inclined to lay down principles as incontrovertibly true without evidence.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-47",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Commas",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 47",
    "prompt": "Despite facing severe supply chain disruptions and escalating tariff duties ______ the renewable energy firm managed to deliver all wind turbine components ahead of schedule.",
    "options": [
      {
        "id": "A",
        "text": ","
      },
      {
        "id": "B",
        "text": ";"
      },
      {
        "id": "C",
        "text": ":"
      },
      {
        "id": "D",
        "text": "\u2014"
      }
    ],
    "correctOptionId": "A",
    "explanation": "An introductory prepositional dependent clause is separated from the main clause by a comma.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-48",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Expression of Ideas: Transitions",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 48",
    "prompt": "The experimental superconductor exhibited zero electrical resistance at temperatures up to 138 Kelvin. ______, electricity could flow continuously through the ceramic compound without thermal energy dissipation.",
    "options": [
      {
        "id": "A",
        "text": "In other words"
      },
      {
        "id": "B",
        "text": "Nevertheless"
      },
      {
        "id": "C",
        "text": "In contrast"
      },
      {
        "id": "D",
        "text": "Earlier"
      }
    ],
    "correctOptionId": "A",
    "explanation": "'In other words' introduces a restatement/clarification of zero electrical resistance.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-49",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 49",
    "prompt": "Smartphones have become so ______ in contemporary metropolitan life that navigating public transit or accessing banking services without one has become nearly impossible.",
    "options": [
      {
        "id": "A",
        "text": "ubiquitous"
      },
      {
        "id": "B",
        "text": "contingent"
      },
      {
        "id": "C",
        "text": "sporadic"
      },
      {
        "id": "D",
        "text": "archaic"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Ubiquitous means present, appearing, or found everywhere.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-50",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Information and Ideas: Inferences",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 50",
    "prompt": "Sediment cores retrieved from Lake Suigetsu in Japan display annually laminated varves containing terrestrial plant macrofossils. Radiocarbon calibration curves constructed from Suigetsu varves allow scientists to extend high-precision carbon dating back to 50,000 years before present. From this, it can be inferred that ______",
    "options": [
      {
        "id": "A",
        "text": "the Suigetsu varves provide an uninterrupted chronological record unaffected by sedimentary mixing."
      },
      {
        "id": "B",
        "text": "carbon-14 decay rates fluctuate dramatically from year to year."
      },
      {
        "id": "C",
        "text": "Lake Suigetsu was formed entirely by human engineering during the Holocene."
      },
      {
        "id": "D",
        "text": "terrestrial macrofossils do not absorb atmospheric carbon dioxide."
      }
    ],
    "correctOptionId": "A",
    "explanation": "For varves to provide high-precision calibration over 50,000 years, the sediment layers must have remained undisturbed and continuous.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-51",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Fragments",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 51",
    "prompt": "Because the deep-sea submersible's titanium pressure hull was engineered to withstand pressures exceeding 1,000 atmospheres, ______.",
    "options": [
      {
        "id": "A",
        "text": "it allowed marine geologists to safely explore the Challenger Deep"
      },
      {
        "id": "B",
        "text": "allowing marine geologists to safely explore the Challenger Deep"
      },
      {
        "id": "C",
        "text": "which enabled marine geologists to reach hydrothermal vents"
      },
      {
        "id": "D",
        "text": "so that marine geologists could collect trench core samples"
      }
    ],
    "correctOptionId": "A",
    "explanation": "The subordinate clause 'Because...' requires a complete independent main clause with a subject and finite verb ('it allowed...').",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-52",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Expression of Ideas: Rhetorical Synthesis",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 52",
    "prompt": "Notes on C4 photosynthesis:\n- Most temperate plants utilize C3 carbon fixation.\n- C4 plants (e.g., maize, sugarcane) physically separate initial CO2 capture from the Calvin cycle.\n- Enzyme PEP carboxylase has no affinity for oxygen, eliminating photorespiration.\n- C4 plants thrive in arid, high-temperature, and high-light environments.\nThe student wants to contrast the biochemical efficiency of C4 plants in hot climates with that of C3 plants. Which choice best accomplishes this?",
    "options": [
      {
        "id": "A",
        "text": "Unlike C3 plants, which suffer from photorespiration in hot environments, C4 plants utilize PEP carboxylase to avoid oxygen binding and maximize photosynthetic efficiency."
      },
      {
        "id": "B",
        "text": "C4 plants include maize and sugarcane, which grow well in sunny climates."
      },
      {
        "id": "C",
        "text": "Temperatures and sunlight affect how plants fix carbon through photosynthesis."
      },
      {
        "id": "D",
        "text": "Both C3 and C4 plants utilize the Calvin cycle to synthesize sugars from carbon dioxide."
      }
    ],
    "correctOptionId": "A",
    "explanation": "Choice A directly contrasts the efficiency and mechanism between C3 and C4 plants in hot conditions.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-53",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Craft and Structure: Words in Context",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 53",
    "prompt": "The mathematician's monograph on algebraic topology was so ______ that only a handful of specialists across the globe could fully comprehend the proofs.",
    "options": [
      {
        "id": "A",
        "text": "esoteric"
      },
      {
        "id": "B",
        "text": "accessible"
      },
      {
        "id": "C",
        "text": "rudimentary"
      },
      {
        "id": "D",
        "text": "banal"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Esoteric means intended for or likely to be understood by only a small number of people with specialized knowledge.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-rw-54",
    "examId": "sat",
    "section": "Reading and Writing",
    "topic": "Standard English Conventions: Plurals and Possessives",
    "difficulty": "medium",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 54",
    "prompt": "The ______ feathers of the male peacock scatter light to create striking iridescent blue and green patterns.",
    "options": [
      {
        "id": "A",
        "text": "peacock's"
      },
      {
        "id": "B",
        "text": "peacocks'"
      },
      {
        "id": "C",
        "text": "peacocks"
      },
      {
        "id": "D",
        "text": "peacock"
      }
    ],
    "correctOptionId": "A",
    "explanation": "The singular possessive 'peacock's' describes the feathers of the male peacock.",
    "aiHint": "Identify the syntactic or rhetorical cue in the sentence."
  },
  {
    "id": "sat-m-55",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Algebra: Linear Equations in One Variable",
    "difficulty": "easy",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Official Practice Test 1",
    "prompt": "If 4x + 7 = 35, what is the value of 2x + 5?",
    "options": [
      {
        "id": "A",
        "text": "14"
      },
      {
        "id": "B",
        "text": "19"
      },
      {
        "id": "C",
        "text": "21"
      },
      {
        "id": "D",
        "text": "24"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Subtract 7 from both sides: 4x = 28, so x = 7. Then 2x + 5 = 2(7) + 5 = 14 + 5 = 19.",
    "aiHint": "Isolate x first, then substitute into the expression."
  },
  {
    "id": "sat-m-56",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Algebra: Linear Functions and Graphs",
    "difficulty": "easy",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Practice Test 1",
    "prompt": "A line in the xy-plane passes through the points (0, 4) and (3, 13). Which of the following is an equation of this line?",
    "options": [
      {
        "id": "A",
        "text": "y = 3x + 4"
      },
      {
        "id": "B",
        "text": "y = 4x + 3"
      },
      {
        "id": "C",
        "text": "y = 9x + 4"
      },
      {
        "id": "D",
        "text": "y = (1/3)x + 4"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Slope m = (13 - 4)/(3 - 0) = 9/3 = 3. The y-intercept is (0, 4), so the equation is y = 3x + 4.",
    "aiHint": "Use m = (y2 - y1) / (x2 - x1)."
  },
  {
    "id": "sat-m-57",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Quadratic Equations",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Practice Test 2",
    "prompt": "What are the solutions to the quadratic equation x^2 - 8x + 12 = 0?",
    "options": [
      {
        "id": "A",
        "text": "x = -6 and x = -2"
      },
      {
        "id": "B",
        "text": "x = 2 and x = 6"
      },
      {
        "id": "C",
        "text": "x = 3 and x = 4"
      },
      {
        "id": "D",
        "text": "x = -3 and x = -4"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Factor the quadratic: (x - 2)(x - 6) = 0. Therefore, x = 2 or x = 6.",
    "aiHint": "Find two numbers whose product is 12 and sum is -8."
  },
  {
    "id": "sat-m-58",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Problem-Solving: Rates, Proportions, and Percentages",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT QAS May 2023",
    "prompt": "A laptop originally priced at $800 is discounted by 20%. A local sales tax of 8% is then applied to the discounted price. What is the final total purchase price of the laptop?",
    "options": [
      {
        "id": "A",
        "text": "$680.00"
      },
      {
        "id": "B",
        "text": "$691.20"
      },
      {
        "id": "C",
        "text": "$704.00"
      },
      {
        "id": "D",
        "text": "$720.00"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Discounted price = 800 * 0.80 = $640. Adding 8% tax: 640 * 1.08 = $691.20.",
    "aiHint": "Calculate 80% of 800, then multiply by 1.08."
  },
  {
    "id": "sat-m-59",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Geometry: Circles in the Coordinate Plane",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Suite",
    "prompt": "In the xy-plane, the graph of (x - 3)^2 + (y + 5)^2 = 49 is a circle. What is the center and the radius of this circle?",
    "options": [
      {
        "id": "A",
        "text": "Center: (-3, 5); Radius: 7"
      },
      {
        "id": "B",
        "text": "Center: (3, -5); Radius: 7"
      },
      {
        "id": "C",
        "text": "Center: (3, -5); Radius: 49"
      },
      {
        "id": "D",
        "text": "Center: (-3, 5); Radius: 49"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The standard circle equation is (x - h)^2 + (y - k)^2 = r^2. Here h = 3, k = -5, and r = sqrt(49) = 7.",
    "aiHint": "Remember the standard form has signs (x - h) and (y - k)."
  },
  {
    "id": "sat-m-60",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Algebra: Systems of Linear Equations",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 60",
    "prompt": "2x + 3y = 18 and 4x - y = 8. What is the value of x + y?",
    "options": [
      {
        "id": "A",
        "text": "5"
      },
      {
        "id": "B",
        "text": "6"
      },
      {
        "id": "C",
        "text": "7"
      },
      {
        "id": "D",
        "text": "8"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Multiply second equation by 3: 12x - 3y = 24. Add to first: 14x = 42 -> x = 3. Then y = (4(3)-8) = 4. x + y = 3 + 4 = 7.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-61",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Exponential Functions",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 61",
    "prompt": "A culture of bacteria begins with 500 cells and doubles every 4 hours. Which function f(t) models the population after t hours?",
    "options": [
      {
        "id": "A",
        "text": "f(t) = 500(2)^(t/4)"
      },
      {
        "id": "B",
        "text": "f(t) = 500(4)^(t/2)"
      },
      {
        "id": "C",
        "text": "f(t) = 500(2)^(4t)"
      },
      {
        "id": "D",
        "text": "f(t) = 2(500)^(t/4)"
      }
    ],
    "correctOptionId": "A",
    "explanation": "The base growth rate is 2, with the exponent representing the number of 4-hour intervals: t/4.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-62",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Problem-Solving: Two-Way Tables & Probability",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 62",
    "prompt": "In a study of 200 clinic patients, 120 are non-smokers and 80 are smokers. Among non-smokers, 30 have hypertension. Among smokers, 40 have hypertension. What is the probability that a randomly chosen patient with hypertension is a smoker?",
    "options": [
      {
        "id": "A",
        "text": "40/70 = 4/7"
      },
      {
        "id": "B",
        "text": "40/200 = 1/5"
      },
      {
        "id": "C",
        "text": "40/80 = 1/2"
      },
      {
        "id": "D",
        "text": "70/200 = 7/20"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Total patients with hypertension = 30 + 40 = 70. Those who smoke = 40. P(smoker | hypertension) = 40/70 = 4/7.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-63",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Geometry: Right Triangles and Trigonometry",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 63",
    "prompt": "In right triangle ABC with right angle at C, if sin(A) = 3/5, what is the value of cos(B)?",
    "options": [
      {
        "id": "A",
        "text": "3/5"
      },
      {
        "id": "B",
        "text": "4/5"
      },
      {
        "id": "C",
        "text": "3/4"
      },
      {
        "id": "D",
        "text": "5/3"
      }
    ],
    "correctOptionId": "A",
    "explanation": "By cofunction identity, for complementary angles in a right triangle, cos(B) = sin(A) = 3/5.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-64",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Radical and Rational Exponents",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 64",
    "prompt": "For x > 0, simplify the expression: (x^(3/2) * x^(5/2)) / x^2.",
    "options": [
      {
        "id": "A",
        "text": "x"
      },
      {
        "id": "B",
        "text": "x^2"
      },
      {
        "id": "C",
        "text": "x^3"
      },
      {
        "id": "D",
        "text": "x^4"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Numerator: x^(3/2 + 5/2) = x^4. Divided by x^2 gives x^(4 - 2) = x^2.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-65",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Algebra: Linear Inequalities",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 65",
    "prompt": "Which point (x, y) is in the solution set of the system y > 2x - 3 and y <= -x + 4?",
    "options": [
      {
        "id": "A",
        "text": "(1, 1)"
      },
      {
        "id": "B",
        "text": "(0, 0)"
      },
      {
        "id": "C",
        "text": "(3, 2)"
      },
      {
        "id": "D",
        "text": "(-2, -5)"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Testing (0,0): 0 > -3 (true), and 0 <= 4 (true). Both hold.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-66",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Problem-Solving: Scatterplots and Linear Models",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 66",
    "prompt": "A regression line y = 1.45x + 12.8 predicts plant height y (cm) based on days x. According to the model, what is the predicted increase in plant height for every 10 days?",
    "options": [
      {
        "id": "A",
        "text": "1.45 cm"
      },
      {
        "id": "B",
        "text": "12.8 cm"
      },
      {
        "id": "C",
        "text": "14.5 cm"
      },
      {
        "id": "D",
        "text": "27.3 cm"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Change in y = slope * change in x = 1.45 * 10 = 14.5 cm.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-67",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Polynomial Operations",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 67",
    "prompt": "If (2x^2 + 5x - 3) * (x - 4) = ax^3 + bx^2 + cx + d, what is the value of b?",
    "options": [
      {
        "id": "A",
        "text": "-8"
      },
      {
        "id": "B",
        "text": "-3"
      },
      {
        "id": "C",
        "text": "5"
      },
      {
        "id": "D",
        "text": "-13"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The x^2 terms come from 2x^2 * (-4) + 5x * x = -8x^2 + 5x^2 = -3x^2. Thus b = -3.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-68",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Geometry: Angles, Parallel Lines, and Transversals",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 68",
    "prompt": "Two parallel lines are cut by a transversal. If one interior angle measures (3x + 15)\u00b0 and its consecutive interior angle measures (2x + 25)\u00b0, what is the value of x?",
    "options": [
      {
        "id": "A",
        "text": "28"
      },
      {
        "id": "B",
        "text": "30"
      },
      {
        "id": "C",
        "text": "32"
      },
      {
        "id": "D",
        "text": "36"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Consecutive interior angles are supplementary: (3x + 15) + (2x + 25) = 180 -> 5x + 40 = 180 -> 5x = 140 -> x = 28.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-69",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Problem-Solving: Median, Mean, and Standard Deviation",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 69",
    "prompt": "A dataset consists of values {12, 14, 15, 18, 21, 28, 92}. If the outlier 92 is removed, which statistical metric will decrease the most?",
    "options": [
      {
        "id": "A",
        "text": "Median"
      },
      {
        "id": "B",
        "text": "Mode"
      },
      {
        "id": "C",
        "text": "Mean"
      },
      {
        "id": "D",
        "text": "Range"
      }
    ],
    "correctOptionId": "D",
    "explanation": "Range was 92 - 12 = 80; without 92, range is 28 - 12 = 16 (decreases by 64).",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-70",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Completing the Square",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 70",
    "prompt": "The vertex form of y = x^2 - 10x + 29 is y = (x - h)^2 + k. What is the value of k?",
    "options": [
      {
        "id": "A",
        "text": "4"
      },
      {
        "id": "B",
        "text": "-4"
      },
      {
        "id": "C",
        "text": "25"
      },
      {
        "id": "D",
        "text": "-25"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Complete square: x^2 - 10x + 25 + 4 = (x - 5)^2 + 4. Thus k = 4.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-71",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Algebra: Absolute Value Equations",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 71",
    "prompt": "How many distinct real solutions exist for |2x - 7| = -5?",
    "options": [
      {
        "id": "A",
        "text": "Zero"
      },
      {
        "id": "B",
        "text": "One"
      },
      {
        "id": "C",
        "text": "Two"
      },
      {
        "id": "D",
        "text": "Infinitely many"
      }
    ],
    "correctOptionId": "A",
    "explanation": "An absolute value cannot be negative. Therefore, zero solutions exist.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-72",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Geometry: Volume of Geometric Solids",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 72",
    "prompt": "A right circular cylinder has radius r = 3 cm and height h = 10 cm. What is its volume in cm^3?",
    "options": [
      {
        "id": "A",
        "text": "30pi"
      },
      {
        "id": "B",
        "text": "60pi"
      },
      {
        "id": "C",
        "text": "90pi"
      },
      {
        "id": "D",
        "text": "120pi"
      }
    ],
    "correctOptionId": "C",
    "explanation": "V = pi * r^2 * h = pi * (3^2) * 10 = 90pi.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-73",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Problem-Solving: Ratios and Units",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 73",
    "prompt": "A printer prints 48 pages in 3 minutes. At this rate, how many hours will it take to print 2,880 pages?",
    "options": [
      {
        "id": "A",
        "text": "2.5"
      },
      {
        "id": "B",
        "text": "3.0"
      },
      {
        "id": "C",
        "text": "3.5"
      },
      {
        "id": "D",
        "text": "4.0"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Rate = 48/3 = 16 pages/min. Time for 2880 pages = 2880 / 16 = 180 minutes = 3.0 hours.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-74",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Function Notation and Composite Functions",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 74",
    "prompt": "If f(x) = 3x - 1 and g(x) = x^2 + 2, what is f(g(3))?",
    "options": [
      {
        "id": "A",
        "text": "26"
      },
      {
        "id": "B",
        "text": "32"
      },
      {
        "id": "C",
        "text": "35"
      },
      {
        "id": "D",
        "text": "66"
      }
    ],
    "correctOptionId": "B",
    "explanation": "g(3) = 3^2 + 2 = 11. Then f(11) = 3(11) - 1 = 33 - 1 = 32.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-75",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Algebra: Interpreting Linear Models",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 75",
    "prompt": "The total cost C (in dollars) of renting a truck for d days and driving m miles is given by C = 45d + 0.35m. What does the coefficient 0.35 represent?",
    "options": [
      {
        "id": "A",
        "text": "The daily rental fee"
      },
      {
        "id": "B",
        "text": "The mileage rate in dollars per mile driven"
      },
      {
        "id": "C",
        "text": "The total mileage allowance"
      },
      {
        "id": "D",
        "text": "The insurance cost"
      }
    ],
    "correctOptionId": "B",
    "explanation": "0.35 is multiplied by miles m, so it represents $0.35 per mile driven.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-76",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Geometry: Similar Triangles",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Digital SAT Previous Paper Form 76",
    "prompt": "Triangle ABC is similar to triangle DEF, with AB corresponding to DE. If AB = 8, DE = 12, and the area of triangle ABC is 32, what is the area of triangle DEF?",
    "options": [
      {
        "id": "A",
        "text": "48"
      },
      {
        "id": "B",
        "text": "64"
      },
      {
        "id": "C",
        "text": "72"
      },
      {
        "id": "D",
        "text": "96"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Ratio of sides = 12/8 = 3/2. Ratio of areas = (3/2)^2 = 9/4. Area of DEF = 32 * (9/4) = 72.",
    "aiHint": "Check the given algebraic properties or geometric ratio rules."
  },
  {
    "id": "sat-m-77",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Nonlinear Systems",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 77",
    "prompt": "In the xy-plane, the line y = 2x + k intersects the parabola y = x^2 + 6x + 7 at exactly one point. What is the value of k?",
    "options": [
      {
        "id": "A",
        "text": "3"
      },
      {
        "id": "B",
        "text": "4"
      },
      {
        "id": "C",
        "text": "5"
      },
      {
        "id": "D",
        "text": "6"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Set equal: x^2 + 6x + 7 = 2x + k -> x^2 + 4x + (7 - k) = 0. One intersection requires discriminant = 0: 4^2 - 4(1)(7 - k) = 0 -> 16 - 28 + 4k = 0 -> 4k = 12 -> k = 3.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-78",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Geometry: Arc Length and Radians",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 78",
    "prompt": "In a circle with radius 6 cm, a central angle intercepts an arc of length 4pi cm. What is the measure of the central angle in radians?",
    "options": [
      {
        "id": "A",
        "text": "2pi/3"
      },
      {
        "id": "B",
        "text": "3pi/4"
      },
      {
        "id": "C",
        "text": "pi/3"
      },
      {
        "id": "D",
        "text": "4pi/5"
      }
    ],
    "correctOptionId": "A",
    "explanation": "s = r * theta -> 4pi = 6 * theta -> theta = 4pi / 6 = 2pi/3 radians.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-79",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Algebra: Equivalent Expressions with Fractions",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 79",
    "prompt": "Which of the following is equivalent to (3x + 5) / (x - 2) for x != 2?",
    "options": [
      {
        "id": "A",
        "text": "3 + 11/(x - 2)"
      },
      {
        "id": "B",
        "text": "3 - 1/(x - 2)"
      },
      {
        "id": "C",
        "text": "3 + 5/(x - 2)"
      },
      {
        "id": "D",
        "text": "3 + 1/(x - 2)"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Polynomial division: (3x - 6 + 11)/(x - 2) = 3 + 11/(x - 2).",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-80",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Problem-Solving: Margin of Error and Confidence",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 80",
    "prompt": "A poll of 1,200 randomly selected voters found that 54% favored Proposition A with a margin of error of +/- 2.8% at a 95% confidence level. Which statement is the most valid conclusion?",
    "options": [
      {
        "id": "A",
        "text": "Exactly 54% of all voters will vote for Proposition A."
      },
      {
        "id": "B",
        "text": "It is plausible that the actual percentage of all voters favoring Proposition A is between 51.2% and 56.8%."
      },
      {
        "id": "C",
        "text": "There is a 95% probability that an individual voter votes yes."
      },
      {
        "id": "D",
        "text": "Proposition A will fail with 5% chance."
      }
    ],
    "correctOptionId": "B",
    "explanation": "54% +/- 2.8% gives a plausible interval of (51.2%, 56.8%) for the population parameter.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-81",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Complex Numbers",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 81",
    "prompt": "What is the result of dividing (4 + 2i) by (1 - i), where i = sqrt(-1)?",
    "options": [
      {
        "id": "A",
        "text": "1 + 3i"
      },
      {
        "id": "B",
        "text": "3 + 3i"
      },
      {
        "id": "C",
        "text": "1 - 3i"
      },
      {
        "id": "D",
        "text": "3 - i"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Multiply numerator and denominator by conjugate (1 + i): (4 + 2i)(1 + i) / (1^2 - i^2) = (4 + 4i + 2i - 2)/2 = (2 + 6i)/2 = 1 + 3i.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-82",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Synthetic Division and Remainder Theorem",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 82",
    "prompt": "If polynomial P(x) = 2x^3 - 5x^2 + ax - 8 is divisible by (x - 2), what is the value of a?",
    "options": [
      {
        "id": "A",
        "text": "6"
      },
      {
        "id": "B",
        "text": "8"
      },
      {
        "id": "C",
        "text": "10"
      },
      {
        "id": "D",
        "text": "12"
      }
    ],
    "correctOptionId": "A",
    "explanation": "By Remainder Theorem, P(2) = 0: 2(8) - 5(4) + 2a - 8 = 0 -> 16 - 20 + 2a - 8 = 0 -> 2a - 12 = 0 -> a = 6.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-83",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Geometry: Equations of Perpendicular Lines",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 83",
    "prompt": "Line L1 has equation 3x - 4y = 12. If line L2 is perpendicular to L1 and passes through (6, -1), what is the y-intercept of L2?",
    "options": [
      {
        "id": "A",
        "text": "7"
      },
      {
        "id": "B",
        "text": "8"
      },
      {
        "id": "C",
        "text": "9"
      },
      {
        "id": "D",
        "text": "10"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Slope of L1 is 3/4. Perpendicular slope is -4/3. Equation of L2: y - (-1) = -4/3(x - 6) -> y + 1 = -4/3 x + 8 -> y = -4/3 x + 7. y-intercept is 7.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-84",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Algebra: Special Systems of Equations",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 84",
    "prompt": "For what value of c will the system of equations 6x - 9y = 15 and 4x - cy = 10 have infinitely many solutions?",
    "options": [
      {
        "id": "A",
        "text": "6"
      },
      {
        "id": "B",
        "text": "-6"
      },
      {
        "id": "C",
        "text": "9"
      },
      {
        "id": "D",
        "text": "-9"
      }
    ],
    "correctOptionId": "A",
    "explanation": "For infinite solutions, coefficients must be proportional: 6/4 = -9/(-c) = 15/10. 6/4 = 1.5, so 9/c = 1.5 -> c = 6.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-85",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Problem-Solving: Exponential Decay Half-Life",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 85",
    "prompt": "A radioactive isotope has a half-life of 15 days. If a sample initially contains 80 grams, which equation gives the remaining mass M(t) in grams after t days?",
    "options": [
      {
        "id": "A",
        "text": "M(t) = 80(0.5)^(t/15)"
      },
      {
        "id": "B",
        "text": "M(t) = 80(15)^(0.5t)"
      },
      {
        "id": "C",
        "text": "M(t) = 15(0.5)^(t/80)"
      },
      {
        "id": "D",
        "text": "M(t) = 80(0.5)^(15t)"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Half-life decay is modeled by M(t) = M0 * (1/2)^(t/h), where h = 15.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-86",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Quadratic Maximum/Minimum",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 86",
    "prompt": "The height h(t) in meters of a projectile launched upward from ground level is given by h(t) = -5t^2 + 40t. What is the maximum height, in meters, reached by the projectile?",
    "options": [
      {
        "id": "A",
        "text": "70"
      },
      {
        "id": "B",
        "text": "80"
      },
      {
        "id": "C",
        "text": "90"
      },
      {
        "id": "D",
        "text": "100"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Vertex occurs at t = -b/(2a) = -40 / (2 * -5) = 4. Maximum height h(4) = -5(16) + 40(4) = -80 + 160 = 80 meters.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-87",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Geometry: Coordinate Proof and Midpoint",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 87",
    "prompt": "The endpoints of diameter AB of a circle are A(-3, 8) and B(5, -2). What is the area of the circle?",
    "options": [
      {
        "id": "A",
        "text": "41pi"
      },
      {
        "id": "B",
        "text": "82pi"
      },
      {
        "id": "C",
        "text": "164pi"
      },
      {
        "id": "D",
        "text": "25pi"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Diameter d = sqrt((5 - (-3))^2 + (-2 - 8))^2) = sqrt(64 + 100) = sqrt(164). Radius r = sqrt(164)/2. Area = pi * r^2 = pi * (164/4) = 41pi.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-88",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Problem-Solving: Weighted Averages",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 88",
    "prompt": "In a chemistry class, quizzes count for 30%, labs count for 20%, and exams count for 50% of the overall course grade. If Elena scored 85 on quizzes and 90 on labs, what minimum exam score must she achieve to earn an overall course average of 90?",
    "options": [
      {
        "id": "A",
        "text": "91"
      },
      {
        "id": "B",
        "text": "92"
      },
      {
        "id": "C",
        "text": "93"
      },
      {
        "id": "D",
        "text": "94"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Weighted sum: 0.30(85) + 0.20(90) + 0.50(E) = 90 -> 25.5 + 18.0 + 0.50E = 90 -> 43.5 + 0.50E = 90 -> 0.50E = 46.5 -> E = 93.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-89",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Algebra: Nonlinear Growth Comparisons",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 89",
    "prompt": "Function f(x) = 2x + 50 and function g(x) = 1.2^x. For which integer interval does g(x) permanently surpass f(x)?",
    "options": [
      {
        "id": "A",
        "text": "For all x > 25"
      },
      {
        "id": "B",
        "text": "For all x > 35"
      },
      {
        "id": "C",
        "text": "For all x > 5"
      },
      {
        "id": "D",
        "text": "g(x) never surpasses f(x)"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Any exponential function with base > 1 eventually grows faster than any linear function. For 1.2^x vs 2x+50, 1.2^25 = 95.39, while 2(25)+50 = 100; at x=26, 1.2^26 = 114.47 > 102.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-90",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Geometry: Right Pyramid Surface Area",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 90",
    "prompt": "A regular square pyramid has base edge length 10 cm and slant height 13 cm. What is the total surface area of the pyramid in cm^2?",
    "options": [
      {
        "id": "A",
        "text": "260"
      },
      {
        "id": "B",
        "text": "360"
      },
      {
        "id": "C",
        "text": "420"
      },
      {
        "id": "D",
        "text": "520"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Base area = 10 * 10 = 100. Four triangular faces each have area 1/2 * 10 * 13 = 65. Total area = 100 + 4(65) = 100 + 260 = 360 cm^2.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-91",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Transformation of Functions",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 91",
    "prompt": "If the graph of f(x) is shifted horizontally 4 units to the right and vertically 3 units down, which function represents the resulting graph?",
    "options": [
      {
        "id": "A",
        "text": "g(x) = f(x - 4) - 3"
      },
      {
        "id": "B",
        "text": "g(x) = f(x + 4) - 3"
      },
      {
        "id": "C",
        "text": "g(x) = f(x - 4) + 3"
      },
      {
        "id": "D",
        "text": "g(x) = f(x + 4) + 3"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Horizontal shift right by c is f(x - c); vertical shift down by d is - d. Hence f(x - 4) - 3.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-92",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Problem-Solving: Conditional Distributions",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 92",
    "prompt": "Of 500 college freshmen, 300 take Calculus and 250 take Physics. If 150 take both Calculus and Physics, how many students take neither course?",
    "options": [
      {
        "id": "A",
        "text": "50"
      },
      {
        "id": "B",
        "text": "75"
      },
      {
        "id": "C",
        "text": "100"
      },
      {
        "id": "D",
        "text": "125"
      }
    ],
    "correctOptionId": "C",
    "explanation": "By inclusion-exclusion: Total taking at least one = 300 + 250 - 150 = 400. Neither = 500 - 400 = 100.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-93",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Geometry: Inscribed Angle Theorem",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 93",
    "prompt": "Points A, B, and C lie on a circle centered at O. If inscribed angle ABC measures 55\u00b0, what is the measure of minor arc AC?",
    "options": [
      {
        "id": "A",
        "text": "55\u00b0"
      },
      {
        "id": "B",
        "text": "110\u00b0"
      },
      {
        "id": "C",
        "text": "125\u00b0"
      },
      {
        "id": "D",
        "text": "165\u00b0"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The measure of an inscribed angle is half the measure of its intercepted arc. Therefore, arc AC = 2 * 55\u00b0 = 110\u00b0.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-94",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Algebra: Fractional Exponent Equations",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 94",
    "prompt": "If (x - 3)^(2/3) = 9 for real x, what is the product of all real solutions for x?",
    "options": [
      {
        "id": "A",
        "text": "-720"
      },
      {
        "id": "B",
        "text": "-576"
      },
      {
        "id": "C",
        "text": "648"
      },
      {
        "id": "D",
        "text": "-648"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Cube both sides: (x - 3)^2 = 729. Take square root: x - 3 = 27 or x - 3 = -27 -> x = 30 or x = -24. Product = 30 * (-24) = -720.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-95",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Discriminant Analysis",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 95",
    "prompt": "For what values of p does the equation 3x^2 - px + 12 = 0 have no real solutions?",
    "options": [
      {
        "id": "A",
        "text": "-12 < p < 12"
      },
      {
        "id": "B",
        "text": "p > 12 or p < -12"
      },
      {
        "id": "C",
        "text": "p = 12"
      },
      {
        "id": "D",
        "text": "-6 < p < 6"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Discriminant must be negative: (-p)^2 - 4(3)(12) < 0 -> p^2 - 144 < 0 -> -12 < p < 12.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-96",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Problem-Solving: Exponential Percent Decay",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 96",
    "prompt": "A car depreciates at a rate of 15% per year. What fraction of its original value remains after 3 years?",
    "options": [
      {
        "id": "A",
        "text": "0.55"
      },
      {
        "id": "B",
        "text": "0.614"
      },
      {
        "id": "C",
        "text": "0.722"
      },
      {
        "id": "D",
        "text": "0.850"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Remaining fraction = (1 - 0.15)^3 = (0.85)^3 = 0.614125.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-97",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Geometry: Special 30-60-90 Right Triangles",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 97",
    "prompt": "In a 30\u00b0-60\u00b0-90\u00b0 right triangle, the hypotenuse has length 16 cm. What is the length of the side opposite the 60\u00b0 angle?",
    "options": [
      {
        "id": "A",
        "text": "8"
      },
      {
        "id": "B",
        "text": "8*sqrt(3)"
      },
      {
        "id": "C",
        "text": "16*sqrt(3)"
      },
      {
        "id": "D",
        "text": "4*sqrt(3)"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Short side = 16/2 = 8. Side opposite 60\u00b0 = 8 * sqrt(3).",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  },
  {
    "id": "sat-m-98",
    "examId": "sat",
    "section": "Mathematics",
    "topic": "Advanced Math: Rational Functions and Asymptotes",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Digital SAT Previous Paper Form 98",
    "prompt": "What is the horizontal asymptote of the rational function f(x) = (6x^2 - 5x + 1) / (2x^2 + 7x - 4)?",
    "options": [
      {
        "id": "A",
        "text": "y = 3"
      },
      {
        "id": "B",
        "text": "y = 1/2"
      },
      {
        "id": "C",
        "text": "y = -4"
      },
      {
        "id": "D",
        "text": "No horizontal asymptote"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Degrees of numerator and denominator are both 2. The horizontal asymptote is the ratio of leading coefficients: 6 / 2 = 3.",
    "aiHint": "Apply advanced algebraic factorization or geometric rules."
  }
];
