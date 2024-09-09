import { makeAutoObservable } from "mobx";

class FormStore {
  username = "";
  email = "";
  password = "";

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username) {
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  reset() {
    this.username = "";
    this.email = "";
    this.password = "";
  }
}

const formStore = new FormStore();
export default formStore;
