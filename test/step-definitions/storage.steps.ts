import { Then } from 'cucumber';
import { storage } from '../data-share/dataStorage';

Then('I will use shared data', () => {
  console.log('User logged in with email: ' + storage.loginEntity.email + ', and password ' + storage.loginEntity.password);
});