export class Assembler {
  static assembleBookmarks(events) {
    const bookmarks = [];

    const idSet = new Set();

    for (const event of events) {
      if (event.type !== "xyz.rgrannell.bookmark.add.v1") {
        continue;
      }

      // bug workaround!
      const data = JSON.parse(event.data);
      if (idSet.has(data.id)) {
        continue;
      }

      bookmarks.push(data);
      idSet.add(data.id);
    }

    bookmarks.sort((left, right) => {
      const dateLeft = new Date(left.created_at).getTime();
      const dateRight = new Date(right.created_at).getTime();

      return dateLeft - dateRight;
    });

    return bookmarks;
  }
}
