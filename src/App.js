import React, { Component } from 'react';
import GuestList from './GuestList';

// import './App.css';

class App extends Component {

  state = {
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
        isEditing: true
      }
    ]

  }

  // general purpose propertyToggle method
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


  render() {
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Treehouse App</p>
          <form>
              <input type="text" value="Safia" placeholder="Invite Someone" />
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input type="checkbox" /> Hide those who haven't responded
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
          />

        </div>
      </div>
    );
  }
}

export default App;
