import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { Chirps } from '../resources/data/chirps';
import { Users } from '../resources/data/users';

@inject(Router, AuthService, Chirps, Users)
export class Wall {
  constructor(router, auth, chirps, users) {
    this.router = router;
    this.auth = auth;
    this.chirps = chirps;
    this.users = users;
    this.message = 'Chirps';
    this.newChirp;
    this.saveStatus = "";
  }

  async activate() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.users.setUser(this.user);
    let serverResponse = await this.chirps.getUsersChirps(this.user._id);
    if (serverResponse.error) {
      this.wallMessage = "Error retrieving chirps";
    }
  }


  async findUser() {
    let serverResponse = await this.users.getPersonScreenName(this.searchScreenName);
    this.notMe = true;
    if (serverResponse && !serverResponse.error) {
      let response = await this.chirps.getUsersChirps(serverResponse._id);
      if (response.error) {
        this.wallMessage = "Error retrieving chirps";
      }
    }
  }



  async chirp() {
    if (this.newChirp) {
      var chirp = {
        chirp: this.newChirp,
        user: this.user._id,
        chirpAuthor: this.user._id
      }
      let serverResponse = await this.chirps.saveChirp(chirp);
      if (serverResponse && !serverResponse.error) {
        this.newChirp = "";
        this.saveStatus = "";
        this.chirps.chirpArray[0].chirpAuthor = new Object();
        this.chirps.chirpArray[0].chirpAuthor.email = this.user.email;
      } else {
        this.saveStatus = "Error saving chirp";
      }
    }
  }


  like(index) {
    this.chirps.like(this.chirps.chirpArray[index]._id);
    this.chirps.chirpArray[index].likes++;
  }

  async reChirp(chirp) {
    var newChirp = {
      chirp: chirp.chirp,
      user: this.user._id,
      reChirp: true,
      chirpAuthor: chirp.chirpAuthor._id
    };

    let serverResponse = await this.chirps.saveChirp(newChirp);
    if (serverResponse && !serverResponse.error) {
      this.saveStatus = "";
      this.chirps.chirpArray[0].chirpAuthor = new Object();
      this.chirps.chirpArray[0].chirpAuthor = { email: this.user.email };
    } else {
      this.saveStatus = "Error saving chirp";
    }
  }

  async follow() {
    await this.users.followUser(this.user._id, this.users.selectedUser._id);
  }

  async home() {
    this.notMe = false;
    await this.chirps.getUsersChirps(this.user._id);
  }


  logout() {
    sessionStorage.removeItem('user');
    this.auth.logout();
  }
}

