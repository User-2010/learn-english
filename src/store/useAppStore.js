import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialVocabulary = [
  {"id": 1, "word": "Resilience", "ipa": "/rɪˈzɪl.jəns/", "translation": "Устойчивость, жизнестойкость", "level": "B2", "example": "She showed great resilience in difficult times.", "is_favorite": true},
  {"id": 2, "word": "Curious", "ipa": "/ˈkjʊə.ri.əs/", "translation": "Любопытный", "level": "A2", "example": "I was curious to know what happened.", "is_favorite": false},
  {"id": 3, "word": "Enhance", "ipa": "/ɪnˈhɑːns/", "translation": "Улучшать, усиливать", "level": "B1", "example": "This software will enhance your productivity.", "is_favorite": true},
  {"id": 4, "word": "Ubiquitous", "ipa": "/juːˈbɪk.wɪ.təs/", "translation": "Вездесущий, повсеместный", "level": "C1", "example": "Smartphones have become ubiquitous in modern society.", "is_favorite": false},
  {"id": 5, "word": "Mitigate", "ipa": "/ˈmɪt.ɪ.ɡeɪt/", "translation": "Смягчать, уменьшать (ущерб)", "level": "C1", "example": "Measures were taken to mitigate the environmental impact.", "is_favorite": true},
  {"id": 6, "word": "Pragmatic", "ipa": "/præɡˈmæt.ɪk/", "translation": "Прагматичный, практичный", "level": "B2", "example": "We need a pragmatic approach to solve this problem.", "is_favorite": false},
  {"id": 7, "word": "Ambiguous", "ipa": "/æmˈbɪɡ.ju.əs/", "translation": "Двусмысленный, неясный", "level": "B2", "example": "His instructions were somewhat ambiguous.", "is_favorite": false},
  {"id": 8, "word": "Comprehensive", "ipa": "/ˌkɒm.prɪˈhen.sɪv/", "translation": "Всесторонний, комплексный", "level": "B2", "example": "We provide a comprehensive guide for developers.", "is_favorite": true},
  {"id": 9, "word": "Advocate", "ipa": "/ˈæd.və.keɪt/", "translation": "Поддерживать, выступать в защиту", "level": "B2", "example": "She advocates for sustainable energy policies.", "is_favorite": false},
  {"id": 10, "word": "Scrutinize", "ipa": "/ˈskruː.tɪ.naɪz/", "translation": "Тщательно изучать, подвергать проверке", "level": "C1", "example": "The committee will scrutinize the financial report.", "is_favorite": true},
  {"id": 11, "word": "Deteriorate", "ipa": "/dɪˈtɪə.ri.ə.reɪt/", "translation": "Ухудшаться, портить", "level": "B2", "example": "Relations between the two countries began to deteriorate.", "is_favorite": false},
  {"id": 12, "word": "Inherent", "ipa": "/ɪnˈher.ənt/", "translation": "Присущий, неотъемлемый", "level": "C1", "example": "Risk is an inherent part of investing.", "is_favorite": false},
  {"id": 13, "word": "Pivotal", "ipa": "/ˈpɪv.ə.təl/", "translation": "Ключевой, поворотный", "level": "C1", "example": "This discovery marked a pivotal moment in medicine.", "is_favorite": true},
  {"id": 14, "word": "Arbitrary", "ipa": "/ˈɑː.bɪ.trər.i/", "translation": "Произвольный, случайный", "level": "C1", "example": "The decision seemed completely arbitrary.", "is_favorite": false},
  {"id": 15, "word": "Fostering", "ipa": "/ˈfɒs.tər.ɪŋ/", "translation": "Способствующий развитию, поощряющий", "level": "B2", "example": "Fostering creativity is essential in education.", "is_favorite": false},
  {"id": 16, "word": "Innovation", "ipa": "/innovation/", "translation": "Инновация", "level": "C1", "example": "Technological innovation drives market growth.", "is_favorite": false},
  {"id": 17, "word": "Efficiency", "ipa": "/efficiency/", "translation": "Эффективность", "level": "B2", "example": "We strive for operational efficiency.", "is_favorite": false},
  {"id": 18, "word": "Autonomous", "ipa": "/autonomous/", "translation": "Автономный", "level": "C1", "example": "Autonomous vehicles require advanced AI.", "is_favorite": false},
  {"id": 19, "word": "Eradicate", "ipa": "/eradicate/", "translation": "Искоренять", "level": "C1", "example": "Efforts to eradicate poverty continue globally.", "is_favorite": false},
  {"id": 20, "word": "Substantial", "ipa": "/substantial/", "translation": "Существенный, значительный", "level": "B2", "example": "There has been a substantial increase in sales.", "is_favorite": true},
  {"id": 21, "word": "Feasible", "ipa": "/feasible/", "translation": "Осуществимый, выполнимый", "level": "B2", "example": "The project plan is financially feasible.", "is_favorite": false},
  {"id": 22, "word": "Eminent", "ipa": "/eminent/", "translation": "Выдающийся, знаменитый", "level": "C1", "example": "An eminent scientist delivered the keynote speech.", "is_favorite": false},
  {"id": 23, "word": "Elicit", "ipa": "/elicit/", "translation": "Вызывать,влекать (реакцию)", "level": "C1", "example": "The survey failed to elicit clear responses.", "is_favorite": false},
  {"id": 24, "word": "Alleviate", "ipa": "/alleviate/", "translation": "Облегчать (боль, проблему)", "level": "C1", "example": "New medications help alleviate chronic pain.", "is_favorite": false},
  {"id": 25, "word": "Bolster", "ipa": "/bolster/", "translation": "Укреплять, поддерживать", "level": "C1", "example": "The campaign aims to bolster public confidence.", "is_favorite": true},
  {"id": 26, "word": "Candid", "ipa": "/candid/", "translation": "Откровенный, искренний", "level": "B2", "example": "We had a candid discussion about the budget.", "is_favorite": false},
  {"id": 27, "word": "Discrepancy", "ipa": "/discrepancy/", "translation": "Расхождение, несоответствие", "level": "C1", "example": "There is a discrepancy between the two reports.", "is_favorite": false},
  {"id": 28, "word": "Emulate", "ipa": "/emulate/", "translation": "Подражать, имитировать", "level": "C1", "example": "Startups try to emulate successful tech giants.", "is_favorite": false},
  {"id": 29, "word": "Flourish", "ipa": "/flourish/", "translation": "Процветать, преуспевать", "level": "B2", "example": "Local businesses continue to flourish.", "is_favorite": false},
  {"id": 30, "word": "Gargantuan", "ipa": "/gargantuan/", "translation": "Громадный, гигантский", "level": "C1", "example": "Building the bridge was a gargantuan task.", "is_favorite": true},
  {"id": 31, "word": "Hypothesis", "ipa": "/hypothesis/", "translation": "Гипотеза", "level": "B2", "example": "Scientists tested the hypothesis in lab conditions.", "is_favorite": false},
  {"id": 32, "word": "Impediment", "ipa": "/impediment/", "translation": "Препятствие, помеха", "level": "C1", "example": "Lack of funding is a major impediment.", "is_favorite": false},
  {"id": 33, "word": "Juxtapose", "ipa": "/juxtapose/", "translation": "Сопоставлять (противопоставляя)", "level": "C1", "example": "The exhibition juxtaposes modern and classical art.", "is_favorite": false},
  {"id": 34, "word": "Kinetic", "ipa": "/kinetic/", "translation": "Кинетический, движущийся", "level": "B2", "example": "Kinetic energy converts into electrical power.", "is_favorite": false},
  {"id": 35, "word": "Lucrative", "ipa": "/lucrative/", "translation": "Прибыльный, выгодный", "level": "B2", "example": "Real estate can be a lucrative investment.", "is_favorite": true},
  {"id": 36, "word": "Meticulous", "ipa": "/meticulous/", "translation": "Тщательный, скрупулезный", "level": "C1", "example": "She is meticulous about code quality and testing.", "is_favorite": false},
  {"id": 37, "word": "Nostalgia", "ipa": "/nostalgia/", "translation": "Ностальгия", "level": "B2", "example": "Old photos often evoke a strong sense of nostalgia.", "is_favorite": false},
  {"id": 38, "word": "Ostracize", "ipa": "/ostracize/", "translation": "Бойкотировать, изгонять", "level": "C1", "example": "He was ostracized by his peers for breaking rules.", "is_favorite": false},
  {"id": 39, "word": "Pertain", "ipa": "/pertain/", "translation": "Относиться, иметь отношение", "level": "C1", "example": "Regulations that pertain to data privacy.", "is_favorite": false},
  {"id": 40, "word": "Quaint", "ipa": "/quaint/", "translation": "Причудливый, старомодный", "level": "B2", "example": "They stayed in a quaint little village in France.", "is_favorite": true},
  {"id": 41, "word": "Relinquish", "ipa": "/relinquish/", "translation": "Отказываться, уступать", "level": "C1", "example": "He had to relinquish control of the company.", "is_favorite": false},
  {"id": 42, "word": "Skeptical", "ipa": "/skeptical/", "translation": "Скептический", "level": "B2", "example": "Investors remained skeptical about the new product.", "is_favorite": false},
  {"id": 43, "word": "Tangible", "ipa": "/tangible/", "translation": "Осязаемый, реальный", "level": "B2", "example": "We need tangible results by the end of the quarter.", "is_favorite": false},
  {"id": 44, "word": "Unprecedented", "ipa": "/unprecedented/", "translation": "Беспрецедентный", "level": "C1", "example": "The company experienced unprecedented growth.", "is_favorite": false},
  {"id": 45, "word": "Vindicated", "ipa": "/vindicated/", "translation": "Оправданный, реабилитированный", "level": "C1", "example": "His research was eventually vindicated by peers.", "is_favorite": true},
  {"id": 46, "word": "Warrant", "ipa": "/warrant/", "translation": "Оправдывать, гарантировать", "level": "C1", "example": "The situation does not warrant panic.", "is_favorite": false},
  {"id": 47, "word": "Zeal", "ipa": "/zeal/", "translation": "Рвение, энтузиазм", "level": "C1", "example": "He approached his new role with great zeal.", "is_favorite": false}
];

export const useAppStore = create(
  persist(
    (set) => ({
      user: { name: 'Learner', email: 'learner@wordly.local' },
      vocabulary: initialVocabulary,
      progress: {
        wordsLearned: initialVocabulary.length,
        speakingMinutes: 45,
        listeningCompleted: 12,
        writingEntries: 6
      },
      addWord: (word) => set((state) => ({
        vocabulary: [{ id: Date.now(), ...word }, ...state.vocabulary],
        progress: { ...state.progress, wordsLearned: state.progress.wordsLearned + 1 }
      })),
      toggleFavorite: (id) => set((state) => ({
        vocabulary: state.vocabulary.map(w => w.id === id ? { ...w, is_favorite: !w.is_favorite } : w)
      })),
      deleteWord: (id) => set((state) => ({
        vocabulary: state.vocabulary.filter(w => w.id !== id)
      })),
      addProgress: (key, val) => set((state) => ({
        progress: { ...state.progress, [key]: state.progress[key] + val }
      }))
    }),
    { name: 'wordly-storage' }
  )
)