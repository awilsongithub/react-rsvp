import React, { Component } from 'react';
import GuestList from './GuestList';
import Counter from './Counter';

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
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Boo',
        isConfirmed: false,
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

  getTotalInvited = () => this.state.guests.length;

  getTotalAttending = () =>
    this.state.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total,
      0
    );

  // getTotalConfirmed = () => {
  //   const confirmed = 0;
  //   this.state.guests.forEach(guest => {
  //     if (guest.isConfirmed){ confirmed += 1 }
  //   })
  //   console.log(confirmed);
  // }

  // getUncomfirmedGuests = () => ...

  handleNameInput = event =>
    this.setState({ pendingGuest: event.target.value })

  newGuestSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ""
    });
    document.getElementById('invite-guest-input').focus();
  }

  removeGuestAt = indexToRemove => {
    this.setState({
      guests: this.state.guests.filter( (guest, index) => {
        if(index !== indexToRemove){
          return guest;
        } else {
          return;
        }
      })
    });
  }

  render() {

    const totalInvited = this.getTotalInvited();
    const totalAttending = this.getTotalAttending();
    const numberUnconfirmed = totalInvited - totalAttending;

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
                onClick={this.newGuestSubmitHandler}
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

          <Counter
            totalInvited={totalInvited}
            totalAttending={totalAttending}
            numberUnconfirmed={numberUnconfirmed}
            guests={this.state.guests}
          />

          <GuestList
            guests={this.state.guests}
            toggleEditingAt={this.toggleEditingAt}
            toggleConfirmationAt={this.toggleConfirmationAt}
            setName={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest}
          />

        </div>
      </div>
    );
  }
}

export default App;
