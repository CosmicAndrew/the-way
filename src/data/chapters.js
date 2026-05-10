import { Color, Vec3 } from 'playcanvas';

export const chapters = [
  {
    scripture: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    reference: 'John 1:1',
    cameraPos: new Vec3(0, 0, 30),
    cameraLookAt: new Vec3(0, 0, -20),
    ambientColor: new Color(0.02, 0.02, 0.08),
    fog: null,
  },
  {
    scripture: 'For unto you is born this day in the city of David a Saviour, which is Christ the Lord.',
    reference: 'Luke 2:11',
    cameraPos: new Vec3(0, 3, 15),
    cameraLookAt: new Vec3(0, 0.5, -5),
    ambientColor: new Color(0.08, 0.04, 0.01),
    fog: { type: 'linear', color: new Color(0.1, 0.05, 0.02), start: 10, end: 60 },
  },
  {
    scripture: 'This is my beloved Son, in whom I am well pleased.',
    reference: 'Matthew 3:17',
    cameraPos: new Vec3(0, 2, 12),
    cameraLookAt: new Vec3(0, -0.5, -5),
    ambientColor: new Color(0.02, 0.06, 0.1),
    fog: { type: 'linear', color: new Color(0.05, 0.1, 0.15), start: 15, end: 80 },
  },
  {
    scripture: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven.',
    reference: 'Matthew 5:3',
    cameraPos: new Vec3(0, 8, 25),
    cameraLookAt: new Vec3(0, 0, -10),
    ambientColor: new Color(0.08, 0.06, 0.04),
    fog: { type: 'linear', color: new Color(0.12, 0.08, 0.05), start: 20, end: 100 },
  },
  {
    scripture: 'A new commandment I give unto you, That ye love one another.',
    reference: 'John 13:34',
    cameraPos: new Vec3(0, 2.5, 10),
    cameraLookAt: new Vec3(0, 1, -3),
    ambientColor: new Color(0.1, 0.06, 0.02),
    fog: { type: 'linear', color: new Color(0.08, 0.04, 0.01), start: 5, end: 30 },
  },
  {
    scripture: 'For God so loved the world, that he gave his only begotten Son.',
    reference: 'John 3:16',
    cameraPos: new Vec3(0, 3, 20),
    cameraLookAt: new Vec3(0, 1, -5),
    ambientColor: new Color(0.06, 0.01, 0.01),
    fog: { type: 'exponential', color: new Color(0.02, 0.0, 0.0), density: 0.003 },
  },
  {
    scripture: 'I am he that liveth, and was dead; and, behold, I am alive for evermore.',
    reference: 'Revelation 1:18',
    cameraPos: new Vec3(0, 2, 12),
    cameraLookAt: new Vec3(0, 2, -5),
    ambientColor: new Color(0.3, 0.3, 0.35),
    fog: null,
  },
];

export const audioTracks = chapters.map((_, i) => `/audio/chapter-${i + 1}.mp3`);
