import diaryEntries from './entriesFront';

import { 
  NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry
 } from './typesFront';

 
const diaries: DiaryEntry[] = diaryEntries;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const diaryService = {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
};

export default diaryService;
