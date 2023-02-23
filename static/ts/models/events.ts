/*
 * Event describing bookmark creation
 */
export function AddBookmark(url: string) {
  const now = new Date();
  const id = `urn:bookmark:${now.getTime()}`;

  return {
    source: "https://github.com/rgrannell1/borg/spec/bookmark.json",
    id,
    time: now.toISOString(),
    type: "xyz.rgrannell.bookmark.add.v1",
    specversion: "1.0",
    datacontenttype: "application/json",
    data: JSON.stringify({
      url,
      id,
      created_at: now.toISOString(),
    }),
  };
}

/*
 * Event describing bookmark relation creation + edits
 */
export function EditBookmarkRelations<T>(
  bookmark_id: string,
  relations: Record<string, T>,
) {
  const now = new Date();
  const id = `urn:bookmark_relations:${now.getTime()}`;

  return {
    source: "https://github.com/rgrannell1/borg/spec/edit_bookmark.json",
    id,
    time: now.toISOString(),
    type: "xyz.rgrannell.bookmark.edit.v1",
    specversion: "1.0",
    datacontenttype: "application/json",
    data: JSON.stringify({
      id,
      bookmark_id,
      relations,
      created_at: now.toISOString(),
    }),
  };
}
