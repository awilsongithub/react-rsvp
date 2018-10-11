import React, { Component } from 'react';
import GuestList from './GuestList';

// import './App.css';

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: 'Treasure',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Nick',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'Boo',
        isConfirmed: true,
        isEditing: false
      }
    ]
  }

  // hide/show guests who haven't responded
  toggleFiltered = () => {
    this.setState({
      isFiltered: !this.state.isFiltered
    });
  }

  // general purpose propertyToggle method
  // note we don't modify guests array, we create a new array
  // and return it as the new value of guests
  toggleGuestPropertyAt = (property, indexToChange) =>
    this.setState({
      guests: this.state.guests.map( (guest, index) => {
        if(index === indexToChange){
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

  toggleConfirmationAt = index =>
    this.toggleGuestPropertyAt('isConfirmed', index);

  toggleEditingAt = index =>
      this.toggleGuestPropertyAt('isEditing', index);

  setNameAt = (text, indexToChange) =>
    this.setState({
      // replace whole guest array vs just find the right
      // guest and edit????
      guests: this.state.guests.map( (guest, index) => {
        if(index === indexToChange){
          return {
            ...guest,
            name: text
          };
        }
        return guest;
      })
    })


  // About use of spread operator:
  // this method uses spread operator to spread guest in returned object
  // which basically clones it, but then we override one prop (isConfirmed)
  // toggleConfirmationAt = indexToChange =>
  //   this.setState({
  //     guests: this.state.guests.map( (guest, index) => {
  //       if(index === indexToChange){
  //         return {
  //           ...guest,
  //           isConfirmed: !guest.isConfirmed
  //         };
  //       }
  //       return guest;
  //     })
  //   });

  // computed from state (don't include in state)
  getTotalInvited = () => this.state.guests.length;

  // getTotalConfirmed = () => {
  //   const confirmed = 0;
  //   this.state.guests.forEach(guest => {
  //     if (guest.isConfirmed){ confirmed += 1 }
  //   })
  //   console.log(confirmed);
  // }

  // getUncomfirmedGuests = () => ...

  // receive event and get value of guestName field and setState of guests
  handleNameInput = event =>
    this.setState({ pendingGuest: event.target.value })

  // add pendingGuest to guests. set name. set defaults for other props
  addGuest = (event) => {
    event.preventDefault();
    const newGuest = {
      name: this.state.pendingGuest,
      isConfirmed: false,
      isEditing: false
    };
    const currentGuests = this.state.guests
    console.log(currentGuests)
    currentGuests.push(newGuest);
    console.log(currentGuests)
    this.setState({
      guests: currentGuests,
      pendingGuest: ""
    });
    document.getElementById('invite-guest-input').focus();

  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Treehouse App</p>


          <form>
              <input
                type="text"
                value={this.state.pendingGuest}
                placeholder="Invite Someone"
                onChange={this.handleNameInput}
                id='invite-guest-input'
              />
              <button
                type="submit"
                name="submit"
                value="submit"
                onClick={this.addGuest}
                >Submit
              </button>
          </form>













        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input
                type="checkbox"
                checked={this.state.isFiltered}
                onChange={this.toggleFiltered}
              /> Hide those who haven't responded
            </label>
          </div>
          <table className="counter">
            <tbody>
              <tr>
                <td>Attending:</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Unconfirmed:</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>

          <GuestList
            guests={this.state.guests}
            toggleEditingAt={this.toggleEditingAt}
            toggleConfirmationAt={this.toggleConfirmationAt}
            setName={this.setNameAt}
            isFiltered={this.state.isFiltered}
          />

        </div>
      </div>
    );
  }
}

export default App;
