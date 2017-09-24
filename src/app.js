import '@/styles/index.styl';
import print from '@/helper/print';

const button = document.getElementById('awesome-stuff');

button.addEventListener('click', () => {
  print('Lexa Lox')
});
