# Web Development Project 2 - React Flashcards 
Submitted by: Nkiruka Danielle Ibe

This web app: React Flashcards is an interactive web application designed to help users learn and review key concepts efficiently using digital flashcards. The app allows users to flip through a set of question-and-answer pairs, testing their knowledge on various topics. Each card displays a question on the front and reveals the answer when clicked, simulating the experience of physical flashcards. Users can navigate through the deck using next and back buttons, and the app keeps track of their progress by showing the current card number out of the total. The clean and responsive design ensures a smooth learning experience on both desktop and mobile devices. This project demonstrates core React concepts such as state management, component composition, and dynamic rendering.

Time spent: 3 hours spent in total

## Required Features

The following **required** functionality is completed:


- [x] **The app displays the title of the card set, a short description, and the total number of cards**
  - [x] Title of card set is displayed 
  - [x] A short description of the card set is displayed 
  - [x] A list of card pairs is created
  - [x] The total number of cards in the set is displayed 
  - [x] Card set is represented as a list of card pairs (an array of dictionaries where each dictionary contains the question and answer is perfectly fine)
- [x] **A single card at a time is displayed**
  - [x] Only one half of the information pair is displayed at a time
- [x] **Clicking on the card flips the card over, showing the corresponding component of the information pair**
  - [x] Clicking on a card flips it over, showing the back with corresponding information 
  - [x] Clicking on a flipped card again flips it back, showing the front
- [x] **Clicking on the next button displays a random new card**

The following **optional** features are implemented:

- [ ] Cards contain images in addition to or in place of text
  - [ ] Some or all cards have images in place of or in addition to text
- [ ] Cards have different visual styles such as color based on their category
  - Example categories you can use:
    - Difficulty: Easy/medium/hard
    - Subject: Biology/Chemistry/Physics/Earth science

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='video.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ...  

[ScreenToGif](https://www.screentogif.com/) for Windows

## Notes

Describe any challenges encountered while building the app.

Some challenges I faced was understanding the useState hooks and how to get the card flip animation. I still can't quite understand the card flip because if I want to upgrade the size the centering is all off so I left it as the size it is now. It might have something to do with the positioning and padding + margining. I want to do more with this project but for now I can just keep adding more questions as I go so that I can better understand React.  

## License

    Copyright [2025] [Nkiruka Danielle Ibe]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.