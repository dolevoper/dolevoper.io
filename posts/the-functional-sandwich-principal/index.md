---
date: "2020-06-01"
title: "The Functional Sandwich Principal"
description: "Start using functional style in your existing code base today, using the “functional sandwich” principle."
hero_image: "/functional-sandwich/hero.jpg"
hero_image_alt: "Two sandwiches stacked on a black plate with a blurred background"
hero_image_credit_text: "Eiliv-Sonas Aceron"
hero_image_credit_link: "https://unsplash.com/photos/mAQZ3X_8_l0"
---
There’s one functional programming principle you ought to know, no matter which is your favorite programming paradigm. Surprisingly, it’s not a super-advanced, abstract, mathematical mischief. Rather, it is the most basic principle of functional programming.

Although simple, it is very powerful and I believe I write better code since I started using it as often as I can.

### How it all begun?

I remember learning redux a few years ago. It was the first time I heard the term “pure function”. I was hooked immediately. It all made perfect sense… Composition, immutability, pure functions, it all looked so elegant and just…right.

I started learning more functional programming principals and tried to use them as much as I could in the code I write for my job. It turned out to be more challenging than I thought, as not all functional techniques are immediately “readable” the first time you encounter them.

In addition, working in a large team, where not everybody is as excited about functional programming as I am, is limiting in that regard.

Having said that, the most basic principle of functional programming is quite easy to implement and can be understood by everybody.

By using a specific structure sometimes called “the functional sandwich”, we can enjoy its benefits and make our code even more readable.

So let’s see how to make a functional sandwich.

***

## The secret sauce — pure functions

Pure functions are the fundamental building block of functional programming. They are regular functions, adhering to 3 constraints:

1. For the same given input, a pure function will always return the same output.
2. A pure function depends only on its explicit inputs.
3. A pure function can never induce side effects.

To better understand, let’s see a simple example of functions breaking the rules above.

```javascript
function dayOfWeek() {
  return [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ][new Date().getDay()];
}

function isLanguageSupported(language) {
  return window.navigator.languages.some(l => l === language);
}

function getUserData(userId) {
  return usersApi.getById(userId)
    .then(userData => appState.userData = userData);
}

const appState = {};

function main() {
  appState.dayOfWeek = dayOfWeek();
  appState.isEnglishSupported = isLanguageSupported('en');
  
  const userId = getUserIdFromCookie();
  
  getUserData(userId);
}

main();
```
Code snippet #1 — some impure functions

Each of the first 3 functions violates one of the restrictions listed above, making them all impure.

The first function dayOfWeek, will return a different value every day, thus violating the first rule “always return the same output for the same given input”.

The second, isLanguageSupported, depends on the contents of the languages array. This array was initialized outside the scope of the function and was not given to it as an input, thus this function violates the second rule “depend only on explicit inputs”.

getUserData is the worst offender, violating the third rule not once, but twice! It performs 2 kinds of side effects:

1. Network call to users API.
2. Mutation of a global appState variable.

The last function, main, is automatically ruled out since it’s calling impure functions.

On the other hand, let’s look at this code:

```javascript
function getUserName(user) {
  return user.name;
}

function splitFullName(fullName) {
  const [firstName, ...otherNameParts] = fullName.split(' ');
  
  return {
    firstName,
    lastName: otherNameParts.join(' ')
  };
}

function getUsersNames(users) {
  return users.map(getUserName).map(splitFullName);
}
```
Code snippet #2 — some pure functions

Every function here is pure, as they all follow the rules above.

It’s much less verbose, everything is very predictable and very easy to compose as demonstrated by the last function getUsersNames.

Let’s keep exploring the benefits of using pure functions.

## The benefits of pure functions

What do we gain by writing pure functions? Isn’t just using side effects and accessing global variables easier and gets the job done anyway?

We mentioned some of the advantages by the end of the last section, but let’s consider the full list of benefits of writing pure functions:

