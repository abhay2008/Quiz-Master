import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import db from './config';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      teamRank: [],
    };
  }

  componentDidMount() {
    this.readTeamRank();
  }

  readTeamRank = () => {
    let teamRef = db.ref('teams/');
    teamRef.on('value', (data) => {
      let teamList = data.val();
      let sortedData = [];

      for (let team in teamList) {
        if (teamList[team]['isButtonPressed'] === true) {
          teamList[team]['teamName'] = team;
          sortedData.push(teamList[team]);
        }
      }

      sortedData.sort(function (team1, team2) {
        return team1.timestamp - team2.timestamp;
      });

      this.setState({
        teamRank: sortedData,
      });
      console.log(sortedData);
    });
  };

  resetDb = () => {
    let ref = db.ref('teams/');
    ref.set({
      blue: {
        isButtonPressed: false,
        timestamp: 0,
        enabled: true
      },
      red: {
        isButtonPressed: false,
        timestamp: 0,
        enabled: true
      },
      green: {
        isButtonPressed: false,
        timestamp: 0,
        enabled: true
      },
      yellow: {
        isButtonPressed: false,
        timestamp: 0,
        enabled: true
      },
    });
  };

  render() {
    return (
      <React.Fragment>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Quiz Master App</Text>
          </View>

          {this.state.teamRank.map((team) => (
            <View style={styles.mapView}>
              <Text style={styles.displayText}>{team.teamName}</Text>
            </View>
          ))}
        </View>

        <View style={{ backgroundColor: 'black' }}>
          <TouchableOpacity style={styles.button} onPress={this.resetDb}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  displayText: {
    fontFamily: 'monospace',
    fontSize: 40,
    color: 'cyan',
  },

  mapView: {
    marginTop: 30,
    backgroundColor: 'rgb(0, 0, 75)',
    alignItems: 'center',
    width: 300,
  },

  titleView: {
    marginBottom: '50px',
    backgroundColor: 'rgb(0, 30, 0)',
    width: 300,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    fontFamily: 'verdana',
    fontSize: '35px',
    color: 'lime',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderWidth: 4,
    borderRadius: 15,
    borderColor: 'navy',
    marginTop: 30,
    width: 100,
    height: 50,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'monospace',
    color: 'cyan',
  },
});
