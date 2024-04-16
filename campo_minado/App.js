import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/params';
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
} from './src/functions';
import MineFiled from './src/components/MineFiled';
import Header from './src/components/Header';
import LevelSelection from './src/screeens/LevelSelection';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }


  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeu!!!!', 'Que burro!!!!')
    }

    if (won) {
      Alert.alert('Parabens', 'Voce Ganhou')
    }

    return this.setState({
      board,
      lost,
      won
    })
  }

  onSelectField = (row, column) => {
    const board = this.state.board
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabens', 'Voce Ganhou')
    }

    return this.setState({
      board,
      won
    })
  }

  onLevelSelected = level => {
    params.difficultLevel = level

    this.setState(this.createState())
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({showLevelSelection: true})}
        />
        <LevelSelection isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({ showLevelSelection: false})}
        />
        <View style={styles.board}>
          <MineFiled board={this.state.board}
            openField={this.onOpenField}
            selectField={this.onSelectField}
          />
          </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: "#AAA"
  }
});
