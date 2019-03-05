// Variables

const tweetList = document.getElementById("tweet-list");

// Event Listeners

eventListeners();
document.addEventListener("DOMContentLoaded", function() {
  this.getElementById("tweet").addEventListener("keydown", ctChars);
  this.querySelector("form").addEventListener("submit", tweet);
});

function eventListeners() {
  // Form submission
  document.querySelector("#form").addEventListener("submit", newTweet);

  // Remove tweet from the list
  tweetList.addEventListener("click", removeTweet);

  // Document
  document.addEventListener("DOMContentLoaded", localStorageOnLoad);
}

// Functions

// counting

function ctChars() {
  let el = this,
    to = setTimeout(function() {
      let len = el.value.length,
        ct = document.querySelector("span"),
        btn = document.querySelector("button"),
        warnAt = 20,
        max = ct.getAttribute("data-limit");

      // characters left
      ct.innerHTML = max - len;
      // warn about reaching limit
      ct.className = len > max - warnAt ? "warn" : "";
      btn.disabled = len == 0 ? true : false;
      clearTimeout(to);
    }, 1);
}

function newTweet(e) {
  e.preventDefault();

  //   console.log("Form submitted");

  // Read the textarea value
  const tweet = document.getElementById("tweet").value;
  //   console.log(tweet);

  // create the remove button
  const removeBtn = document.createElement("a");
  removeBtn.classList = "remove-tweet";
  removeBtn.textContent = "X";

  // create an <li> element
  const li = document.createElement("li");
  li.textContent = tweet;

  // add the remove button to each tweet
  li.appendChild(removeBtn);

  // add to the list
  tweetList.appendChild(li);

  // add to local storage

  addTweetLocalStorage(tweet);

  // print the alert
  this.reset();
}

// removes the tweets from the dom

function removeTweet(e) {
  if (e.target.classList.contains("remove-tweet")) {
    e.target.parentElement.remove();
  }

  // Remove from storage
  removeTweetLocalStorage(e.target.parentElement.textContent);
}

// Adds the tweets into the local sorage

function addTweetLocalStorage(tweet) {
  let tweets = getTweetsFromStorage();

  // add the tweets into the array
  tweets.push(tweet);

  // convert tweet array into string
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function getTweetsFromStorage() {
  let tweets;
  const tweetsLS = localStorage.getItem("tweets");
  // Get the values, if null is returnet then we create an empty array
  if (tweetsLS === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(tweetsLS);
  }
  return tweets;
}

// prints local storage tweets on load

function localStorageOnLoad() {
  let tweets = getTweetsFromStorage();

  // loop throught storage and then print the values

  tweets.forEach(function(tweet) {
    // create the remove button
    const removeBtn = document.createElement("a");
    removeBtn.classList = "remove-tweet";
    removeBtn.textContent = "X";

    // create an <li> element
    const li = document.createElement("li");
    li.textContent = tweet;

    // add the remove button to each tweet
    li.appendChild(removeBtn);

    // add to the list
    tweetList.appendChild(li);
  });
}
// Removes the tweet from local storage

function removeTweetLocalStorage(tweet) {
  // Get tweets from storage
  let tweets = getTweetsFromStorage();

  // remove the x from the tweet
  const tweetDelete = tweet.substring(0, tweet.length - 1);

  // loop throught the tweets and remove the tweet that's equal
  tweets.forEach(function(tweetLS, index) {
    if (tweetDelete === tweetLS) {
      tweets.splice(index, 1);
    }
  });

  // save the data
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
