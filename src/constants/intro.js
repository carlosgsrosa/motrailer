import {images} from './';

const screens = [
  {
    id: 1,
    title: {
      text: 'Get the first',
      fontFamily: 'SFProDisplay-SemiBold',
    },
    description: {
      text: 'Movie & TV information',
      fontFamily: 'SFProDisplay-Ultralight',
    },
    image: images.background.durotan,
    button: {
      label: 'Next',
      borderWidth: '2px',
      backgroundColor: 'transparent',
    },
    dots: [100, 0.3, 0.3],
  },
  {
    id: 2,
    title: {
      text: 'Know the movie',
      fontFamily: 'SFProDisplay-Bold',
    },
    description: {
      text: 'is not worth Watching',
      fontFamily: 'SFProDisplay-Ultralight',
    },
    image: images.background.girl,
    button: {
      label: 'Next',
      borderWidth: '2px',
      backgroundColor: 'transparent',
    },
    dots: [0.3, 100, 0.3],
  },
  {
    id: 3,
    title: {
      text: 'Real-time ',
      fontFamily: 'SFProDisplay-Bold',
    },
    description: {
      text: 'updates movie Trailer',
      fontFamily: 'SFProDisplay-Ultralight',
    },
    image: images.background.couple,
    button: {
      label: 'Home',
      borderWidth: '0px',
      backgroundColor: '#EE7429',
    },
    dots: [0.3, 0.3, 100],
  },
];

export default screens;
