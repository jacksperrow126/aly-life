import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Quote } from "@core/models/user/quotes.model";
import { HomeService } from "@core/services/home.service";
import { Tag } from "@core/models/note/tag.model";
import { NoteService } from "@core/services/note.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { User } from "@core/models/user/user.model";
import { UserService } from "@core/services/user.service";

@Component({
  selector: "aly-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  public quote: Quote;
  public greeting: string;
  private tags: Tag[];
  public user: User;
  @ViewChild("container", { static: true }) container: ElementRef;
  constructor(
    private homeService: HomeService,
    private noteService: NoteService,
    private router: Router,
    private store: Storage,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.quote = this.homeService.getRandomQuote();
    this.getGreeting();
    this.tags = this.noteService.getTag();
    this.userService.userChange.subscribe((data) => {
      this.user = data;
    });
    this.store.ready().then(() => {
      this.store.get("user").then((data) => {
        this.user = data;
      });
    });
  }

  getGreeting() {
    const date = new Date();
    this.greeting = this.homeService.getGreeting(date.getHours());
  }

  selectTag(tagName: string) {
    const selectedTag = this.tags.find((tag) => {
      return tag.type === tagName;
    });
    setTimeout(() => {
      this.noteService.selectedTag = selectedTag;
      this.router.navigateByUrl(`/${tagName}`);
    }, 100);
  }
}
