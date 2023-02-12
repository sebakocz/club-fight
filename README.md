# :clubs::crossed_swords: Club Fight

Proof of concept for a fast-paced multiplayer browser game optimized for mobile devices. I will build upon this idea if it proves to be enjoyable at its core - its core being a 1vs1 battler mini game, taking no longer than a minute.

## :video_game: Gameplay

![clubfight_gameplay](https://user-images.githubusercontent.com/44639352/218338984-3e0eafab-c96f-45c1-bdaf-f1018a6fc151.gif)

## :yin_yang: Core Design

If this is all that is needed to have fun, this has a great premise.

* 1vs1, players can click on items
* Just a few items to choose from, currently 3
* Items have a preperation cooldown as well as a cooldown after they triggered
* Due to this anticipation game, players can skillfully use items that will counter others

## :star: Features

Currently only enough features to test the idea of the core design

* 'Battle Now!' button leading to an instantanous 1vs1 room
* Club: heavy & powerful
* Shield: protects from incoming attacks
* Dagger: fast & versatile

## :bulb: Future Additions

This section is mainly to keep my head dreaming.

* item variety
* NPCs - monsters to fight and loot
* a map to explore
* a leaderboard system to track the best players

---

## :wrench: Stack

server-side code can be found [here](https://github.com/sebakocz/club-fight-server)

* Vue.js ~ *frontend*
    * Pinia ~ *state management*
* Node.js ~ *server-side JavaScript*
    * Express ~ *serve static content, define routes, handle HTTP requests and responses*
    * [Socket.io](http://Socket.io) ~ *two-way server communication with client*
* Nginx ~ *reverse proxy, forwards the requests to the appropriate server*
* Digital Ocean Droplet ~ *hosting*
