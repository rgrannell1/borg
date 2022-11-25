
const ENDPOINT = 'https://mycloud.rgrannell.xyz';

/*
 *
 */
class Status {
  static OK = 200;
  static UNAUTHORIZED = 401;
}

/*
 *
 */
class States {
  static OK = 'ok';
  static ERROR = 'error';
  static UNAUTHORIZED = 'unauthorized'
}

/*
 *
 */
class CommonStorageAPI {
  static TOPIC_BOOKMARKS = 'bookmarks'

  static async postContent(credentials, topic, content) {
    try {
      const body = JSON.stringify({
        content: [ content ]
      });
      const res = await fetch(`${ENDPOINT}/content/${topic}`, {
        method: 'post',
        mode: 'cors',
        headers: new Headers({
          'content-type': 'application/json',
          authorization: `Basic ${ btoa(credentials.username + ':' + credentials.password) }`
        }),
        body
      });

      const status = res.status;

      if (status === Status.UNAUTHORIZED) {
        return {
          state: States.UNAUTHORIZED
        }
      } else if (status === Status.OK) {
        return {
          state: States.OK
        }
      } else {
        return {
          state: States.ERROR
        }
      }
    } catch (err) {
      console.error(err);
      return {
        state: States.ERROR
      }
    }
  }
}

/*
 *
 */
class Specs {
  static Bookmark(url) {
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
      })
    }
  }
}

/*
 *
 */
class Button {
  static TEXT = 'Assimilate';
  static TEXT_OK = 'Assimilated!';
  static TEXT_ERROR = 'Failed!';
  static TEXT_UNAUTHORIZED = 'Not Authorised';

  static CLASS_OK = 'button-ok';
  static CLASS_UNAUTHORIZED = 'button-unauthorized';
  static CLASS_ERROR = 'button-error';

  static TIMEOUT = 3_000;

  static element() {
    return document.querySelector('#borg-submit');
  }

  static setState(state) {
    if (state === States.OK) {
      Button.setSuccessful(Button.element());
    } else if (state === States.UNAUTHORIZED) {
      Button.setUnauthorized(Button.element());
    } else if (state === States.ERROR) {
      Button.setError(Button.element());
    }
  }

  static reset() {
    const elem = Button.element();

    elem.classList.remove(Button.CLASS_ERROR);
    elem.classList.remove(Button.CLASS_OK);
    elem.classList.remove(Button.CLASS_UNAUTHORIZED);
    elem.innerText = Button.TEXT;
  }

  static setSuccessful(elem) {
    elem.classList.add(Button.CLASS_OK);
    elem.innerText = Button.TEXT_OK;

    setTimeout(() => Button.reset(), Button.TIMEOUT);
  }

  static setUnauthorized(elem) {
    elem.classList.add(Button.CLASS_UNAUTHORIZED);
    elem.innerText = Button.TEXT_UNAUTHORIZED;

    setTimeout(() => Button.reset(), Button.TIMEOUT);
  }

  static setError(elem) {
    elem.classList.toggle(Button.CLASS_ERROR);
    elem.innerText = Button.TEXT_ERROR;

    setTimeout(() => Button.reset(), Button.TIMEOUT);
  }
}

/*
 *
 */
function getFormInformation(event) {
  const tgt = event.currentTarget;

  const user = tgt.username.value
  const pass = tgt.password.value
  const url = tgt.url.value

  return {
    credentials: {
      username: user,
      password: pass
    },
    url
  }
}

/*
 *
 */
function changeState(state) {
  if (state.state === States.OK) {
    Button.setState(States.OK);
  } else if (state.state === States.UNAUTHORIZED) {
    Button.setState(States.UNAUTHORIZED);
  } else if (state.state === States.ERROR) {
    Button.setState(States.ERROR);
  }
}

/*
 *
 */
function onload() {
  const $form = document.getElementById('borg-form');

  $form.addEventListener('submit', async event => {
    event.preventDefault();
    Button.setState(Button.SUCCESSFUL);

    const {credentials, url} = getFormInformation(event);
    const state = await CommonStorageAPI.postContent(credentials, CommonStorageAPI.TOPIC_BOOKMARKS, Specs.Bookmark(url));

    changeState(state)
  });
}

onload();
