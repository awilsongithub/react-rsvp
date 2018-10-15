import React, { Component } from 'react';
import Header from './Header';
import MainContent from './MainContent';

class App extends Component {

  /**===============================================
                      STATE
  ================================================== */

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: []
  }

  /**===============================================
                       METHODS
  ================================================== */

  // hide/show guests who haven't responded
  toggleFiltered = () => {
    this.setState({
      isFiltered: !this.state.isFiltered
    });
  }

  // general purpose propertyToggle method
  // note we don't modify guests array, we create a new array
  // and return it as the new value of guests
  toggleGuestPropertyAt = (property, uid) =>
    this.setState({
      guests: this.state.guests.map( (guest) => {
        if(guest.uid === uid){
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

  toggleConfirmationAt = uid =>
    this.toggleGuestPropertyAt('isConfirmed', uid);

  toggleEditingAt = uid =>
      this.toggleGuestPropertyAt('isEditing', uid);

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

  handleNameInput = event =>
    this.setState({ pendingGuest: event.target.value })

  newGuestSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          uid: Math.random().toString().slice(2,10) // 8 digit unique string
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
          return null;
        }
      })
    });
  }

  /**===============================================
                      RENDER
  ================================================== */
  render() {
    return (
      <div className="App">

        <Header
          pendingGuest={this.state.pendingGuest}
          handleNameInput={this.handleNameInput}
          newGuestSubmitHandler={this.newGuestSubmitHandler}
        />

        <MainContent
          checked={this.state.isFiltered}
          onChange={this.toggleFiltered}
          guests={this.state.guests}
          toggleEditingAt={this.toggleEditingAt}
          toggleConfirmationAt={this.toggleConfirmationAt}
          setName={this.setNameAt}
          isFiltered={this.state.isFiltered}
          removeGuestAt={this.removeGuestAt}
          pendingGuest={this.state.pendingGuest}
          toggleFiltered={this.toggleFiltered}
        />

      </div>
    );
  }
}

export default App;





/**===============================================
 * THIS IS ALL UNUSED
================================================== */
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
  //
  //
  //
  // const totalInvited = this.getTotalInvited();
  // const totalAttending = this.getTotalAttending();
  // const numberUnconfirmed = totalInvited - totalAttending;


  // getTotalInvited = () => this.state.guests.length;
  //
  // getTotalAttending = () =>
  //   this.state.guests.reduce(
  //     (total, guest) => guest.isConfirmed ? total + 1 : total,
  //     0
  //   );

  // getTotalConfirmed = () => {
  //   const confirmed = 0;
  //   this.state.guests.forEach(guest => {
  //     if (guest.isConfirmed){ confirmed += 1 }
  //   })
  //   console.log(confirmed);
  // }

  // getUncomfirmedGuests = () => ...
  //
  //
  //
  //   // {
    //   name: 'Treasure',
    //   isConfirmed: false,
    //   isEditing: false
    // },
    // {
    //   name: 'Nick',
    //   isConfirmed: false,
    //   isEditing: false
    // },
    // {
    //   name: 'Boo',
    //   isConfirmed: false,
    //   isEditing: false
    // }
