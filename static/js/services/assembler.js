export class Assembler {
  static assembleBookmarks(events) {
    const bookmarks = [];
    for (const event of events) {
      if (event.type !== "xyz.rgrannell.bookmark.add.v1") {
        continue;
      }

      const bookmark = JSON.parse(event.data);
      bookmarks.push(bookmark);
    }

    bookmarks.sort((left, right) => {
      const dateLeft = new Date(left.created_at).getTime();
      const dateRight = new Date(right.created_at).getTime();

      return dateLeft - dateRight;
    });

    return bookmarks;
  }
}
