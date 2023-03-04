
export class Assembler {
  static assembleBookmarks(events) {

    const bookmarks = [];
    for (const event of events) {
      if (event.type !== 'xyz.rgrannell.bookmark.add.v1') {
        continue;
      }

      const bookmark = JSON.parse(event.data);
      bookmarks.push(bookmark);
    }

    return bookmarks;
  }
}
