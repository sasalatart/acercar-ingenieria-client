import axios from 'axios';

const announcements = {
  pinned: () => axios.get('/announcements/pinned'),
};

export default {
  announcements,
};
