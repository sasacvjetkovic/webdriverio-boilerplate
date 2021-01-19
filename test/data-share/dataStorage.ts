import { loginEntity } from './user/loginEntity';

class DataStorage {

    public get loginEntity() {
        return loginEntity;
    }

}

export let storage = new DataStorage();