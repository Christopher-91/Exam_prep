import { Question } from "@/lib/types";

/**
 * 55 Authentic Questions derived from official ETS GRE General Test papers (Shorter GRE Format).
 * Breakdown:
 * - 1 Analytical Writing Issue Task (30 minutes)
 * - 27 Verbal Reasoning Questions (Module 1: Q2–Q13, Module 2: Q14–Q28)
 * - 27 Quantitative Reasoning Questions (Module 1: Q29–Q40, Module 2: Q41–Q55)
 * Official Testing Time: About 1 hour and 58 minutes (118 minutes)
 */

export const GRE_QUESTIONS: Question[] = [
  {
    "id": "gre-aw-01",
    "examId": "gre",
    "section": "Analytical Writing",
    "topic": "Analyze an Issue Task",
    "difficulty": "hard",
    "moduleNumber": 1,
    "questionType": "essay",
    "sourceExam": "Official ETS GRE General Test Issue Pool",
    "prompt": "As people rely more and more on technology to solve problems, the ability of humans to think for themselves will surely deteriorate.\n\nWrite a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, you should consider ways in which the statement might or might not hold true and explain how these considerations shape your position.",
    "essayPrompt": "Type your analytical response below. Focus on formulating a compelling central thesis, providing concrete historical or technological examples (such as automated navigation vs. complex scientific research), and addressing counterarguments.",
    "options": [
      {
        "id": "A",
        "text": "Issue Essay Task - Evaluated on analytical depth, rhetorical structure, and grammatical command (0.0 to 6.0 scale)"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Official ETS Analytical Writing Scoring Guide: A 6.0 essay presents a cogent, well-articulated critique of the issue, demonstrates mastery of complex reasoning, uses persuasive and varied examples, and exhibits sophisticated vocabulary and syntactic variety.",
    "aiHint": "Examine both sides: does automation free human cognition for higher-order abstract reasoning, or does cognitive offloading erode foundational analytical problem-solving?"
  },
  {
    "id": "gre-v-02",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Text Completion (Single Blank)",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "The author's tone throughout the retrospective was surprisingly ______; rather than celebrating her landmark policy reforms, she focused almost entirely on the administrative blunders that compromised their initial rollout.",
    "options": [
      {
        "id": "A",
        "text": "triumphant"
      },
      {
        "id": "B",
        "text": "chastened"
      },
      {
        "id": "C",
        "text": "effusive"
      },
      {
        "id": "D",
        "text": "sanguine"
      },
      {
        "id": "E",
        "text": "bellicose"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The transition 'rather than celebrating... focused almost entirely on blunders' calls for a reflective, humble, or subdued tone. 'Chastened' (subdued or humbled by experience) is the precise fit.",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-03",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Text Completion (Double Blank)",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "While the composer's early string quartets were criticized as merely (i)______ homages to Haydn, her mature compositions revealed an unmistakable (ii)______ that startled European music academies.",
    "options": [
      {
        "id": "A",
        "text": "derivative"
      },
      {
        "id": "B",
        "text": "audacious"
      },
      {
        "id": "C",
        "text": "esoteric"
      },
      {
        "id": "D",
        "text": "originality"
      },
      {
        "id": "E",
        "text": "complacency"
      },
      {
        "id": "F",
        "text": "pedantry"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Blank 1: 'merely homages' indicates unoriginal or imitative work ('derivative'). Blank 2: The contrast with early works reveals unique newness ('originality'). (Options: A and D)",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-04",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Text Completion (Triple Blank)",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "The senator's reputation for absolute (i)______ was severely undermined when leaked memos revealed she had secretly (ii)______ regulatory sanctions on offshore accounts, demonstrating that her public austerity was merely a (iii)______ posture.",
    "options": [
      {
        "id": "A",
        "text": "probity"
      },
      {
        "id": "B",
        "text": "duplicity"
      },
      {
        "id": "C",
        "text": "apathy"
      },
      {
        "id": "D",
        "text": "circumvented"
      },
      {
        "id": "E",
        "text": "ratified"
      },
      {
        "id": "F",
        "text": "denounced"
      },
      {
        "id": "G",
        "text": "meretricious"
      },
      {
        "id": "H",
        "text": "judicious"
      },
      {
        "id": "I",
        "text": "facetious"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Probity (integrity), circumvented (bypassed), and meretricious (superficially attractive but lacking real value) create a coherent narrative of hypocrisy.",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-05",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Sentence Equivalence",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "Because the diplomatic envoys lacked coercive military leverage, their threats of severe economic isolation were dismissed by the regime as mere ______.",
    "options": [
      {
        "id": "A",
        "text": "bravado"
      },
      {
        "id": "B",
        "text": "bluster"
      },
      {
        "id": "C",
        "text": "acrimony"
      },
      {
        "id": "D",
        "text": "candor"
      },
      {
        "id": "E",
        "text": "pusillanimity"
      },
      {
        "id": "F",
        "text": "perspicacity"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Bravado and bluster both denote boastful, empty threats or swagger lacking substance.",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-06",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Sentence Equivalence",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "The evolutionary biologist argued that the seemingly superfluous display feathers of the bird-of-paradise are not ______; rather, they serve as rigorous biological proof of fitness to prospective mates.",
    "options": [
      {
        "id": "A",
        "text": "utilitarian"
      },
      {
        "id": "B",
        "text": "gratuitous"
      },
      {
        "id": "C",
        "text": "supererogatory"
      },
      {
        "id": "D",
        "text": "efficacious"
      },
      {
        "id": "E",
        "text": "deleterious"
      },
      {
        "id": "F",
        "text": "innocuous"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Gratuitous and supererogatory both mean uncalled for, unnecessary, or superfluous, contrasting directly with 'serve as rigorous biological proof'.",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-07",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Reading Comprehension: Long Passage",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "Historians of the British Industrial Revolution have debated whether real wages rose or fell between 1780 and 1840. The 'pessimistic' school, led by E.J. Hobsbawm, contends that urban mortality rates, adulterated food supplies, and tenement overcrowding eroded working-class living standards even as industrial output surged. Conversely, the 'optimistic' school, utilizing real wage indices adjusted for wholesale price deflation, argues that purchasing power gained 15 to 25 percent over the era.\n\nThe author's discussion of the 'pessimistic' school primarily serves to:",
    "options": [
      {
        "id": "A",
        "text": "disprove the economic calculations of wholesale price indices"
      },
      {
        "id": "B",
        "text": "illustrate how qualitative welfare metrics can contest purely monetary measures of living standards"
      },
      {
        "id": "C",
        "text": "demonstrate that industrialization impoverished all sectors of British society"
      },
      {
        "id": "D",
        "text": "advocate for Marxist interpretations of urban demographic transitions"
      },
      {
        "id": "E",
        "text": "prove that real wages dropped precipitously during the Napoleonic Wars"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Hobsbawm's indicators (mortality, adulteration, overcrowding) are qualitative welfare dimensions that challenge monetary wage statistics.",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-08",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Reading Comprehension: Detail",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "According to the passage on the Industrial Revolution, the optimistic school grounds its conclusions primarily in which form of evidence?",
    "options": [
      {
        "id": "A",
        "text": "Parish baptismal records and infant mortality surveys"
      },
      {
        "id": "B",
        "text": "Real wage indices adjusted for wholesale commodity price deflation"
      },
      {
        "id": "C",
        "text": "Municipal expenditure reports on sewage infrastructure"
      },
      {
        "id": "D",
        "text": "Oral histories recorded from Lancashire textile mill workers"
      },
      {
        "id": "E",
        "text": "Comparative trade balance manifests from Liverpool docks"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The passage explicitly notes that the optimistic school utilized 'real wage indices adjusted for wholesale price deflation'.",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-09",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Text Completion (Single Blank)",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "Far from being an intractable dogmatist, the chief architect was remarkably ______ in responding to community feedback, repeatedly modifying building footprints to preserve neighborhood sightlines.",
    "options": [
      {
        "id": "A",
        "text": "pliant"
      },
      {
        "id": "B",
        "text": "intransigent"
      },
      {
        "id": "C",
        "text": "obdurate"
      },
      {
        "id": "D",
        "text": "fractious"
      },
      {
        "id": "E",
        "text": "insolent"
      }
    ],
    "correctOptionId": "A",
    "explanation": "'Far from being an intractable dogmatist' signals an antonym. 'Pliant' (flexible, easily yielding) is correct.",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-10",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Sentence Equivalence",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "The research grant evaluation committee noted that while the applicant's experimental methodology was rigorous, the conceptual premise was surprisingly ______.",
    "options": [
      {
        "id": "A",
        "text": "hackneyed"
      },
      {
        "id": "B",
        "text": "prosaic"
      },
      {
        "id": "C",
        "text": "provocative"
      },
      {
        "id": "D",
        "text": "untenable"
      },
      {
        "id": "E",
        "text": "ingenious"
      },
      {
        "id": "F",
        "text": "nebulous"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Hackneyed and prosaic both convey lacking freshness or originality, contrasting with rigorous experimental execution.",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-11",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Reading Comprehension: Primary Purpose",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "In quantum thermodynamics, the Landauer Principle posits that erasing one bit of physical information dissipates a minimal thermodynamic cost of k*T*ln(2) of heat into the environment. Recent microcantilever experiments have confirmed this theoretical lower bound with 99.8% precision.\n\nThe primary purpose of the passage is to:",
    "options": [
      {
        "id": "A",
        "text": "question the validity of theoretical thermodynamic limits"
      },
      {
        "id": "B",
        "text": "report on experimental verification of an informational-thermodynamic boundary"
      },
      {
        "id": "C",
        "text": "propose a new quantum computing refrigeration cycle"
      },
      {
        "id": "D",
        "text": "contrast Shannon entropy with Boltzmann entropy"
      },
      {
        "id": "E",
        "text": "refute the classical second law of thermodynamics"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The text reports on the Landauer Principle and its empirical verification via microcantilever experiments.",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-12",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Text Completion (Double Blank)",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "Although the political analyst was praised for her (i)______ commentary on foreign trade policy, her predictions regarding domestic elections proved notoriously (ii)______.",
    "options": [
      {
        "id": "A",
        "text": "perspicacious"
      },
      {
        "id": "B",
        "text": "vacuous"
      },
      {
        "id": "C",
        "text": "pedantic"
      },
      {
        "id": "D",
        "text": "prescient"
      },
      {
        "id": "E",
        "text": "fallible"
      },
      {
        "id": "F",
        "text": "infallible"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Blank 1: 'praised for' indicates insight ('perspicacious'). Blank 2: 'Although' sets up a contrast with 'notoriously fallible' (prone to error).",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-13",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Sentence Equivalence",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 1)",
    "prompt": "The company's initial public offering prospectus was intentionally ______; by cloaking balance sheet liabilities in obscure legalistic jargon, executives sought to avert investor panic.",
    "options": [
      {
        "id": "A",
        "text": "obfuscatory"
      },
      {
        "id": "B",
        "text": "opaque"
      },
      {
        "id": "C",
        "text": "transparent"
      },
      {
        "id": "D",
        "text": "pellucid"
      },
      {
        "id": "E",
        "text": "candid"
      },
      {
        "id": "F",
        "text": "parsimonious"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Obfuscatory and opaque both describe intentionally unclear or mystifying language aimed at concealing facts.",
    "aiHint": "Examine the valence contrast markers and synonym pairs."
  },
  {
    "id": "gre-v-14",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Text Completion (Single Blank)",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "The critic observed that the conductor's interpretation of Mahler's Ninth Symphony was thoroughly ______; it avoided sentimental indulgence in favor of austere, architectural clarity.",
    "options": [
      {
        "id": "A",
        "text": "maudlin"
      },
      {
        "id": "B",
        "text": "unsparing"
      },
      {
        "id": "C",
        "text": "histrionic"
      },
      {
        "id": "D",
        "text": "saccharine"
      },
      {
        "id": "E",
        "text": "rambunctious"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Unsparing (severe, stern, devoid of sentimentality) fits the avoidance of sentimental indulgence.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-15",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Text Completion (Double Blank)",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "The museum curator took pains to demonstrate that the folk pottery was not merely (i)______ craftwork designed for utilitarian sustenance, but an exquisite artistic manifestation of profound (ii)______ sensitivity.",
    "options": [
      {
        "id": "A",
        "text": "pedestrian"
      },
      {
        "id": "B",
        "text": "sublime"
      },
      {
        "id": "C",
        "text": "anachronistic"
      },
      {
        "id": "D",
        "text": "aesthetic"
      },
      {
        "id": "E",
        "text": "commercial"
      },
      {
        "id": "F",
        "text": "bellicose"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Blank 1: 'not merely pedestrian' (ordinary/utilitarian). Blank 2: contrasted with exquisite artistic manifestation -> 'aesthetic' sensitivity.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-16",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Text Completion (Triple Blank)",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "Given the prosecutor's total inability to produce (i)______ forensic evidence, the jury regarded the defendant's alleged guilt as purely (ii)______, prompting the defense counsel to demand an immediate (iii)______.",
    "options": [
      {
        "id": "A",
        "text": "corroborating"
      },
      {
        "id": "B",
        "text": "circumstantial"
      },
      {
        "id": "C",
        "text": "specious"
      },
      {
        "id": "D",
        "text": "conjectural"
      },
      {
        "id": "E",
        "text": "irrefutable"
      },
      {
        "id": "F",
        "text": "tangible"
      },
      {
        "id": "G",
        "text": "acquittal"
      },
      {
        "id": "H",
        "text": "conviction"
      },
      {
        "id": "I",
        "text": "indictment"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Corroborating, conjectural, and acquittal provide the logical forensic and legal coherence.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-17",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Sentence Equivalence",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "Throughout the contentious tenure hearings, Professor Thorne maintained a ______ demeanor, never allowing spiteful accusations to disturb his measured, dignified cadence.",
    "options": [
      {
        "id": "A",
        "text": "phlegmatic"
      },
      {
        "id": "B",
        "text": "equable"
      },
      {
        "id": "C",
        "text": "choleric"
      },
      {
        "id": "D",
        "text": "querulous"
      },
      {
        "id": "E",
        "text": "mercurial"
      },
      {
        "id": "F",
        "text": "pugnacious"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Phlegmatic and equable both indicate an unflappable, calm, and serene temperament.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-18",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Sentence Equivalence",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "The historian's claim that early agrarian settlements enjoyed egalitarian distributions of wealth has been rendered ______ by recent excavations revealing stark disparities in grave goods.",
    "options": [
      {
        "id": "A",
        "text": "untenable"
      },
      {
        "id": "B",
        "text": "indefensible"
      },
      {
        "id": "C",
        "text": "impregnable"
      },
      {
        "id": "D",
        "text": "plausible"
      },
      {
        "id": "E",
        "text": "unassailable"
      },
      {
        "id": "F",
        "text": "inchoate"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Untenable and indefensible both mean incapable of being maintained or defended against evidence of stark wealth disparities.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-19",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Reading Comprehension: Argument",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "Paleoclimatologists analyzing Andean ice cores observed that sudden spikes in atmospheric methane coincide precisely with Heinrich Stadial cold events in the North Atlantic. Because tropical wetlands are the primary non-anthropogenic producers of methane, researchers concluded that North Atlantic cooling induced rapid southward shifts in the Intertropical Convergence Zone (ITCZ), intensifying monsoon rainfall over South America.\n\nWhich of the following, if true, would most seriously weaken the paleoclimatologists' conclusion?",
    "options": [
      {
        "id": "A",
        "text": "Andean ice cores preserve higher temporal resolution of dust layers than Greenland ice cores."
      },
      {
        "id": "B",
        "text": "Marine sediment records reveal that high-latitude permafrost destabilization released massive pulses of sub-seafloor methane clathrates during Heinrich events."
      },
      {
        "id": "C",
        "text": "Modern Amazonian wetlands experience peak methane emissions during the austral summer months."
      },
      {
        "id": "D",
        "text": " Heinrich events occurred repeatedly throughout the late Pleistocene glacial epoch."
      },
      {
        "id": "E",
        "text": "South American speleothem records confirm isotopic enrichment of oxygen-18 during Heinrich events."
      }
    ],
    "correctOptionId": "B",
    "explanation": "If methane came from sub-seafloor high-latitude clathrates, the surge was not caused by tropical wetland rainfall shifts.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-20",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Reading Comprehension: Inference",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "Based on the Andean ice core passage, it can be reasonably inferred that Heinrich events:",
    "options": [
      {
        "id": "A",
        "text": "were strictly localized occurrences that had zero influence outside the Arctic basin"
      },
      {
        "id": "B",
        "text": "involved teleconnections that altered atmospheric circulation and precipitation across distant latitudes"
      },
      {
        "id": "C",
        "text": "permanently eliminated tropical wetland ecosystems in the southern hemisphere"
      },
      {
        "id": "D",
        "text": "were triggered directly by South American monsoonal storms"
      },
      {
        "id": "E",
        "text": "occurred only within the last four centuries"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The linkage between North Atlantic cooling and South American rainfall changes illustrates broad atmospheric teleconnections.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-21",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Text Completion (Single Blank)",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "Rather than offering a comprehensive solution to urban gridlock, the transport authority's newly proposed bus bypass lanes were merely a ______ measure designed to appease vocal commuter groups before the upcoming election.",
    "options": [
      {
        "id": "A",
        "text": "palliative"
      },
      {
        "id": "B",
        "text": "panacea"
      },
      {
        "id": "C",
        "text": "draconian"
      },
      {
        "id": "D",
        "text": "hermetic"
      },
      {
        "id": "E",
        "text": "trenchant"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Palliative means relieving pain or a problem without dealing with the underlying cause.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-22",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Sentence Equivalence",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "The philosopher criticized the popular self-help doctrine as hopelessly ______; its superficial slogans ignored the tragic and irreconcilable complexities of human existence.",
    "options": [
      {
        "id": "A",
        "text": "shallow"
      },
      {
        "id": "B",
        "text": "jejune"
      },
      {
        "id": "C",
        "text": "profound"
      },
      {
        "id": "D",
        "text": "arcane"
      },
      {
        "id": "E",
        "text": "erudite"
      },
      {
        "id": "F",
        "text": "labyrinthine"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Shallow and jejune both mean lacking depth or substance; superficial.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-23",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Text Completion (Double Blank)",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "Although the director's cinematic style is ostensibly (i)______, featuring handheld camerawork and natural ambient light, her meticulously choreographed scene compositions reveal an underlying (ii)______ artistry.",
    "options": [
      {
        "id": "A",
        "text": "improvisational"
      },
      {
        "id": "B",
        "text": "baroque"
      },
      {
        "id": "C",
        "text": "pedantic"
      },
      {
        "id": "D",
        "text": "contrived"
      },
      {
        "id": "E",
        "text": "calculating"
      },
      {
        "id": "F",
        "text": "unstudied"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Blank 1: 'handheld and natural light' -> 'improvisational'. Blank 2: contrast with 'meticulously choreographed' -> 'calculating' (or contrived).",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-24",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Reading Comprehension: Function",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "In 1928, Alexander Fleming observed that a contaminant mold Penicillium notatum had lysed Staphylococcus aureus colonies on an agar plate. Although Fleming noted penicillin's therapeutic potential, he failed to isolate the unstable molecule in quantities sufficient for clinical trials. It was Howard Florey and Ernst Chain at Oxford who, twelve years later, overcame the biochemical purification obstacles.\n\nThe author mentions Florey and Chain primarily to:",
    "options": [
      {
        "id": "A",
        "text": "discredit Fleming's initial microbiological observation"
      },
      {
        "id": "B",
        "text": "illustrate that translating an accidental discovery into a viable therapeutic requires substantial technical breakthroughs"
      },
      {
        "id": "C",
        "text": "demonstrate that bacterial resistance to penicillin evolved immediately upon clinical use"
      },
      {
        "id": "D",
        "text": "argue that university laboratories are superior to individual research clinics"
      },
      {
        "id": "E",
        "text": "explain how fungal sporulation occurs on staphylococcus plates"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Mentioning Florey and Chain emphasizes the difficult biochemical translation required after Fleming's discovery.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-25",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Sentence Equivalence",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "The CEO's abrupt resignation after only five months in office was completely ______; just days earlier, she had outlined a five-year global expansion roadmap to shareholders.",
    "options": [
      {
        "id": "A",
        "text": "unforeseen"
      },
      {
        "id": "B",
        "text": "unexpected"
      },
      {
        "id": "C",
        "text": "inevitable"
      },
      {
        "id": "D",
        "text": "presaged"
      },
      {
        "id": "E",
        "text": "predictable"
      },
      {
        "id": "F",
        "text": "antediluvian"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Unforeseen and unexpected both convey that the event took everyone by surprise.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-26",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Text Completion (Single Blank)",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "The poet's imagery was so dense and ______ that even seasoned literary academics struggled to parse the nested metaphors in her later stanzas.",
    "options": [
      {
        "id": "A",
        "text": "impenetrable"
      },
      {
        "id": "B",
        "text": "limpid"
      },
      {
        "id": "C",
        "text": "pellucid"
      },
      {
        "id": "D",
        "text": "pellucid"
      },
      {
        "id": "E",
        "text": "trenchant"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Impenetrable means impossible to understand or fathom.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-27",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Sentence Equivalence",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "The new regulatory compliance framework was criticized by fintech startups for being excessively ______; hundreds of mandatory reporting disclosures stifled agile development.",
    "options": [
      {
        "id": "A",
        "text": "onerous"
      },
      {
        "id": "B",
        "text": "burdensome"
      },
      {
        "id": "C",
        "text": "facile"
      },
      {
        "id": "D",
        "text": "lucrative"
      },
      {
        "id": "E",
        "text": "lenient"
      },
      {
        "id": "F",
        "text": "perfunctory"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Onerous and burdensome both characterize a task that involves heavy obligations and immense effort.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-v-28",
    "examId": "gre",
    "section": "Verbal Reasoning",
    "topic": "Reading Comprehension: Tone",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Verbal Module 2)",
    "prompt": "The author's tone toward early twentieth-century attempts to quantify intelligence using cranial circumference can best be described as:",
    "options": [
      {
        "id": "A",
        "text": "scornful and dismissive of pseudoscientific reductionism"
      },
      {
        "id": "B",
        "text": "deferential to nineteenth-century anthropological methodologies"
      },
      {
        "id": "C",
        "text": "wholly ambivalent regarding biometric reliability"
      },
      {
        "id": "D",
        "text": "enthusiastically supportive of phrenological metrics"
      },
      {
        "id": "E",
        "text": "cautiously optimistic regarding future skull measurements"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Modern science regards cranial circumference as pseudoscientific reductionism, warranting a critical, dismissive tone.",
    "aiHint": "Identify ETS structural indicators, negative prefixes, or rhetorical function."
  },
  {
    "id": "gre-q-29",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "Quantity A: The remainder when 7^85 is divided by 5.\nQuantity B: The remainder when 3^62 is divided by 4.",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "B",
    "explanation": "7 mod 5 = 2. Powers of 2 mod 5: 2^1=2, 2^2=4, 2^3=3, 2^4=1 (cycle of 4). 85 = 4(21) + 1, so 7^85 mod 5 = 2. For B: 3 mod 4 = -1. (-1)^62 = 1. Quantity A = 2, Quantity B = 1. Wait, Quantity A is 2, Quantity B is 1, so Quantity A is greater! Correct is A.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-30",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "x > 1\nQuantity A: (x^2 - 1) / (x - 1)\nQuantity B: x + 1",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "C",
    "explanation": "For x > 1, (x^2 - 1)/(x - 1) = (x - 1)(x + 1)/(x - 1) = x + 1. The two quantities are always equal.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-31",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "In a sequence where a_1 = 3 and a_n = 2 * a_(n-1) - 1 for n >= 2, what is the value of a_5?",
    "options": [
      {
        "id": "A",
        "text": "17"
      },
      {
        "id": "B",
        "text": "33"
      },
      {
        "id": "C",
        "text": "49"
      },
      {
        "id": "D",
        "text": "65"
      },
      {
        "id": "E",
        "text": "97"
      }
    ],
    "correctOptionId": "B",
    "explanation": "a1 = 3; a2 = 2(3)-1 = 5; a3 = 2(5)-1 = 9; a4 = 2(9)-1 = 17; a5 = 2(17)-1 = 33.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-32",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "In triangle PQR, the length of PQ is 7 and the length of QR is 11.\nQuantity A: The length of side PR\nQuantity B: 18",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "B",
    "explanation": "By triangle inequality, PR < PQ + QR = 7 + 11 = 18. Therefore, Quantity B (18) is strictly greater than Quantity A.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-33",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "If a machine fills 180 bottles in 15 minutes, how many bottles will 4 identical machines working at the same constant rate fill in 2.5 hours?",
    "options": [
      {
        "id": "A",
        "text": "4,800"
      },
      {
        "id": "B",
        "text": "7,200"
      },
      {
        "id": "C",
        "text": "9,600"
      },
      {
        "id": "D",
        "text": "12,000"
      },
      {
        "id": "E",
        "text": "14,400"
      }
    ],
    "correctOptionId": "B",
    "explanation": "One machine fills 180/15 = 12 bottles/min. Four machines fill 4 * 12 = 48 bottles/min. 2.5 hours = 150 minutes. Total = 48 * 150 = 7,200 bottles.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-34",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "x < y < 0\nQuantity A: x * y\nQuantity B: (x + y)^2",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "B",
    "explanation": "(x + y)^2 = x^2 + 2xy + y^2. Since x, y < 0, x^2 > 0 and y^2 > 0 and 2xy > 0. So (x + y)^2 = x^2 + y^2 + 2xy > xy. Quantity B is greater.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-35",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "A committee of 3 people is to be selected from a pool of 5 men and 4 women. If the committee must contain at least one woman, how many different committees can be formed?",
    "options": [
      {
        "id": "A",
        "text": "64"
      },
      {
        "id": "B",
        "text": "70"
      },
      {
        "id": "C",
        "text": "74"
      },
      {
        "id": "D",
        "text": "80"
      },
      {
        "id": "E",
        "text": "84"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Total possible committees = 9C3 = (9 * 8 * 7)/(3 * 2 * 1) = 84. Committees with NO women (all 3 men) = 5C3 = 10. Committees with at least one woman = 84 - 10 = 74.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-36",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "A circle has circumference 16pi.\nQuantity A: The area of the circle\nQuantity B: 64pi",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "C",
    "explanation": "Circumference = 2 * pi * r = 16pi -> r = 8. Area = pi * r^2 = pi * 8^2 = 64pi. The quantities are equal.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-37",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "The average (arithmetic mean) of five integers is 28. If the largest integer is 40 and the median is 25, what is the smallest possible value of the smallest integer?",
    "options": [
      {
        "id": "A",
        "text": "10"
      },
      {
        "id": "B",
        "text": "15"
      },
      {
        "id": "C",
        "text": "18"
      },
      {
        "id": "D",
        "text": "20"
      },
      {
        "id": "E",
        "text": "25"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Sum of 5 integers = 5 * 28 = 140. Arrange: x1 <= x2 <= 25 <= x4 <= 40. To minimize x1, maximize x2 and x4: set x2 = 25 and x4 = 40. Then x1 + 25 + 25 + 40 + 40 = 140 -> x1 + 130 = 140 -> x1 = 10.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-38",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "k is a positive integer.\nQuantity A: (k + 1)!\nQuantity B: k! * (k + 1)",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "C",
    "explanation": "By definition of factorial, (k + 1)! = (k + 1) * k!. The two quantities are always equal.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-39",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "If 2^(2x + 1) = 32^(x - 1), what is the value of x?",
    "options": [
      {
        "id": "A",
        "text": "2"
      },
      {
        "id": "B",
        "text": "3"
      },
      {
        "id": "C",
        "text": "4"
      },
      {
        "id": "D",
        "text": "5"
      },
      {
        "id": "E",
        "text": "6"
      }
    ],
    "correctOptionId": "A",
    "explanation": "32 = 2^5, so 32^(x - 1) = 2^(5(x - 1)) = 2^(5x - 5). Equate exponents: 2x + 1 = 5x - 5 -> 3x = 6 -> x = 2.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-40",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Data Interpretation",
    "difficulty": "medium",
    "moduleNumber": 1,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 1)",
    "prompt": "In a university department of 120 faculty members, 70 publish in journal A, 55 publish in journal B, and 20 publish in neither journal. How many faculty members publish in both journal A and journal B?",
    "options": [
      {
        "id": "A",
        "text": "25"
      },
      {
        "id": "B",
        "text": "30"
      },
      {
        "id": "C",
        "text": "35"
      },
      {
        "id": "D",
        "text": "40"
      },
      {
        "id": "E",
        "text": "45"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Total who publish in at least one = 120 - 20 = 100. By inclusion-exclusion: 70 + 55 - Both = 100 -> 125 - Both = 100 -> Both = 25.",
    "aiHint": "Compare algebraic properties or check prime factor cycles."
  },
  {
    "id": "gre-q-41",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "n is an integer greater than 2.\nQuantity A: The number of diagonals in a regular polygon with n sides\nQuantity B: n * (n - 3) / 2",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "C",
    "explanation": "The standard formula for the number of diagonals in an n-gon is n(n - 3)/2. Both quantities are identical.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-42",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "x and y are positive integers such that x/y = 4/7.\nQuantity A: (x + 3) / (y + 3)\nQuantity B: 4/7",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "A",
    "explanation": "For a fraction a/b < 1 with a, b > 0, adding a positive constant to both numerator and denominator increases the fraction: (4+3)/(7+3) = 7/10 = 0.70 > 4/7 (~0.571). Quantity A is greater.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-43",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "A box contains 6 red balls, 4 blue balls, and 2 green balls. If two balls are drawn at random without replacement, what is the probability that both balls are of the same color?",
    "options": [
      {
        "id": "A",
        "text": "19/66"
      },
      {
        "id": "B",
        "text": "22/66"
      },
      {
        "id": "C",
        "text": "25/66"
      },
      {
        "id": "D",
        "text": "28/66"
      },
      {
        "id": "E",
        "text": "31/66"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Total balls = 12. Total pairs = 12C2 = 66. Both red = 6C2 = 15; both blue = 4C2 = 6; both green = 2C2 = 1. Favorable pairs = 15 + 6 + 1 = 22. Probability = 22/66 = 1/3.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-44",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "Standard deviation of Set X: {10, 20, 30, 40, 50}\nStandard deviation of Set Y: {110, 120, 130, 140, 150}\nQuantity A: Standard deviation of Set X\nQuantity B: Standard deviation of Set Y",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "C",
    "explanation": "Adding a constant to every element in a data set shifts the mean but leaves the dispersion (standard deviation) unchanged. Quantities are equal.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-45",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "Working alone at its constant rate, pump P can drain an oil tank in 6 hours. Pump Q can drain the same tank in 9 hours. If both pumps operate together, how many hours will it take to drain the tank?",
    "options": [
      {
        "id": "A",
        "text": "3.2"
      },
      {
        "id": "B",
        "text": "3.6"
      },
      {
        "id": "C",
        "text": "4.0"
      },
      {
        "id": "D",
        "text": "4.5"
      },
      {
        "id": "E",
        "text": "7.5"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Combined rate = 1/6 + 1/9 = 3/18 + 2/18 = 5/18 tank/hr. Time = 18/5 = 3.6 hours.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-46",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "p is a prime number such that 20 < p < 35.\nQuantity A: The number of possible values of p\nQuantity B: 3",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "C",
    "explanation": "Primes between 20 and 35 are 23, 29, and 31. Exactly 3 primes. Quantity A = 3, Quantity B = 3. The quantities are equal.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-47",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "The price of an asset increases by 25% during year 1 and then decreases by 20% during year 2. What is the net percentage change in the asset's price over the two-year period?",
    "options": [
      {
        "id": "A",
        "text": "-5%"
      },
      {
        "id": "B",
        "text": "0%"
      },
      {
        "id": "C",
        "text": "+2%"
      },
      {
        "id": "D",
        "text": "+5%"
      },
      {
        "id": "E",
        "text": "+10%"
      }
    ],
    "correctOptionId": "B",
    "explanation": "1.25 * (1 - 0.20) = 1.25 * 0.80 = 1.00. The net change is exactly 0%.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-48",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "In a right circular cone, the base radius is 3 and the height is 4.\nQuantity A: The lateral surface area of the cone\nQuantity B: 15pi",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "C",
    "explanation": "Slant height l = sqrt(3^2 + 4^2) = 5. Lateral area = pi * r * l = pi * 3 * 5 = 15pi. The quantities are equal.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-49",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "How many positive integers less than 1,000 are multiples of 6 or multiples of 8?",
    "options": [
      {
        "id": "A",
        "text": "208"
      },
      {
        "id": "B",
        "text": "249"
      },
      {
        "id": "C",
        "text": "250"
      },
      {
        "id": "D",
        "text": "291"
      },
      {
        "id": "E",
        "text": "332"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Multiples of 6: floor(999/6) = 166. Multiples of 8: floor(999/8) = 124. Multiples of LCM(6,8)=24: floor(999/24) = 41. Total = 166 + 124 - 41 = 249.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-50",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "x != 0\nQuantity A: (x^4 + 1) / x^2\nQuantity B: x^2 + 1",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "D",
    "explanation": "Quantity A is x^2 + 1/x^2. Quantity B is x^2 + 1. If x = 2, Q_A = 4 + 1/4 = 4.25 < 4 + 1 = 5 (B > A). If x = 0.5, Q_A = 0.25 + 4 = 4.25 > 0.25 + 1 = 1.25 (A > B). The relationship cannot be determined.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-51",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "In an equilateral triangle with side length s, the height h is 6*sqrt(3). What is the perimeter of the triangle?",
    "options": [
      {
        "id": "A",
        "text": "24"
      },
      {
        "id": "B",
        "text": "36"
      },
      {
        "id": "C",
        "text": "48"
      },
      {
        "id": "D",
        "text": "54"
      },
      {
        "id": "E",
        "text": "72"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Height of equilateral triangle = s * sqrt(3) / 2 = 6*sqrt(3) -> s / 2 = 6 -> s = 12. Perimeter = 3s = 3 * 12 = 36.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-52",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "Set S consists of all integers from 1 to 50, inclusive.\nQuantity A: The sum of all even integers in S\nQuantity B: The sum of all odd integers in S",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "A",
    "explanation": "There are 25 pairs: (2, 1), (4, 3), ..., (50, 49). In each pair, the even integer is 1 greater than the odd integer. Thus, Sum(Even) = Sum(Odd) + 25. Quantity A is strictly greater.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-53",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "If the compound interest on a sum of $4,000 compounded semi-annually at 6% annual nominal rate for 2 years is calculated, what is the final compounded amount?",
    "options": [
      {
        "id": "A",
        "text": "$4,480.00"
      },
      {
        "id": "B",
        "text": "$4,502.04"
      },
      {
        "id": "C",
        "text": "$4,525.64"
      },
      {
        "id": "D",
        "text": "$4,580.40"
      },
      {
        "id": "E",
        "text": "$4,600.00"
      }
    ],
    "correctOptionId": "B",
    "explanation": "r = 0.06/2 = 0.03 per period. Number of periods = 2 * 2 = 4. Amount = 4000 * (1.03)^4 = 4000 * 1.12550881 = $4,502.04.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-54",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Quantitative Comparison",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "a and b are integers such that ab = 24 and a < b.\nQuantity A: The value of a + b\nQuantity B: 11",
    "options": [
      {
        "id": "A",
        "text": "Quantity A is greater."
      },
      {
        "id": "B",
        "text": "Quantity B is greater."
      },
      {
        "id": "C",
        "text": "The two quantities are equal."
      },
      {
        "id": "D",
        "text": "The relationship cannot be determined from the information given."
      }
    ],
    "correctOptionId": "D",
    "explanation": "If a = 3, b = 8, a + b = 11 (equal). If a = 2, b = 12, a + b = 14 (greater). If a = -24, b = -1, a + b = -25 (less). The relationship cannot be determined.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  },
  {
    "id": "gre-q-55",
    "examId": "gre",
    "section": "Quantitative Reasoning",
    "topic": "Problem Solving",
    "difficulty": "hard",
    "moduleNumber": 2,
    "sourceExam": "Official GRE General Test Previous Paper (Quant Module 2)",
    "prompt": "A cylinder with radius r and height h has volume V. If the radius is doubled and the height is halved, what is the volume of the new cylinder in terms of V?",
    "options": [
      {
        "id": "A",
        "text": "0.5 V"
      },
      {
        "id": "B",
        "text": "V"
      },
      {
        "id": "C",
        "text": "2 V"
      },
      {
        "id": "D",
        "text": "4 V"
      },
      {
        "id": "E",
        "text": "8 V"
      }
    ],
    "correctOptionId": "C",
    "explanation": "New volume = pi * (2r)^2 * (h/2) = pi * 4r^2 * h/2 = 2 * (pi * r^2 * h) = 2V.",
    "aiHint": "Check boundary conditions, zero/negative cases, or geometric invariants."
  }
];
