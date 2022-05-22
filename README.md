# Rock Paper Scissors
#### RESTful API for the game Rock Paper Scissors

# Web Interface
The web interface, which is hosted [here](https://rearedcape-rps.herokuapp.com), contains buttons to interact with the service.
- There is a button for the menu, which shows a welcome message then API URLs for playing and getting a random move.
- There is a button for a random move, which shows a confirmation message that the move was chosen, the specific move, and API URLs for the menu and playing.
- There are three buttons, each labelled with a potential player move. When clicked, a message showing the win state of the game with a random computer move will be shown as well as both the player and computer moves. API URLs will also be shown for the menu and a random move.

# API Interface
The API interface can be accessed by a command line using `curl https://rearedcape-rps.herokuapp.com/api`. Piping with a command to output the JSON in a nicer format is possible, for example using the NodeJS package "jsontools", a user can type the equivalent to `curl https://rearedcape-rps.herokuapp.com/api | json`.
- The defualt API return for any invalid API call will return a JSON object with an error message and valud URLs to use for the menu, playing, and a random move.
- The menu API will return a JSON object with a welcome message and URLs for playing and getting a random move.
- The get_random_move API returns randomly either "Rock", "Paper", or "Scissors". A message will accompany the choice as well as URLs to the menu and playing.
- The play API returns and instructional message to append your choice after the current URL, such as `curl https://rearedcape-rps.herokuapp.com/api/play/Paper` to play paper. The choice is **NOT** case sensitive, however each of the three words will need to be spelt correctly. Calling this API will return a JSON object with a win state message, stating whether the player wins, loses, or draws, then an array of choices, with `choices[0]` being the player and `choices[1]` being the computer. Finally URLs for the menu and getting a random move will be present.
