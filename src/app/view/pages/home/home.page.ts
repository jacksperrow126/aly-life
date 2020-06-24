import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Quote } from '@core/models/quotes.model';
import { HomeService } from '@core/services/home.service';
import { Tag } from '@core/models/tag.model';
import { NoteService } from '@core/services/note.service';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
@Component({
  selector: 'aly-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public quote: Quote;
  private inAnimation = false;
  public greeting: string;
  private tags: Tag[];
  public url: any;
  @ViewChild('container', { static: true }) container: ElementRef;
  constructor(
    private homeService: HomeService,
    private noteService: NoteService,
    private router: Router,
    private imagePicker: ImagePicker,
    private webview: WebView) { }

  ngOnInit() {
    this.quote = this.homeService.getRandomQuote();
    this.getGreeting();
    this.tags = this.noteService.getTag();
  }

  getGreeting() {
    let date = new Date();
    this.greeting = this.homeService.getGreeting(date.getHours());
  }

  selectTag(tagName: string) {
    let selectedTag = this.tags.find(tag => {
      return tag.type == tagName;
    });
    setTimeout(() => {
      this.noteService.selectedTag = selectedTag;
      this.router.navigateByUrl('/note')
    }, 100)
  }
  picker() {
    this.imagePicker.getPictures({ maximumImagesCount: 1 }).then((results) => {
      let url;
      for (var i = 0; i < results.length; i++) {
        this.url = this.webview.convertFileSrc(results[i]);
      }
      alert(this.url)
    }, (err) => { });
  }
}
