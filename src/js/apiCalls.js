import * as URLS from '../constants/apiURLs';
const _ = require('lodash');

export function createURLQuery(params) {
  if (params.min || params.max) params.price = `${params.min}-${params.max}`;

  params = _.omit(params, 'max', 'min');
  params = _.omitBy(params, _.isEmpty);

  let url = new URL(URLS.ANUNCIOS);
  url.search = new URLSearchParams(params);
  return url;
}

export function signIn(body) {
  return fetch(URLS.LOGIN, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(body),
    credentials: 'include'
  }).catch(() => {
    console.error('API Error');
  });
}
export function signUp(body) {
  return fetch(URLS.REGISTER, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(body),
    credentials: 'include'
  }).catch(() => {
    console.error('API Error');
  });
}

export function getTags() {
  return fetch(URLS.TAGS, {
    method: 'get'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      console.error('API Error');
      return { results: [null] };
    });
}

export function getAds(query) {
  return fetch(query, {
    method: 'get',
    credentials: 'include'
  })
    .then(response => {
      return response.json();
    })
    .catch(() => {
      console.error('API Error');
    });
}

export function getAdDetails(ID) {
  return fetch(`${URLS.ANUNCIOS}/${ID}`, {
    method: 'get',
    credentials: 'include'
  })
    .then(response => {
      return response.json();
    })
    .catch(() => {
      console.error('API Error');
    });
}
