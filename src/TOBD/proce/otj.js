handleClick(i) {
  const history = this.state.history;
  const current = history[history.length - 1];
  const dldkey = current.dldkey.slice();
  if (calculateWinner(dldkey) || dldkey[i]) {
    return;
  }
  dldkey[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    history: history.concat([{
      dldkey: dldkey,
    }]),
    xIsNext: !this.state.xIsNext,
  });
}