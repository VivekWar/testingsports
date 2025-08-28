const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const formatDate = (date) => date.toISOString().split('T')[0];

export const chessMatchData = [
  // --- Live Matches ---
  {
    id: 1,
    status: 'live',
    date: formatDate(today),
    time: '14:30',
    competition: 'Candidates Tournament 2024',
    stage: 'Round 8',
    venue: 'The Great Hall, Toronto',
    player1: {
      name: 'Hikaru Nakamura',
    },
    player2: {
      name: 'Fabiano Caruana',
    },
    winner: null,
    result: null,
    liveStatus: 'White to move (24)',
  },
  {
    id: 2,
    status: 'live',
    date: formatDate(today),
    time: '15:00',
    competition: 'Tata Steel Masters',
    stage: 'Round 5',
    venue: 'Wijk aan Zee, Netherlands',
    player1: {
      name: 'Anish Giri',
    },
    player2: {
      name: 'Praggnanandhaa R',
    },
    winner: null,
    result: null,
    liveStatus: 'Black in check',
  },

  // --- Upcoming Matches ---
  {
    id: 3,
    status: 'upcoming',
    date: formatDate(tomorrow),
    time: '16:00',
    competition: 'Candidates Tournament 2024',
    stage: 'Round 9',
    venue: 'The Great Hall, Toronto',
    player1: {
      name: 'Gukesh D',
    },
    player2: {
      name: 'Alireza Firouzja',
    },
    winner: null,
    result: null,
    liveStatus: null,
  },
  {
    id: 4,
    status: 'upcoming',
    date: formatDate(tomorrow),
    time: '18:00',
    competition: 'Speed Chess Championship',
    stage: 'Quarter Final',
    venue: 'Online',
    player1: {
      name: 'Magnus Carlsen',
    },
    player2: {
      name: 'Wesley So',
    },
    winner: null,
    result: null,
    liveStatus: null,
  },

  // --- Finished Matches ---
  {
    id: 5,
    status: 'finished',
    date: formatDate(yesterday),
    time: '13:00',
    competition: 'World Chess Championship 2023',
    stage: 'Final - Game 14',
    venue: 'Astana, Kazakhstan',
    player1: {
      name: 'Ding Liren',
    },
    player2: {
      name: 'Ian Nepomniachtchi',
    },
    winner: 'Ding Liren',
    result: 'Won on time',
    liveStatus: null,
  },
  {
    id: 6,
    status: 'finished',
    date: '2024-04-15',
    time: '14:00',
    competition: 'Candidates Tournament 2024',
    stage: 'Round 7',
    venue: 'The Great Hall, Toronto',
    player1: {
      name: 'Vidit Gujrathi',
    },
    player2: {
      name: 'Hikaru Nakamura',
    },
    winner: 'Hikaru Nakamura',
    result: 'Won by resignation',
    liveStatus: null,
  },
  {
    id: 7,
    status: 'finished',
    date: '2024-01-20',
    time: '12:00',
    competition: 'Tata Steel Masters',
    stage: 'Round 10',
    venue: 'Wijk aan Zee, Netherlands',
    player1: {
      name: 'Max Warmerdam',
    },
    player2: {
      name: 'Jorden van Foreest',
    },
    winner: null,
    result: 'Match Drawn (1/2-1/2)',
    liveStatus: null,
  },
];