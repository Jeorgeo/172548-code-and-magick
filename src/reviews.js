'use strict';

var ReviewsFilter = document.querySelector('.reviews-filter');
var ReviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

//Проверяем, поддерживает ли браузер тег template

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

ReviewsFilter.classList.add('.invisible');

//Константа PHOTO_LOAD_TIMEOUT

var PHOTO_LOAD_TIMEOUT = 10000;

//Объявляем функцию формирования карточек отзывов

/**
* @param{Object} data
* @param{HTMLelement} container
* @param{HTMLelement}
*/

var getReviewElement = function(data, container) {

  var element = elementToClone.cloneNode(true);
  var profilePhoto = new Image(124, 124);
  var PhotoLoadTimeout;
  var imgTemplate = element.querySelector('img');

  element.querySelector('.review-text').textContent = data.description;

  profilePhoto.onload = function() {
    clearTimeout(PhotoLoadTimeout);
    imgTemplate.src = data.author.picture;
    imgTemplate.width = profilePhoto.width;
    imgTemplate.height = profilePhoto.height;

  };

  profilePhoto.onerror = function() {
    element.classList.add('review-load-failure');
  };

  profilePhoto.src = data.author.picture;

  PhotoLoadTimeout = setTimeout(function() {
    profilePhoto.src = '';
    element.classList.add('review-load-failure');
  }, PHOTO_LOAD_TIMEOUT);

  container.appendChild(element);
  return element;
};

window.reviews.forEach(function(review) {
  getReviewElement(review, ReviewsContainer);
});

ReviewsFilter.classList.remove('.invisible');
