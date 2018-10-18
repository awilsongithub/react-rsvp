import React, { Component } from 'react';
import Header from './Header';
import MainContent from './MainContent';
import SimpleStorage from 'react-simple-storage';
import ApiData from './ApiData';

class App extends Component {

  /**===============================================
                      STATE
  ================================================== */
  /**
   * TODO: while watching fetching data in react
   * constructor with super()?
   * componentDidMount? (put fetch there)
   * install fetch polyfill: https://github.com/github/fetch
   * axios: stronger browser support https://github.com/axios/axios
   *
   */
  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [],
    apiData: []
  }

  /**===============================================
                  LIFECYCLE METHODS
  ================================================== */

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        this.setState({
          apiData: json
        })
        console.log('json[0]:', json);
        console.log('apiData:', this.state.apiData)
      })
      // .then(json => console.log(json[0]))
  }

  /**===============================================
                  OTHER METHODS
  ================================================== */

  toggleCompleted = (item, event) => {
    this.setState({
      apiData: this.state.apiData.map( toDo => {
        if(toDo.id === item.id){
          toDo.completed = !toDo.completed;
        }
        return toDo;
      })
    })
  }

  deleteToDo = (item, event) => {
    console.log('called delete')
    this.setState({
      apiData: this.state.apiData.filter( toDo => {
        return (toDo.id !== item.id);
      })
    })
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

  setNameAt = (text, uid) =>
    this.setState({
      guests: this.state.guests.map( (guest) => {
        if(guest.uid === uid){
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
    const input = document.getElementById('invite-guest-input');
    // prevent empty string submission
    if(!this.state.pendingGuest.length){
      input.focus();
      return null;
    }
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
    input.focus();
  }

  removeGuestAt = uid => {
    this.setState({
      guests: this.state.guests.filter( (guest) => {
        if(guest.uid !== uid){
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

        {/* adds local storage via plugin. See:
        https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2 */}
        <SimpleStorage parent={this} />

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

        {/* create component, import it, pass it apiData, it will update when apiData changes in state  */}
        <ApiData
          data={this.state.apiData}
          toggleCompleted={this.toggleCompleted}
          deleteToDo={this.deleteToDo}
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
