import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';


@IonicPage()
@Component({
  selector: 'page-edit-record',
  templateUrl: 'edit-record.html',
})
export class EditRecordPage {

  data = {
    rowid: 0,
    date: "",
    type: "",
    category: "",
    description: "",
    amount: 0
  };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast
  ) {
    this.getCurrentData(navParams.get("rowid"));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecordPage');
  }

  getCurrentData(rowid): void {
    this.sqlite.create({
      name: 'finappcije.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM record WHERE rowid=?', [rowid])
        .then(res => {
          if (res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.date = res.rows.item(0).date;
            this.data.type = res.rows.item(0).type;
            this.data.category = res.rows.item(0).category;
            this.data.description = res.rows.item(0).description;
            this.data.amount = res.rows.item(0).amount;
          }
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  updateRecord(): void {
    this.sqlite.create({
      name: 'finappcije.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE record SET date=?,type=?,category=?,description=?,amount=? WHERE rowid=?',
        [this.data.date, this.data.type, this.data.category, this.data.description, this.data.amount, this.data.rowid])
        .then(res => {
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
