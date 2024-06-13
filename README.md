# VPET

This application provides a virtual pet game designed to allow users to buy pets, interact with pets, and communicate with others.

### Features
- Users can aquire pets from discovery.
  - a total of 6 pets from discovery are randomly generated each time the page is rendered.
  - after choose the pet, user need to give them a name, and they will be you pet!
- Users can interact with pets.
  - after login, users should see their pets. They should be able to interact with the pets by clicking on the pet. This interaction should call petting.
  - pets have happiness level, happiness initalize to 60, drop by 1 per second
    - if drop below 60, pet yell let me go!
    - if above 90, pet has heart next to it.
- users can communicate with others.
  - like in previous project users can communicate with other users

### Design
- Chat
- users have individual data
  - pets
    - each pet has name, sex, and parts
      - parts are assigned randomly, front end will render the parts based on a table in parts. Back end need to know how many parts are there, so it knows how to randomly select an index. 
      - in front end login form, there should have a randomly generated pet.