1. Pure functions are easier to reason about and debug — since pure functions depend only on explicit inputs and never induce side effects, it’s very easy to isolate them. Once you know you got the logic right, it’s a done story. When you read them you always have the full context of their execution and never have to juggle other functions/files. Also, impure operations (like network calls and state mutation) do not affect pure functions, so in case of a problem in one of those areas, you can immediately rule out any pure function from the suspects' list.
2. Pure functions are easier to test — since the only dependencies for the function are its explicit inputs, it is easy to isolate and there is almost no need for mocking or more advanced testing techniques.
3. Pure functions are easier to parallelize — two major problems in parallelization are execution order and race conditions. Since pure functions always return the same output, the execution order is not a problem in a parallelized environment. Also the restriction on mutation makes sure we do not accidentally create race conditions by writing to a mutable state.
4. Pure functions are easier to memoize — memoization is a powerful technique for reducing computation time, by avoiding re-computing known values. It works best when the same given inputs always return the same output (otherwise cache eviction and invalidation is needed). Luckily, this is the required behavior for all pure functions.

Considering the above list, suddenly the restrictions on pure functions seem very cost-effective.

So just make all your functions pure and profit, right?

## Those pesky side effects

While this is nice in theory, real-world applications require you to use side effects and keep a mutable state. So what’s the point in writing pure functions in an impure world?

While side effects are unavoidable, by writing more pure functions, larger parts of our app can enjoy these benefits.

So how do we write more pure functions?

A simple strategy to increase the number of pure functions in our code is splitting it around side effects. Effectively meaning, impure functions will not handle application logic. They will only handle side effects and delegate the real work to a pure function

Let’s refactor the example from code snippet #1 by splitting it around side effects:

```javascript
function dayOfWeek(date) {
  return [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ][date.getDay()];
}

function isLanguageSupported(language, languages) {
  return languages.some(l => l === language);
}

function updateAppState(userData, date, languages) {
  return {
    userData,
    dayOfWeek: dayOfWeek(date),
    isEnglishSupported: isLanguageSupported('en', languages)
  };
}

let appState = {};

async function main() {
  const userId = getUserIdFromCookie();
  const userData = await userApi.getById(userId);
  
  appState = updateAppState(
    userData,
    new Date(),
    window.navigator.languages
  );
}

main();
```
Code snippet #3 — splitting around side effects

We start by moving all the impure parts to the main function, the entry point for our code. We modify functions to accept more inputs where needed, to avoid breaking the second rule (inputs must be explicit).

This means getUserData is not needed anymore, since all it did was fetching data and mutating state. In larger apps we might still split impure code to reduce responsibilities and make our code more readable. In this case it is not necessary.

On the other hand, the composition of the appState can be expressed in a pure manner, so the second thing we did is extract it to a pure function named updateAppState and call it from main.

Now the business logic of our app is broken into small, composable parts, which can be easily tested. Also, the only place mutating the appState is the main function, so it will make our life easier as we know nothing else influence or can be influenced by the global appState.

## The functional sandwich principle

Turns out, avoiding side effects has an interesting side effect (pun intended). It creates a very specific flow in our program.

Pure functions can’t call impure functions, as it will make them impure. They can of course still call other pure functions, it does not affect their purity what so ever.

On the other hand, impure functions do not benefit by not calling pure functions. Hence impure functions can call both pure and impure functions.

By splitting the code around side effects and creating more pure functions, the code gets structured like a “functional sandwich”. Or as some might say, the code has an imperative shell and a functional core.

Pure functions will always be called and eventually return to an impure function. Covered from both sides by an imperative bread, like a tasty functional sandwich.

![A functional sandwich](/functional-sandwich/a-functional-sandwich.png)
A functional sandwich

If you keep at it, all the side effects will eventually be pushed to the “edges” of the app. As part of the server’s API, or listening to a DOM event.

This is good practice, as it makes all the business logic very isolated, easy to test, and to reason about.

## Next steps

Functional programming is amazing! I highly encourage you to learn more about it. Though it might be intimidating at first, it is beautiful, mind-opening and there is quite a lot to learn from it to use in practice.

Recently I also gained more respect and insight towards object-oriented techniques, by researching their relation to functional programming, and how to implement some functional techniques in different languages.

Check these out, as they helped me a lot:

1. [https://frontendmasters.com/courses/functional-javascript/](https://frontendmasters.com/courses/functional-javascript/) — this is where I first heard the “functional sandwich” metaphor, and a very good watch regardless
2. [https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell](https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell) — a very good example of a more complex program, structured into a functional core with an imperative shell

Bon appetite!

*Thanks to Yonatan Kra for reviewing*