import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class TestProvider {

  private PATH = '/comments';
  constructor(public http: HttpClient, private db: AngularFireDatabase) {
    console.log('Hello TestProvider Provider');
  }

  getAll() {
    // return this.db.database.ref(this.PATH)
    return this.db.database.ref(this.PATH).on('value', (snapshot) => {
      snapshot.forEach((childItem) => {
        
      })
    })
  }


  save(comment: any) {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + '' + time
    return new Promise((resolve, reject) => {
      if (comment.key) {
        this.db.list(this.PATH)
          .update(comment.key, { comment: comment.comment, username: comment.username, rating: comment.rating, idComment: dateTime })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ comment: comment.comment, username: comment.username, rating: comment.rating, idComment: dateTime })
          .then(() => resolve());
      }
    })
  }

}
